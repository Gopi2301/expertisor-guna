<?php
/**
 * Categories API
 * 
 * Endpoints:
 * GET    /api/categories.php         - Get all categories
 * GET    /api/categories.php?id={id} - Get single category
 * POST   /api/categories.php         - Create category (requires auth)
 * PUT    /api/categories.php?id={id} - Update category (requires auth)
 * DELETE /api/categories.php?id={id} - Delete category (requires auth)
 */

require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$db = getDB();

// Require authentication for all non-GET requests
if ($method !== 'GET') {
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
        $stmt = $db->prepare("SELECT * FROM categories WHERE id = ?");
        $stmt->execute([$_GET['id']]);
        $category = $stmt->fetch();

        if ($category) {
            sendResponse($category);
        } else {
            sendError('Category not found', 404);
        }
    }

    // Get all categories with course count
    $stmt = $db->query("
        SELECT c.*, COUNT(co.id) as course_count 
        FROM categories c 
        LEFT JOIN courses co ON c.id = co.category_id AND co.status = 'PUBLISHED'
        GROUP BY c.id 
        ORDER BY c.display_order ASC
    ");
    $categories = $stmt->fetchAll();

    sendResponse($categories);
}

/**
 * Handle POST requests - Create category
 */
function handlePost($db)
{
    $data = getRequestBody();

    if (empty($data['name'])) {
        sendError('Category name is required');
    }

    $slug = generateSlug($data['name']);

    // Get max order
    $stmt = $db->query("SELECT MAX(display_order) as max_order FROM categories");
    $result = $stmt->fetch();
    $order = ($result['max_order'] ?? 0) + 1;

    $stmt = $db->prepare("INSERT INTO categories (name, slug, display_order) VALUES (?, ?, ?)");
    $stmt->execute([$data['name'], $slug, $order]);

    $id = $db->lastInsertId();

    $stmt = $db->prepare("SELECT * FROM categories WHERE id = ?");
    $stmt->execute([$id]);
    $category = $stmt->fetch();

    sendResponse($category, 201);
}

/**
 * Handle PUT requests - Update category
 */
function handlePut($db)
{
    if (!isset($_GET['id'])) {
        sendError('Category ID required');
    }

    $id = $_GET['id'];
    $data = getRequestBody();

    $fields = [];
    $values = [];

    if (isset($data['name'])) {
        $fields[] = "name = ?";
        $values[] = $data['name'];
        $fields[] = "slug = ?";
        $values[] = generateSlug($data['name']);
    }

    if (isset($data['display_order'])) {
        $fields[] = "display_order = ?";
        $values[] = $data['display_order'];
    }

    if (empty($fields)) {
        sendError('No fields to update');
    }

    $values[] = $id;

    $query = "UPDATE categories SET " . implode(', ', $fields) . " WHERE id = ?";
    $stmt = $db->prepare($query);
    $stmt->execute($values);

    $stmt = $db->prepare("SELECT * FROM categories WHERE id = ?");
    $stmt->execute([$id]);
    $category = $stmt->fetch();

    if ($category) {
        sendResponse($category);
    } else {
        sendError('Category not found', 404);
    }
}

/**
 * Handle DELETE requests
 */
function handleDelete($db)
{
    if (!isset($_GET['id'])) {
        sendError('Category ID required');
    }

    // Check if category has courses
    $stmt = $db->prepare("SELECT COUNT(*) as count FROM courses WHERE category_id = ?");
    $stmt->execute([$_GET['id']]);
    $result = $stmt->fetch();

    if ($result['count'] > 0) {
        sendError('Cannot delete category with courses. Move or delete courses first.');
    }

    $stmt = $db->prepare("DELETE FROM categories WHERE id = ?");
    $stmt->execute([$_GET['id']]);

    if ($stmt->rowCount() > 0) {
        sendResponse(['deleted' => true]);
    } else {
        sendError('Category not found', 404);
    }
}
