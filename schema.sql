-- Database schema for New Year's Trip Planning Application
-- Creates tables for sections (editable content areas) and lists (shopping/equipment items)

CREATE TABLE IF NOT EXISTS sections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    section_key VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    name VARCHAR(100),
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_section_key (section_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS lists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    list_key VARCHAR(100) NOT NULL,
    item_text VARCHAR(500) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_list_key (list_key),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed initial sections for Timetable (Meals)
INSERT INTO sections (section_key, title, content, name) VALUES
-- Tuesday 30
('timetable-tue30-breakfast', 'Tuesday 30 - Breakfast', '', NULL),
('timetable-tue30-dinner', 'Tuesday 30 - Dinner', '', NULL),
('timetable-tue30-tea', 'Tuesday 30 - Tea', '', NULL),
('timetable-tue30-supper', 'Tuesday 30 - Supper', '', NULL),
-- Wednesday 31
('timetable-wed31-breakfast', 'Wednesday 31 - Breakfast', '', NULL),
('timetable-wed31-dinner', 'Wednesday 31 - Dinner', '', NULL),
('timetable-wed31-tea', 'Wednesday 31 - Tea', '', NULL),
('timetable-wed31-supper', 'Wednesday 31 - Supper', '', NULL),
-- Thursday 1
('timetable-thu1-breakfast', 'Thursday 1 - Breakfast', '', NULL),
('timetable-thu1-dinner', 'Thursday 1 - Dinner', '', NULL),
('timetable-thu1-tea', 'Thursday 1 - Tea', '', NULL),
('timetable-thu1-supper', 'Thursday 1 - Supper', '', NULL),
-- Friday 2
('timetable-fri2-breakfast', 'Friday 2 - Breakfast', '', NULL),
('timetable-fri2-dinner', 'Friday 2 - Dinner', '', NULL),
('timetable-fri2-tea', 'Friday 2 - Tea', '', NULL),
('timetable-fri2-supper', 'Friday 2 - Supper', '', NULL);

-- Seed initial sections for Guest Rooms
INSERT INTO sections (section_key, title, content, name) VALUES
('room-1', 'Bedroom 1 (downstairs): 2 single beds & ensuite', '', NULL),
('room-2', 'Bedroom 2 (downstairs): 2 single beds & ensuite', '', NULL),
('room-3', 'Bedroom 3 (downstairs): 3 single beds', '', NULL),
('room-4', 'Bedroom 4 (upstairs): double bed and bunk beds (bathroom on corridor)', '', NULL),
('room-5', 'Bedroom 5 (upstairs): single and double beds & ensuite', '', NULL),
('room-6', 'Bedroom 6 (upstairs): 2 single beds (bathroom on corridor)', '', NULL),
('room-7', 'Bedroom 7', '', NULL),
('room-8', 'Bedroom 8', '', NULL);

-- Seed initial sections for Games & Activities
INSERT INTO sections (section_key, title, content, name) VALUES
-- Tuesday 30
('activities-tue30-morning', 'Tuesday 30 - Morning', '', NULL),
('activities-tue30-afternoon', 'Tuesday 30 - Afternoon', '', NULL),
('activities-tue30-evening', 'Tuesday 30 - Evening', '', NULL),
-- Wednesday 31 (NEW YEARS EVE)
('activities-wed31-morning', 'Wednesday 31 (NEW YEARS EVE) - Morning', '', NULL),
('activities-wed31-afternoon', 'Wednesday 31 (NEW YEARS EVE) - Afternoon', '', NULL),
('activities-wed31-evening', 'Wednesday 31 (NEW YEARS EVE) - Evening', '', NULL),
-- Thursday 1 (NEW YEARS DAY)
('activities-thu1-morning', 'Thursday 1 (NEW YEARS DAY) - Morning', '', NULL),
('activities-thu1-afternoon', 'Thursday 1 (NEW YEARS DAY) - Afternoon', '', NULL),
('activities-thu1-evening', 'Thursday 1 (NEW YEARS DAY) - Evening', '', NULL),
-- Friday 2
('activities-fri2-morning', 'Friday 2 - Morning', '', NULL),
('activities-fri2-afternoon', 'Friday 2 - Afternoon', '', NULL),
('activities-fri2-evening', 'Friday 2 - Evening', '', NULL);
