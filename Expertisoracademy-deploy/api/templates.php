<?php
/**
 * Templates API
 * Manages landing page templates (migrated from localStorage)
 * 
 * Endpoints:
 * GET    /api/templates.php              - Get all templates
 * GET    /api/templates.php?id={id}      - Get single template
 * GET    /api/templates.php?slug={slug}  - Get published template by slug
 * POST   /api/templates.php              - Create new template
 * PUT    /api/templates.php?id={id}      - Update template
 * DELETE /api/templates.php?id={id}      - Delete template
 */

require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$db = getDB();

// All template operations require authentication
if ($method !== 'GET' || !isset($_GET['slug'])) {
    requireAuth();
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
        $stmt = $db->prepare("SELECT * FROM cms_templates WHERE id = ?");
        $stmt->execute([$_GET['id']]);
        $template = $stmt->fetch();

        if ($template) {
            $template['sections'] = json_decode($template['sections'], true);
            sendResponse($template);
        } else {
            sendError('Template not found', 404);
        }
    }

    // Get by slug (public access for published templates)
    if (isset($_GET['slug'])) {
        $stmt = $db->prepare("SELECT * FROM cms_templates WHERE slug = ? AND status = 'published'");
        $stmt->execute([$_GET['slug']]);
        $template = $stmt->fetch();

        if ($template) {
            $template['sections'] = json_decode($template['sections'], true);
            sendResponse($template);
        } else {
            sendError('Template not found', 404);
        }
    }

    // Get all templates
    $query = "SELECT * FROM cms_templates ORDER BY updated_at DESC";
    $stmt = $db->query($query);
    $templates = $stmt->fetchAll();

    // Parse JSON fields
    foreach ($templates as &$template) {
        $template['sections'] = json_decode($template['sections'], true);
    }

    sendResponse($templates);
}

/**
 * Handle POST requests - Create new template
 */
function handlePost($db)
{
    $data = getRequestBody();

    if (empty($data['name'])) {
        sendError('Template name is required');
    }

    $id = generateId();
    $slug = generateSlug($data['name']);

    // Check if slug exists
    $stmt = $db->prepare("SELECT id FROM cms_templates WHERE slug = ?");
    $stmt->execute([$slug]);
    if ($stmt->fetch()) {
        $slug = $slug . '-' . time();
    }

    // Default sections structure
    $sections = $data['sections'] ?? [
        'hero' => [
            'badge' => ['emoji' => '🤔', 'text' => 'Learn from Industry Expert'],
            'headline' => [
                'parts' => [
                    ['text' => 'Transform your ', 'highlight' => false],
                    ['text' => 'career', 'highlight' => true]
                ]
            ],
            'subheadline' => 'Transform your career with expert training.',
            'video' => ['url' => '/videos/Background.webm', 'type' => 'video/webm'],
            'buttons' => [
                'primary' => ['text' => 'Apply Now', 'icon' => 'arrow-right', 'action' => 'openModal'],
                'secondary' => ['text' => 'Download Brochure', 'icon' => 'download', 'url' => '/brochure.pdf']
            ]
        ],
        'form' => [
            'title' => 'APPLY NOW',
            'subtitle' => 'Fill in the details below to apply.',
            'fields' => [
                ['name' => 'name', 'label' => 'Name', 'type' => 'text', 'placeholder' => 'Your Name', 'required' => true],
                ['name' => 'email', 'label' => 'Email', 'type' => 'email', 'placeholder' => 'yourname@gmail.com', 'required' => true],
                ['name' => 'phone', 'label' => 'Phone Number', 'type' => 'tel', 'placeholder' => 'Enter WhatsApp Number', 'required' => true]
            ],
            'submitButton' => 'Submit',
            'formAction' => ''
        ]
    ];

    $stmt = $db->prepare("
        INSERT INTO cms_templates (id, name, slug, status, sections)
        VALUES (?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        $id,
        sanitizeInput($data['name']),
        $slug,
        'draft',
        json_encode($sections)
    ]);

    // Fetch and return created template
    $stmt = $db->prepare("SELECT * FROM cms_templates WHERE id = ?");
    $stmt->execute([$id]);
    $template = $stmt->fetch();
    $template['sections'] = json_decode($template['sections'], true);

    sendResponse($template, 201);
}

/**
 * Handle PUT requests - Update template
 */
function handlePut($db)
{
    if (!isset($_GET['id'])) {
        sendError('Template ID required');
    }

    $id = $_GET['id'];
    $data = getRequestBody();

    // Build dynamic update query
    $fields = [];
    $values = [];

    if (isset($data['name'])) {
        $fields[] = "name = ?";
        $values[] = sanitizeInput($data['name']);
    }

    if (isset($data['slug'])) {
        $fields[] = "slug = ?";
        $values[] = $data['slug'];
    }

    if (isset($data['status'])) {
        $fields[] = "status = ?";
        $values[] = $data['status'];

        if ($data['status'] === 'published') {
            $fields[] = "published_at = NOW()";
        } else {
            $fields[] = "published_at = NULL";
        }
    }

    if (isset($data['sections'])) {
        $fields[] = "sections = ?";
        $values[] = json_encode($data['sections']);
    }

    if (empty($fields)) {
        sendError('No fields to update');
    }

    $values[] = $id;

    $query = "UPDATE cms_templates SET " . implode(', ', $fields) . " WHERE id = ?";
    $stmt = $db->prepare($query);
    $stmt->execute($values);

    // Return updated template
    $stmt = $db->prepare("SELECT * FROM cms_templates WHERE id = ?");
    $stmt->execute([$id]);
    $template = $stmt->fetch();

    if ($template) {
        $template['sections'] = json_decode($template['sections'], true);
        sendResponse($template);
    } else {
        sendError('Template not found', 404);
    }
}

/**
 * Handle DELETE requests
 */
function handleDelete($db)
{
    if (!isset($_GET['id'])) {
        sendError('Template ID required');
    }

    $stmt = $db->prepare("DELETE FROM cms_templates WHERE id = ?");
    $stmt->execute([$_GET['id']]);

    if ($stmt->rowCount() > 0) {
        sendResponse(['deleted' => true]);
    } else {
        sendError('Template not found', 404);
    }
}

/**
 * Generate unique ID
 */
function generateId()
{
    return base_convert(time(), 10, 36) . substr(md5(uniqid()), 0, 8);
}
