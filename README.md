# New Year's Trip Website

A mobile-friendly, neon-themed website for planning a New Year's trip. Built with Next.js, TypeScript, Tailwind CSS, and MySQL.

## Features

- **Timetable (Meals)**: Plan breakfast, dinner, tea, and supper for Tuesday 30th, Wednesday 31st, Thursday 1st, and Friday 2nd
- **Guest Rooms**: Manage 8 bedrooms with notes about who's staying
- **Games & Activities**: Schedule morning, afternoon, and evening activities for each day
- **Shopping Lists**: Day 1 shopping list and general shopping list
- **Equipment List**: Track items people will bring (tables, chairs, etc.)

All sections are editable by anyone, with name attribution and UK-formatted timestamps (DD/MM/YYYY HH:mm).

## Tech Stack

- **Frontend**: Next.js 16+ with TypeScript
- **Styling**: Tailwind CSS with custom neon theme
- **Backend**: Next.js API routes
- **Database**: MySQL
- **Mobile-first**: Responsive design for all screen sizes

## Prerequisites

- Node.js 18+ and npm
- MySQL database
- Database credentials (see Database Setup below)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd newyear
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Edit `.env.local` with your database credentials:
```env
DB_HOST=your-production-host
DB_USER=chrisirl_newyear
DB_PASSWORD=Subaru5554346
DB_NAME=chrisirl_newyear
```

**Note**: Update `DB_HOST` with your actual MySQL server hostname or IP address. The password shown here is a placeholder and should be rotated after deployment.

## Database Setup

1. Connect to your MySQL server:
```bash
mysql -h your-host -u chrisirl_newyear -p
```

2. Run the schema migration:
```bash
mysql -h your-host -u chrisirl_newyear -p chrisirl_newyear < schema.sql
```

This creates two tables:
- `sections`: Stores editable sections (timetable, rooms, activities)
- `lists`: Stores list items (shopping lists, equipment)

## Running the Application

### Development Mode

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
newyear/
├── app/
│   ├── api/
│   │   ├── sections/      # API routes for sections
│   │   └── lists/         # API routes for lists
│   ├── globals.css        # Global styles with neon theme
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main page with all sections
├── components/
│   ├── EditableSection.tsx # Reusable section component
│   └── EditableList.tsx    # Reusable list component
├── lib/
│   ├── db.ts              # MySQL connection pool
│   └── dateUtils.ts       # UK date formatting utilities
├── schema.sql             # Database schema
├── .env.example           # Environment variables template
└── README.md
```

## API Endpoints

### Sections API (`/api/sections`)

**GET** - Fetch section(s)
- Query params: `key` (optional) - specific section key
- Returns: Section object or array of all sections

**POST** - Create/update section
- Body: `{ section_key, title, content, name }`
- Returns: Updated section object

### Lists API (`/api/lists`)

**GET** - Fetch list items
- Query params: `list_key` (required)
- Returns: Array of list items

**POST** - Add list item
- Body: `{ list_key, item_text, name }`
- Returns: Created item object

**DELETE** - Remove list item
- Query params: `id` (required)
- Returns: Success confirmation

## Data Validation

- All inputs are trimmed
- Name field: Required, max 100 characters
- Section content: Max 5000 characters
- List item text: Max 500 characters
- Parameterized queries prevent SQL injection

## Security Considerations

- Uses parameterized queries for all database operations
- Input validation on both client and server
- No authentication required (open edit as per requirements)
- Consider adding rate limiting for production use
- Database password should be rotated after initial deployment

## Styling

The neon theme uses:
- Dark background (gray-900)
- Neon accent colors: pink, blue, green, yellow, purple
- Custom shadows for neon glow effects
- Mobile-first responsive layouts
- Large tap targets for mobile usability

## Assumptions

1. Database host will be configured in environment variables
2. MySQL server is accessible from the deployment environment
3. Database credentials provided are for production use
4. No user authentication is needed (open editing)
5. All times are stored in UK timezone (handled by MySQL server timezone)

## Troubleshooting

### Cannot connect to database
- Verify `DB_HOST` is correct in `.env.local`
- Check that MySQL server allows connections from your IP
- Verify database credentials are correct

### Tables not found
- Ensure you've run the `schema.sql` migration
- Verify you're connected to the correct database

### Styles not loading
- Run `npm run dev` to rebuild Tailwind CSS
- Clear browser cache and hard reload

## Future Enhancements

- Add rate limiting to prevent abuse
- Implement user authentication (optional)
- Add image upload for meals/activities
- Export data to PDF or calendar format
- Add email notifications for updates

## License

ISC