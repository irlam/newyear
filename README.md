# New Year's Trip Planning Application

A collaborative PHP + MySQL web application for planning a New Year's trip. Features a neon-themed UI with open editing capabilities where any visitor can add and edit content.

## Features

- **Timetable (Meals)**: Plan breakfast, dinner, tea, and supper for each day (Tue 30, Wed 31, Thu 1, Fri 2)
- **Guest Rooms**: Manage room assignments and notes for 8 bedrooms
- **Games & Activities**: Schedule morning, afternoon, and evening activities
- **Shopping Lists**: Day 1 and general shopping lists with collaborative item management
- **Equipment Tracking**: Track what items people will bring
- **Open Editing**: Any visitor can contribute; all changes tracked with name and timestamp
- **UK Date Format**: All timestamps displayed in DD/MM/YYYY HH:mm format
- **Mobile Responsive**: Fully optimized for mobile devices
- **Neon Theme**: Modern dark background with vibrant neon accents

## Tech Stack

- **Backend**: PHP 8.x (vanilla PHP, no framework)
- **Database**: MySQL with PDO
- **Frontend**: HTML, CSS, vanilla JavaScript
- **Security**: Prepared statements, CSRF protection, input validation

## Requirements

- PHP 8.0 or higher
- MySQL 5.7 or higher
- Web server (Apache, Nginx, or similar)
- MySQL database access

## Setup Instructions

### 1. Database Setup

Create a MySQL database and import the schema:

```bash
# Log into MySQL
mysql -u your_username -p

# Create database (if needed)
CREATE DATABASE chrisirl_newyear CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Exit MySQL
exit

# Import the schema
mysql -u your_username -p chrisirl_newyear < schema.sql
```

### 2. Configuration

The application reads database credentials from environment variables or uses defaults in `config.php`.

**Option A: Environment Variables (Recommended)**

Set these environment variables on your hosting:

- `DB_HOST`: Database host (default: `localhost`)
- `DB_USER`: Database username (default: `chrisirl_newyear`)
- `DB_PASSWORD`: Database password (default: `Subaru5554346`)
- `DB_NAME`: Database name (default: `chrisirl_newyear`)

**Option B: Edit config.php Directly**

Edit the `config.php` file and update the default values:

```php
define('DB_HOST', 'your_host');
define('DB_USER', 'your_username');
define('DB_PASSWORD', 'your_password');
define('DB_NAME', 'your_database');
```

### 3. Deployment

#### Shared Hosting (e.g., cPanel)

1. Upload all files to your hosting directory (e.g., `public_html/newyear/`)
2. Ensure the directory structure is:
   ```
   newyear/
   ├── index.php
   ├── config.php
   ├── db.php
   ├── functions.php
   ├── style.css
   ├── script.js
   └── schema.sql
   ```
3. Make sure PHP sessions are enabled (usually default)
4. Visit your site (e.g., `https://newyear.chrisirlam.com`)

#### Local Development

1. Use PHP's built-in server:
   ```bash
   cd /path/to/newyear
   php -S localhost:8000
   ```
2. Visit `http://localhost:8000` in your browser

#### Apache Configuration

If using Apache, ensure `.htaccess` allows PHP execution. Create `.htaccess`:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
</IfModule>

# Enable PHP error logging (disable in production)
php_flag display_errors off
php_flag log_errors on
```

## File Descriptions

- **index.php**: Main application entry point; handles all routing and rendering
- **config.php**: Database configuration with environment variable support
- **db.php**: PDO database connection helper with singleton pattern
- **functions.php**: Shared utility functions for validation, sanitization, and database operations
- **style.css**: Neon-themed CSS with mobile-responsive design
- **script.js**: Minimal JavaScript for edit toggles and UX enhancements
- **schema.sql**: Database schema with initial seed data

## Security Features

- **Prepared Statements**: All database queries use PDO prepared statements to prevent SQL injection
- **CSRF Protection**: Session-based CSRF tokens on all forms
- **Input Validation**: Server-side validation with length limits and required fields
- **Output Escaping**: All user content is escaped for HTML display
- **Validation Limits**:
  - Name: max 100 characters, required
  - Content: max 5000 characters
  - List items: max 500 characters

## Usage

### Editing Sections

1. Click the "Edit" button on any section
2. Enter or modify the content
3. Enter your name (required)
4. Click "Save"
5. Your changes appear immediately with your name and timestamp

### Managing Lists

1. Fill in the item text field
2. Enter your name (required)
3. Click "Add Item"
4. Items appear in newest-first order
5. Use "Delete" button to remove items (with confirmation)

## Troubleshooting

### Database Connection Failed

- Verify database credentials in `config.php`
- Ensure MySQL server is running
- Check that the database exists and schema is imported
- Verify user has proper permissions

### PHP Errors

- Check PHP error logs (location varies by hosting)
- Ensure PHP 8.0+ is installed: `php -v`
- Verify all required PHP extensions are enabled (PDO, pdo_mysql)

### Permission Issues

- Ensure web server has read access to all files
- PHP sessions require write access to session directory (usually handled by hosting)

## Maintenance

### Rotating Database Credentials

1. Update credentials in MySQL
2. Update environment variables or `config.php`
3. Restart web server if needed

### Backing Up Data

```bash
# Export database
mysqldump -u your_username -p chrisirl_newyear > backup.sql

# Restore from backup
mysql -u your_username -p chrisirl_newyear < backup.sql
```

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This is a custom application for personal use.

## Support

For issues or questions, contact the repository maintainer.
