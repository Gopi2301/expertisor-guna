<?php
/**
 * Courses API
 * 
 * Endpoints:
 * GET    /api/courses.php                - Get all courses (admin)
 * GET    /api/courses.php?published=1    - Get published courses only
 * GET    /api/courses.php?id={id}        - Get single course by ID
 * GET    /api/courses.php?slug={slug}    - Get course by slug
 * POST   /api/courses.php                - Create new course (requires auth)
 * PUT    /api/courses.php?id={id}        - Update course (requires auth)
 * DELETE /api/courses.php?id={id}        - Delete course (requires auth)
 */

require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$db = getDB();

// Require authentication for all non-GET requests
// GET requests for published content remain public
if ($method !== 'GET' || (!isset($_GET['published']) && !isset($_GET['slug']))) {
    if ($method !== 'GET') {
        requireAuth();
    }
}

switch ($method) {
    case 'GET':
        handleGet($db);
        break;
    case 'POST':
        handlePost($db);
        break;
    case 'PUT':
        handlePut($db);
        break;
    case 'DELETE':
        handleDelete($db);
        break;
    default:
        sendError('Method not allowed', 405);
}

/**
 * Handle GET requests
 */
function handleGet($db)
{
    // Get by ID
    if (isset($_GET['id'])) {
        $stmt = $db->prepare("SELECT * FROM courses WHERE id = ?");
        $stmt->execute([$_GET['id']]);
        $course = $stmt->fetch();

        if ($course) {
            $course['hero_data'] = json_decode($course['hero_data'], true);
            $course['form_data'] = json_decode($course['form_data'], true);
            sendResponse($course);
        } else {
            sendError('Course not found', 404);
        }
    }

    // Get by slug
    if (isset($_GET['slug'])) {
        $query = "SELECT * FROM courses WHERE slug = ?";
        $params = [$_GET['slug']];

        // By default, only return published for public access
        if (!isset($_GET['admin'])) {
            $query .= " AND status = 'PUBLISHED'";
        }

        $stmt = $db->prepare($query);
        $stmt->execute($params);
        $course = $stmt->fetch();

        if ($course) {
            $course['hero_data'] = json_decode($course['hero_data'], true);
            $course['form_data'] = json_decode($course['form_data'], true);
            sendResponse($course);
        } else {
            sendError('Course not found', 404);
        }
    }

    // Get all courses
    $query = "SELECT c.*, cat.name as category_name FROM courses c 
              LEFT JOIN categories cat ON c.category_id = cat.id";

    // Filter by published status
    if (isset($_GET['published']) && $_GET['published'] == '1') {
        $query .= " WHERE c.status = 'PUBLISHED'";
        $query .= " ORDER BY c.published_at DESC";
    } else {
        $query .= " ORDER BY c.created_at DESC";
    }

    // Filter by category
    if (isset($_GET['category'])) {
        $query = str_replace("ORDER BY", "AND c.category_id = " . intval($_GET['category']) . " ORDER BY", $query);
    }

    $stmt = $db->query($query);
    $courses = $stmt->fetchAll();

    // Parse JSON fields
    foreach ($courses as &$course) {
        $course['hero_data'] = json_decode($course['hero_data'], true);
        $course['form_data'] = json_decode($course['form_data'], true);
    }

    sendResponse($courses);
}

/**
 * Handle POST requests - Create new course
 */
function handlePost($db)
{
    try {
        $data = getRequestBody();

        // Validate required fields
        if (empty($data['title'])) {
            sendError('Title is required', 400);
            return;
        }

        $slug = generateSlug($data['title']);

        // Check if slug exists
        $stmt = $db->prepare("SELECT id FROM courses WHERE slug = ?");
        $stmt->execute([$slug]);
        if ($stmt->fetch()) {
            $slug = $slug . '-' . time();
        }

        // Default hero data
        $heroData = $data['hero_data'] ?? [
            'badge' => ['emoji' => '🎓', 'text' => 'Learn from Industry Expert', 'highlight' => ''],
            'headline' => ['parts' => [['text' => $data['title'], 'highlight' => true]]],
            'subheadline' => 'Transform your career with expert-led training.',
            'video' => ['url' => '/videos/Background.webm'],
            'buttons' => [
                'primary' => ['text' => 'Apply Now', 'action' => 'openModal'],
                'secondary' => ['text' => 'Download Brochure', 'url' => '']
            ]
        ];

        // Default form data
        $formData = $data['form_data'] ?? [
            'title' => 'APPLY NOW',
            'formAction' => '',
            'fields' => [
                ['name' => 'name', 'label' => 'Name', 'type' => 'text', 'placeholder' => 'Your Name', 'required' => true],
                ['name' => 'email', 'label' => 'Email', 'type' => 'email', 'placeholder' => 'yourname@gmail.com', 'required' => true],
                ['name' => 'phone', 'label' => 'Phone Number', 'type' => 'tel', 'placeholder' => 'Enter WhatsApp Number', 'required' => true]
            ],
            'submitButton' => 'Submit'
        ];

        // Validate category_id if provided
        if (!empty($data['category_id'])) {
            $stmt = $db->prepare("SELECT id FROM categories WHERE id = ?");
            $stmt->execute([$data['category_id']]);
            if (!$stmt->fetch()) {
                sendError('Invalid category ID', 400);
                return;
            }
        }

        // Start transaction
        $db->beginTransaction();

        $stmt = $db->prepare("
            INSERT INTO courses (
                slug, status, category_id, title, subtitle, description,
                mentor_name, mentor_image, instructor, rating, reviews_count,
                student_count, language, duration, module_count, level,
                thumbnail, template_id, hero_data, form_data,
                deal_name, deal_course, deal_course_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");

        $stmt->execute([
            $slug,
            $data['status'] ?? 'DRAFT',
            $data['category_id'] ?? null,
            $data['title'],
            $data['subtitle'] ?? '',
            $data['description'] ?? '',
            $data['mentor_name'] ?? '',
            $data['mentor_image'] ?? '',
            $data['instructor'] ?? '',
            $data['rating'] ?? 4.9,
            $data['reviews_count'] ?? 0,
            $data['student_count'] ?? '0+',
            $data['language'] ?? 'Tamil',
            $data['duration'] ?? '0h',
            $data['module_count'] ?? null,
            $data['level'] ?? '',
            $data['thumbnail'] ?? '',
            $data['template_id'] ?? 'transformation-framework',
            json_encode($heroData),
            json_encode($formData),
            $data['deal_name'] ?? '',
            $data['deal_course'] ?? '',
            $data['deal_course_id'] ?? ''
        ]);

        $id = $db->lastInsertId();

        // Commit transaction
        $db->commit();

        // Fetch and return the created course
        $stmt = $db->prepare("SELECT * FROM courses WHERE id = ?");
        $stmt->execute([$id]);
        $course = $stmt->fetch();
        $course['hero_data'] = json_decode($course['hero_data'], true);
        $course['form_data'] = json_decode($course['form_data'], true);

        // Log success
        error_log("[COURSE_CREATE] Successfully created course ID: $id, Title: " . $data['title']);

        sendResponse($course, 201);
    } catch (PDOException $e) {
        // Rollback transaction on database error
        if ($db->inTransaction()) {
            $db->rollBack();
        }
        error_log("[COURSE_CREATE_ERROR] PDO Exception: " . $e->getMessage() . " | Code: " . $e->getCode());
        sendError('Database error: ' . $e->getMessage(), 500);
    } catch (Exception $e) {
        if ($db->inTransaction()) {
            $db->rollBack();
        }
        error_log("[COURSE_CREATE_ERROR] Exception: " . $e->getMessage());
        sendError('Server error: ' . $e->getMessage(), 500);
    }
}

/**
 * Handle PUT requests - Update course
 */
function handlePut($db)
{
    try {
        if (!isset($_GET['id'])) {
            sendError('Course ID required', 400);
            return;
        }

        $id = $_GET['id'];
        $data = getRequestBody();

        // Build dynamic update query
        $fields = [];
        $values = [];

        $allowedFields = [
            'slug',
            'status',
            'category_id',
            'title',
            'subtitle',
            'description',
            'mentor_name',
            'mentor_image',
            'instructor',
            'rating',
            'reviews_count',
            'student_count',
            'language',
            'duration',
            'module_count',
            'thumbnail',
            'template_id',
            'level',
            'deal_name',
            'deal_course',
            'deal_course_id'
        ];

        foreach ($allowedFields as $field) {
            if (isset($data[$field])) {
                $fields[] = "$field = ?";
                $values[] = $data[$field];
            }
        }

        // Handle JSON fields
        if (isset($data['hero_data'])) {
            $fields[] = "hero_data = ?";
            $values[] = json_encode($data['hero_data']);
        }

        if (isset($data['form_data'])) {
            $fields[] = "form_data = ?";
            $values[] = json_encode($data['form_data']);
        }

        // Handle publish/unpublish
        if (isset($data['status'])) {
            if ($data['status'] === 'PUBLISHED') {
                $fields[] = "published_at = NOW()";
            } else {
                $fields[] = "published_at = NULL";
            }
        }

        if (empty($fields)) {
            sendError('No fields to update', 400);
            return;
        }

        $values[] = $id;

        // Start transaction
        $db->beginTransaction();

        $query = "UPDATE courses SET " . implode(', ', $fields) . " WHERE id = ?";
        $stmt = $db->prepare($query);
        $stmt->execute($values);

        // Commit transaction
        $db->commit();

        // Return updated course
        $stmt = $db->prepare("SELECT * FROM courses WHERE id = ?");
        $stmt->execute([$id]);
        $course = $stmt->fetch();

        if ($course) {
            $course['hero_data'] = json_decode($course['hero_data'], true);
            $course['form_data'] = json_decode($course['form_data'], true);

            // Log success
            error_log("[COURSE_UPDATE] Successfully updated course ID: $id");

            sendResponse($course);
        } else {
            sendError('Course not found', 404);
        }
    } catch (PDOException $e) {
        if ($db->inTransaction()) {
            $db->rollBack();
        }
        error_log("[COURSE_UPDATE_ERROR] PDO Exception: " . $e->getMessage() . " | Code: " . $e->getCode());
        sendError('Database error: ' . $e->getMessage(), 500);
    } catch (Exception $e) {
        if ($db->inTransaction()) {
            $db->rollBack();
        }
        error_log("[COURSE_UPDATE_ERROR] Exception: " . $e->getMessage());
        sendError('Server error: ' . $e->getMessage(), 500);
    }
}

/**
 * Handle DELETE requests
 */
function handleDelete($db)
{
    if (!isset($_GET['id'])) {
        sendError('Course ID required');
    }

    $stmt = $db->prepare("DELETE FROM courses WHERE id = ?");
    $stmt->execute([$_GET['id']]);

    if ($stmt->rowCount() > 0) {
        sendResponse(['deleted' => true]);
    } else {
        sendError('Course not found', 404);
    }
}
