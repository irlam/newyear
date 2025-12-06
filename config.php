<?php
// Configuration file for database connection
// Reads MySQL credentials from environment variables with fallback defaults

// Note: For production, set these as environment variables and remove fallback values
// to prevent credentials from being stored in source code
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_USER', getenv('DB_USER') ?: 'chrisirl_newyear');
define('DB_PASSWORD', getenv('DB_PASSWORD') ?: 'Subaru5554346');
define('DB_NAME', getenv('DB_NAME') ?: 'chrisirl_newyear');

// Timezone for UK format
date_default_timezone_set('Europe/London');
