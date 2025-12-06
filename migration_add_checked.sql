-- Migration to add checked column to lists table
-- Run this if you have an existing database

ALTER TABLE lists ADD COLUMN checked TINYINT(1) DEFAULT 0 AFTER name;
