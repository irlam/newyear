<?php
// Main entry point for New Year's Trip Planning Application
// Displays all sections (timetable, rooms, activities, lists) with editable forms

session_start();
require_once 'functions.php';

$message = '';
$messageType = '';

// Handle POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verify CSRF token
    if (!isset($_POST['csrf_token']) || !verifyCSRFToken($_POST['csrf_token'])) {
        $message = 'Invalid security token. Please refresh and try again.';
        $messageType = 'error';
    } else {
        $action = $_POST['action'] ?? '';
        
        if ($action === 'update_section') {
            // Update section content
            $key = $_POST['section_key'] ?? '';
            $content = $_POST['content'] ?? '';
            $name = $_POST['name'] ?? '';
            
            // Validate inputs
            $contentValid = validateInput($content, 5000, false);
            $nameValid = validateInput($name, 100, true);
            
            if (!$contentValid['valid']) {
                $message = $contentValid['error'];
                $messageType = 'error';
            } elseif (!$nameValid['valid']) {
                $message = 'Name: ' . $nameValid['error'];
                $messageType = 'error';
            } else {
                if (updateSection($key, $contentValid['value'], $nameValid['value'])) {
                    $message = 'Section updated successfully!';
                    $messageType = 'success';
                } else {
                    $message = 'Failed to update section.';
                    $messageType = 'error';
                }
            }
            
        } elseif ($action === 'add_list_item') {
            // Add list item
            $listKey = $_POST['list_key'] ?? '';
            $itemText = $_POST['item_text'] ?? '';
            $name = $_POST['name'] ?? '';
            
            // Validate inputs
            $itemValid = validateInput($itemText, 500, true);
            $nameValid = validateInput($name, 100, true);
            
            if (!$itemValid['valid']) {
                $message = 'Item: ' . $itemValid['error'];
                $messageType = 'error';
            } elseif (!$nameValid['valid']) {
                $message = 'Name: ' . $nameValid['error'];
                $messageType = 'error';
            } else {
                if (addListItem($listKey, $itemValid['value'], $nameValid['value'])) {
                    $message = 'Item added successfully!';
                    $messageType = 'success';
                } else {
                    $message = 'Failed to add item.';
                    $messageType = 'error';
                }
            }
            
        } elseif ($action === 'delete_list_item') {
            // Delete list item
            $itemId = $_POST['item_id'] ?? 0;
            if (deleteListItem($itemId)) {
                $message = 'Item deleted successfully!';
                $messageType = 'success';
            } else {
                $message = 'Failed to delete item.';
                $messageType = 'error';
            }
            
        } elseif ($action === 'edit_list_item') {
            // Edit list item
            $itemId = $_POST['item_id'] ?? 0;
            $itemText = $_POST['item_text'] ?? '';
            $name = $_POST['name'] ?? '';
            
            // Validate inputs
            $itemValid = validateInput($itemText, 500, true);
            $nameValid = validateInput($name, 100, true);
            
            if (!$itemValid['valid']) {
                $message = 'Item: ' . $itemValid['error'];
                $messageType = 'error';
            } elseif (!$nameValid['valid']) {
                $message = 'Name: ' . $nameValid['error'];
                $messageType = 'error';
            } else {
                if (updateListItem($itemId, $itemValid['value'], $nameValid['value'])) {
                    $message = 'Item updated successfully!';
                    $messageType = 'success';
                } else {
                    $message = 'Failed to update item.';
                    $messageType = 'error';
                }
            }
            
        } elseif ($action === 'toggle_list_item') {
            // Toggle checked status
            $itemId = $_POST['item_id'] ?? 0;
            if (toggleListItemChecked($itemId)) {
                $message = 'Item updated!';
                $messageType = 'success';
            } else {
                $message = 'Failed to update item.';
                $messageType = 'error';
            }
        }
    }
    
    // Redirect to prevent form resubmission
    if ($messageType === 'success') {
        header('Location: index.php?success=1');
        exit;
    }
}

// Get all sections
$timetableSections = getSectionsByPrefix('timetable-');
$roomSections = getSectionsByPrefix('room-');
$activitySections = getSectionsByPrefix('activities-');

// Get list items
$shoppingDay1Items = getListItems('shopping-day1');
$shoppingGeneralItems = getListItems('shopping-general');
$equipmentItems = getListItems('equipment');

// Generate CSRF token
$csrfToken = generateCSRFToken();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Year's Trip - Planning</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>🎉 NEW YEAR'S TRIP 🎊</h1>
        
        <?php if ($message): ?>
            <div class="<?php echo h($messageType); ?>">
                <?php echo h($message); ?>
            </div>
        <?php endif; ?>
        
        <?php if (isset($_GET['success'])): ?>
            <div class="success">Changes saved successfully!</div>
        <?php endif; ?>
        
        <!-- TIMETABLE (MEALS) SECTION -->
        <h2>📅 Timetable - Meals</h2>
        <div class="section-group">
            <?php
            $days = [
                'tue30' => 'Tuesday 30',
                'wed31' => 'Wednesday 31',
                'thu1' => 'Thursday 1',
                'fri2' => 'Friday 2'
            ];
            foreach ($days as $dayKey => $dayName):
            ?>
                <div>
                    <h3><?php echo h($dayName); ?></h3>
                    <div class="timetable-grid">
                        <?php
                        foreach (['breakfast', 'dinner', 'tea', 'supper'] as $meal):
                            $section = getSection("timetable-$dayKey-$meal");
                            if ($section):
                        ?>
                            <div class="card">
                                <h3><?php echo ucfirst($meal); ?></h3>
                                <div class="card-content">
                                    <?php if (!empty($section['content'])): ?>
                                        <?php echo nl2br(h($section['content'])); ?>
                                    <?php else: ?>
                                        <em style="color: var(--text-dim);">No information yet</em>
                                    <?php endif; ?>
                                </div>
                                <?php if ($section['name']): ?>
                                    <div class="meta">
                                        Last updated by <?php echo h($section['name']); ?> 
                                        on <?php echo formatUKDateTime($section['updated_at']); ?>
                                    </div>
                                <?php endif; ?>
                                <button class="edit-toggle">Edit</button>
                                <form method="POST" class="edit-form">
                                    <input type="hidden" name="csrf_token" value="<?php echo h($csrfToken); ?>">
                                    <input type="hidden" name="action" value="update_section">
                                    <input type="hidden" name="section_key" value="<?php echo h($section['section_key']); ?>">
                                    <textarea name="content" placeholder="Enter meal details..."><?php echo h($section['content']); ?></textarea>
                                    <input type="text" name="name" placeholder="Your name (required)" required>
                                    <button type="submit">Save</button>
                                </form>
                            </div>
                        <?php 
                            endif;
                        endforeach; 
                        ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
        
        <!-- GUEST ROOMS SECTION -->
        <h2>🛏️ Guest Rooms</h2>
        <div class="room-grid">
            <?php foreach ($roomSections as $room): ?>
                <div class="card">
                    <h3><?php echo h($room['title']); ?></h3>
                    <div class="card-content">
                        <?php if (!empty($room['content'])): ?>
                            <?php echo nl2br(h($room['content'])); ?>
                        <?php else: ?>
                            <em style="color: var(--text-dim);">No notes yet</em>
                        <?php endif; ?>
                    </div>
                    <?php if ($room['name']): ?>
                        <div class="meta">
                            Last updated by <?php echo h($room['name']); ?> 
                            on <?php echo formatUKDateTime($room['updated_at']); ?>
                        </div>
                    <?php endif; ?>
                    <button class="edit-toggle">Edit</button>
                    <form method="POST" class="edit-form">
                        <input type="hidden" name="csrf_token" value="<?php echo h($csrfToken); ?>">
                        <input type="hidden" name="action" value="update_section">
                        <input type="hidden" name="section_key" value="<?php echo h($room['section_key']); ?>">
                        <textarea name="content" placeholder="Enter room notes..."><?php echo h($room['content']); ?></textarea>
                        <input type="text" name="name" placeholder="Your name (required)" required>
                        <button type="submit">Save</button>
                    </form>
                </div>
            <?php endforeach; ?>
        </div>
        
        <!-- GAMES & ACTIVITIES SECTION -->
        <h2>🎮 Games & Activities</h2>
        <div class="section-group">
            <?php
            $activityDays = [
                'tue30' => 'Tuesday 30',
                'wed31' => 'Wednesday 31 (NEW YEARS EVE)',
                'thu1' => 'Thursday 1 (NEW YEARS DAY)',
                'fri2' => 'Friday 2'
            ];
            foreach ($activityDays as $dayKey => $dayName):
            ?>
                <div>
                    <h3><?php echo h($dayName); ?></h3>
                    <div class="activity-grid">
                        <?php
                        foreach (['morning', 'afternoon', 'evening'] as $slot):
                            $section = getSection("activities-$dayKey-$slot");
                            if ($section):
                        ?>
                            <div class="card">
                                <h3><?php echo ucfirst($slot); ?></h3>
                                <div class="card-content">
                                    <?php if (!empty($section['content'])): ?>
                                        <?php echo nl2br(h($section['content'])); ?>
                                    <?php else: ?>
                                        <em style="color: var(--text-dim);">No activities yet</em>
                                    <?php endif; ?>
                                </div>
                                <?php if ($section['name']): ?>
                                    <div class="meta">
                                        Last updated by <?php echo h($section['name']); ?> 
                                        on <?php echo formatUKDateTime($section['updated_at']); ?>
                                    </div>
                                <?php endif; ?>
                                <button class="edit-toggle">Edit</button>
                                <form method="POST" class="edit-form">
                                    <input type="hidden" name="csrf_token" value="<?php echo h($csrfToken); ?>">
                                    <input type="hidden" name="action" value="update_section">
                                    <input type="hidden" name="section_key" value="<?php echo h($section['section_key']); ?>">
                                    <textarea name="content" placeholder="Enter activity details..."><?php echo h($section['content']); ?></textarea>
                                    <input type="text" name="name" placeholder="Your name (required)" required>
                                    <button type="submit">Save</button>
                                </form>
                            </div>
                        <?php 
                            endif;
                        endforeach; 
                        ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
        
        <!-- SHOPPING LIST - DAY 1 -->
        <div class="list-section">
            <h2>🛒 Day 1 Shopping List</h2>
            <div class="add-item-form">
                <form method="POST">
                    <input type="hidden" name="csrf_token" value="<?php echo h($csrfToken); ?>">
                    <input type="hidden" name="action" value="add_list_item">
                    <input type="hidden" name="list_key" value="shopping-day1">
                    <input type="text" name="item_text" placeholder="What do we need?" required maxlength="500">
                    <input type="text" name="name" placeholder="Your name (required)" required maxlength="100">
                    <button type="submit" class="secondary">Add Item</button>
                </form>
            </div>
            <ul class="list-items">
                <?php foreach ($shoppingDay1Items as $item): ?>
                    <li class="list-item <?php echo $item['checked'] ? 'checked' : ''; ?>" data-item-id="<?php echo h($item['id']); ?>">
                        <div class="list-item-checkbox">
                            <form method="POST" style="display: inline;">
                                <input type="hidden" name="csrf_token" value="<?php echo h($csrfToken); ?>">
                                <input type="hidden" name="action" value="toggle_list_item">
                                <input type="hidden" name="item_id" value="<?php echo h($item['id']); ?>">
                                <input type="checkbox" class="item-checkbox" <?php echo $item['checked'] ? 'checked' : ''; ?> 
                                       onchange="this.form.submit()" title="Mark as obtained">
                            </form>
                        </div>
                        <div class="list-item-content">
                            <div class="list-item-text"><?php echo h($item['item_text']); ?></div>
                            <div class="meta">
                                Added by <?php echo h($item['name']); ?> 
                                on <?php echo formatUKDateTime($item['created_at']); ?>
                            </div>
                            <form method="POST" class="edit-item-form">
                                <input type="hidden" name="csrf_token" value="<?php echo h($csrfToken); ?>">
                                <input type="hidden" name="action" value="edit_list_item">
                                <input type="hidden" name="item_id" value="<?php echo h($item['id']); ?>">
                                <input type="text" name="item_text" value="<?php echo h($item['item_text']); ?>" required maxlength="500">
                                <input type="text" name="name" placeholder="Your name (required)" required maxlength="100">
                                <button type="submit">Save</button>
                                <button type="button" class="cancel-edit">Cancel</button>
                            </form>
                        </div>
                        <div class="list-item-actions">
                            <button class="edit-item-toggle">Edit</button>
                            <form method="POST" style="display: inline;">
                                <input type="hidden" name="csrf_token" value="<?php echo h($csrfToken); ?>">
                                <input type="hidden" name="action" value="delete_list_item">
                                <input type="hidden" name="item_id" value="<?php echo h($item['id']); ?>">
                                <button type="submit" class="delete delete-item">Delete</button>
                            </form>
                        </div>
                    </li>
                <?php endforeach; ?>
                <?php if (empty($shoppingDay1Items)): ?>
                    <li class="empty-message">No items yet. Add one above!</li>
                <?php endif; ?>
            </ul>
        </div>
        
        <!-- SHOPPING LIST - GENERAL -->
        <div class="list-section">
            <h2>🛒 Shopping List (General)</h2>
            <div class="add-item-form">
                <form method="POST">
                    <input type="hidden" name="csrf_token" value="<?php echo h($csrfToken); ?>">
                    <input type="hidden" name="action" value="add_list_item">
                    <input type="hidden" name="list_key" value="shopping-general">
                    <input type="text" name="item_text" placeholder="What do we need?" required maxlength="500">
                    <input type="text" name="name" placeholder="Your name (required)" required maxlength="100">
                    <button type="submit" class="secondary">Add Item</button>
                </form>
            </div>
            <ul class="list-items">
                <?php foreach ($shoppingGeneralItems as $item): ?>
                    <li class="list-item <?php echo $item['checked'] ? 'checked' : ''; ?>" data-item-id="<?php echo h($item['id']); ?>">
                        <div class="list-item-checkbox">
                            <form method="POST" style="display: inline;">
                                <input type="hidden" name="csrf_token" value="<?php echo h($csrfToken); ?>">
                                <input type="hidden" name="action" value="toggle_list_item">
                                <input type="hidden" name="item_id" value="<?php echo h($item['id']); ?>">
                                <input type="checkbox" class="item-checkbox" <?php echo $item['checked'] ? 'checked' : ''; ?> 
                                       onchange="this.form.submit()" title="Mark as obtained">
                            </form>
                        </div>
                        <div class="list-item-content">
                            <div class="list-item-text"><?php echo h($item['item_text']); ?></div>
                            <div class="meta">
                                Added by <?php echo h($item['name']); ?> 
                                on <?php echo formatUKDateTime($item['created_at']); ?>
                            </div>
                            <form method="POST" class="edit-item-form">
                                <input type="hidden" name="csrf_token" value="<?php echo h($csrfToken); ?>">
                                <input type="hidden" name="action" value="edit_list_item">
                                <input type="hidden" name="item_id" value="<?php echo h($item['id']); ?>">
                                <input type="text" name="item_text" value="<?php echo h($item['item_text']); ?>" required maxlength="500">
                                <input type="text" name="name" placeholder="Your name (required)" required maxlength="100">
                                <button type="submit">Save</button>
                                <button type="button" class="cancel-edit">Cancel</button>
                            </form>
                        </div>
                        <div class="list-item-actions">
                            <button class="edit-item-toggle">Edit</button>
                            <form method="POST" style="display: inline;">
                                <input type="hidden" name="csrf_token" value="<?php echo h($csrfToken); ?>">
                                <input type="hidden" name="action" value="delete_list_item">
                                <input type="hidden" name="item_id" value="<?php echo h($item['id']); ?>">
                                <button type="submit" class="delete delete-item">Delete</button>
                            </form>
                        </div>
                    </li>
                <?php endforeach; ?>
                <?php if (empty($shoppingGeneralItems)): ?>
                    <li class="empty-message">No items yet. Add one above!</li>
                <?php endif; ?>
            </ul>
        </div>
        
        <!-- EQUIPMENT/ITEMS PEOPLE WILL BRING -->
        <div class="list-section">
            <h2>🎒 Items/Equipment People Will Bring</h2>
            <div class="add-item-form">
                <form method="POST">
                    <input type="hidden" name="csrf_token" value="<?php echo h($csrfToken); ?>">
                    <input type="hidden" name="action" value="add_list_item">
                    <input type="hidden" name="list_key" value="equipment">
                    <input type="text" name="item_text" placeholder="What are you bringing?" required maxlength="500">
                    <input type="text" name="name" placeholder="Your name (required)" required maxlength="100">
                    <button type="submit" class="secondary">Add Item</button>
                </form>
            </div>
            <ul class="list-items">
                <?php foreach ($equipmentItems as $item): ?>
                    <li class="list-item <?php echo $item['checked'] ? 'checked' : ''; ?>" data-item-id="<?php echo h($item['id']); ?>">
                        <div class="list-item-checkbox">
                            <form method="POST" style="display: inline;">
                                <input type="hidden" name="csrf_token" value="<?php echo h($csrfToken); ?>">
                                <input type="hidden" name="action" value="toggle_list_item">
                                <input type="hidden" name="item_id" value="<?php echo h($item['id']); ?>">
                                <input type="checkbox" class="item-checkbox" <?php echo $item['checked'] ? 'checked' : ''; ?> 
                                       onchange="this.form.submit()" title="Mark as brought">
                            </form>
                        </div>
                        <div class="list-item-content">
                            <div class="list-item-text"><?php echo h($item['item_text']); ?></div>
                            <div class="meta">
                                <?php echo h($item['name']); ?> will bring this 
                                (added <?php echo formatUKDateTime($item['created_at']); ?>)
                            </div>
                            <form method="POST" class="edit-item-form">
                                <input type="hidden" name="csrf_token" value="<?php echo h($csrfToken); ?>">
                                <input type="hidden" name="action" value="edit_list_item">
                                <input type="hidden" name="item_id" value="<?php echo h($item['id']); ?>">
                                <input type="text" name="item_text" value="<?php echo h($item['item_text']); ?>" required maxlength="500">
                                <input type="text" name="name" placeholder="Your name (required)" required maxlength="100">
                                <button type="submit">Save</button>
                                <button type="button" class="cancel-edit">Cancel</button>
                            </form>
                        </div>
                        <div class="list-item-actions">
                            <button class="edit-item-toggle">Edit</button>
                            <form method="POST" style="display: inline;">
                                <input type="hidden" name="csrf_token" value="<?php echo h($csrfToken); ?>">
                                <input type="hidden" name="action" value="delete_list_item">
                                <input type="hidden" name="item_id" value="<?php echo h($item['id']); ?>">
                                <button type="submit" class="delete delete-item">Delete</button>
                            </form>
                        </div>
                    </li>
                <?php endforeach; ?>
                <?php if (empty($equipmentItems)): ?>
                    <li class="empty-message">No items yet. Add one above!</li>
                <?php endif; ?>
            </ul>
        </div>
        
        <div style="text-align: center; margin: 40px 0; color: var(--text-dim);">
            <p>Have a fantastic New Year's celebration! 🎆</p>
        </div>
    </div>
    
    <script src="script.js"></script>
</body>
</html>
