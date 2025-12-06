-- Database schema for New Year's Trip website
-- Creates tables for editable sections and list items with timestamps

-- Table for editable sections (timetable slots, room notes, activities)
CREATE TABLE IF NOT EXISTS sections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  section_key VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(200) NOT NULL,
  content TEXT,
  name VARCHAR(100) NOT NULL,
  updated_at DATETIME NOT NULL,
  INDEX idx_section_key (section_key),
  INDEX idx_updated_at (updated_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table for list items (shopping lists, equipment)
CREATE TABLE IF NOT EXISTS lists (
  id INT AUTO_INCREMENT PRIMARY KEY,
  list_key VARCHAR(100) NOT NULL,
  item_text VARCHAR(500) NOT NULL,
  name VARCHAR(100) NOT NULL,
  created_at DATETIME NOT NULL,
  INDEX idx_list_key (list_key),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional: Add some seed data for testing
-- You can uncomment these if you want some initial placeholder entries

-- INSERT INTO sections (section_key, title, content, name, updated_at) VALUES
-- ('timetable-breakfast-tue30', 'Breakfast', '', 'System', NOW()),
-- ('timetable-dinner-tue30', 'Dinner', '', 'System', NOW());
