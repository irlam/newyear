<?php
// Shared utility functions for rendering, sanitization, and validation

require_once 'db.php';

/**
 * Sanitize output for HTML display
 */
function h($text) {
    return htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
}

/**
 * Format datetime in UK format (DD/MM/YYYY HH:mm)
 */
function formatUKDateTime($datetime) {
    if (!$datetime) return '';
    try {
        $dt = new DateTime($datetime, new DateTimeZone('Europe/London'));
        return $dt->format('d/m/Y H:i');
    } catch (Exception $e) {
        error_log("Invalid datetime format: " . $e->getMessage());
        return '';
    }
}

/**
 * Validate and sanitize input
 */
function validateInput($value, $maxLength, $required = false) {
    $value = trim($value);
    
    if ($required && empty($value)) {
        return ['valid' => false, 'error' => 'This field is required'];
    }
    
    if (strlen($value) > $maxLength) {
        return ['valid' => false, 'error' => "Maximum length is $maxLength characters"];
    }
    
    return ['valid' => true, 'value' => $value];
}

/**
 * Get all sections by prefix
 */
function getSectionsByPrefix($prefix) {
    $db = getDB();
    $stmt = $db->prepare("SELECT * FROM sections WHERE section_key LIKE ? ORDER BY section_key");
    $stmt->execute([$prefix . '%']);
    return $stmt->fetchAll();
}

/**
 * Get a single section by key
 */
function getSection($key) {
    $db = getDB();
    $stmt = $db->prepare("SELECT * FROM sections WHERE section_key = ?");
    $stmt->execute([$key]);
    return $stmt->fetch();
}

/**
 * Update a section
 */
function updateSection($key, $content, $name) {
    $db = getDB();
    $stmt = $db->prepare("UPDATE sections SET content = ?, name = ?, updated_at = NOW() WHERE section_key = ?");
    return $stmt->execute([$content, $name, $key]);
}

/**
 * Get list items by list key (newest first)
 */
function getListItems($listKey) {
    $db = getDB();
    $stmt = $db->prepare("SELECT * FROM lists WHERE list_key = ? ORDER BY created_at DESC");
    $stmt->execute([$listKey]);
    return $stmt->fetchAll();
}

/**
 * Add list item
 */
function addListItem($listKey, $itemText, $name) {
    $db = getDB();
    $stmt = $db->prepare("INSERT INTO lists (list_key, item_text, name, created_at) VALUES (?, ?, ?, NOW())");
    return $stmt->execute([$listKey, $itemText, $name]);
}

/**
 * Delete list item
 */
function deleteListItem($id) {
    $db = getDB();
    $stmt = $db->prepare("DELETE FROM lists WHERE id = ?");
    return $stmt->execute([$id]);
}

/**
 * Generate CSRF token
 */
function generateCSRFToken() {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Verify CSRF token
 */
function verifyCSRFToken($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}
