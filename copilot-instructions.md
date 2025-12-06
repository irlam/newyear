

Goal: Build a mobile-friendly, neon-themed “New Year’s Trip” website for newyear.chrisirlam.com using modern, clean code. The site must let any visitor add/edit text in multiple sections and capture their name with each submission. Use the provided MySQL database. Keep times/dates in UK format (DD/MM/YYYY, 24h). Include a brief file-level description at the top of each file. Comment code with intent and “comment code for a later date” where helpful.

Tech stack (recommended)

Frontend: Next.js (latest) with TypeScript, Tailwind CSS for neon styling, mobile-first responsive.
Backend/API: Next.js API routes (or a small Express API if preferred) to handle CRUD to MySQL.
DB: MySQL (credentials below). Use a simple schema for sections/items with name + text + timestamps.
Persistence: Store all user submissions in MySQL; display latest content on load.
Database credentials (use in app config/env — I will rotate password later)

Host: (use production host as configured on deployment)
User: chrisirl_newyear
Database: chrisirl_newyear
Password: Subaru5554346
Features & sections (all editable by anyone, must capture “name”)

NEW YEARS TRIP – Timetable (meals)
Days: Tuesday 30th, Wednesday 31st, Thursday 1st, Friday 2nd
Slots per day: breakfast, dinner, tea, supper
Each slot: text + person’s name; fully editable; show last updated time.
NEW YEARS TRIP – Guest rooms
Rooms listed:
Bedroom 1 (downstairs): 2 single beds & ensuite
Bedroom 2 (downstairs): 2 single beds & ensuite
Bedroom 3 (downstairs): 3 single beds
Bedroom 4 (upstairs): double bed and bunk beds (bathroom on corridor)
Bedroom 5 (upstairs): single and double beds & ensuite
Bedroom 6 (upstairs): 2 single beds (bathroom on corridor)
Bedroom 7
Bedroom 8
Each room: editable notes + name of editor; last updated time.
NEW YEARS TRIP – GAMES & ACTIVITIES
Days: Tuesday 30th, Wednesday 31st (NEW YEARS EVE), Thursday 1st (NEW YEARS DAY), Friday 2nd
Slots per day: morning, afternoon, evening
Editable entries + name + last updated.
NEW YEARS TRIP – DAY 1 SHOPPING LIST
Editable list items; each item: text + added-by name + timestamp.
NEW YEARS TRIP – SHOPPING LIST (general)
Same as above (add/remove items; name + timestamp).
NEW YEARS TRIP – ITEMS/EQUIPMENT PEOPLE WILL BRING (tables/chairs etc)
List of items with who’s bringing them (name), notes, timestamp.
UX/styling requirements

Neon aesthetic (e.g., dark background, neon accents for headings/cards/buttons).
Mobile-first responsive layouts; readable neon color contrast; large tap targets.
Clear call-to-action buttons for “Add/Update”; inline edit or small modal is fine.
Show last updated time in UK format (DD/MM/YYYY HH:mm).
Include a short description comment at the top of each file stating what it does.
Data model (suggestion)

sections table: id, key (e.g., “timetable-breakfast-tue30”), title, content, name, updated_at
lists table: id, list_key (e.g., “shopping-general”), item_text, name, created_at
Alternatively, a single entries table with type/category columns; use what keeps code clean.
Add minimal seed to ensure sections render even before edits.
API endpoints (suggestion)

GET /api/sections?key=... -> fetch section content
POST /api/sections -> upsert { key, title, content, name }
GET /api/lists?list_key=... -> fetch list items
POST /api/lists -> add item { list_key, item_text, name }
DELETE /api/lists/:id -> optional remove
Frontend behavior

On load: fetch all sections/lists and render.
Each section: inline editable textarea/input + “Save” button; require name field.
Lists: add-item input + name; render items newest-first.
Show optimistic UI or simple loading states.
Security & robustness

Basic validation: trim inputs, length limits, prevent empty name/text.
Escape output for display; use parameterized queries.
Rate limiting optional but nice to have.
No auth required (open edit).
File/output requirements

Provide full file outputs (no elision). If over message limit, split into parts.
Add a brief file description at the top of every file.
Use modern, clean code and pretty UI defaults.
Deliverables

Full project files (frontend + API) ready to paste.
SQL schema/migration script for required tables.
README with setup/run instructions (include env vars for DB).
Note any assumptions and where to configure the DB host.
What changes to make (summary for the agent)

Scaffold a Next.js + TypeScript + Tailwind app with neon theme.
Implement editable sections and lists per spec, storing all data in MySQL using the provided credentials (config via env).
Add API routes for CRUD, with validation and timestamps (UK format).
Render mobile-first pages with neon styling; include last updated and name fields for every edit/add.
Provide full file contents, SQL schema, and README with setup instructions.
