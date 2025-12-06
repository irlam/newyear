Goal: Rebuild newyear.chrisirlam.com as a PHP + MySQL app with modern neon-themed UI, fully mobile responsive, and open editing (any visitor can add/edit content; must capture name + timestamp in UK format). No Node/Next—just PHP, HTML, CSS (and minimal JS where needed).

Tech stack & constraints

Server-side: PHP 8.x (plain PHP, no heavy framework).
Frontend: HTML, CSS (neon/dark theme), minimal vanilla JS for interactions.
Database: MySQL using provided credentials (config via a single PHP config file). Use prepared statements.
Time/date format: UK (DD/MM/YYYY HH:mm).
Add a brief description comment at the top of every file.
Comment code with intent; keep it tidy/modern.
Features (must-have)

Open editing: any user can submit text; every submission requires “name” and records timestamp.
Sections:
NEW YEARS TRIP – Timetable (meals)
Days: Tue 30, Wed 31, Thu 1, Fri 2
Slots: breakfast, dinner, tea, supper
Editable text + name + last updated.
NEW YEARS TRIP – Guest rooms
Rooms:
Bedroom 1 (downstairs): 2 single beds & ensuite
Bedroom 2 (downstairs): 2 single beds & ensuite
Bedroom 3 (downstairs): 3 single beds
Bedroom 4 (upstairs): double bed and bunk beds (bathroom on corridor)
Bedroom 5 (upstairs): single and double beds & ensuite
Bedroom 6 (upstairs): 2 single beds (bathroom on corridor)
Bedroom 7
Bedroom 8
Each room: notes + editor name + last updated.
NEW YEARS TRIP – GAMES & ACTIVITIES
Days: Tue 30, Wed 31 (NEW YEARS EVE), Thu 1 (NEW YEARS DAY), Fri 2
Slots: morning, afternoon, evening
Editable entries + name + last updated.
NEW YEARS TRIP – DAY 1 SHOPPING LIST
Add list items (item text + name + timestamp); newest-first.
NEW YEARS TRIP – SHOPPING LIST (general)
Same as above.
NEW YEARS TRIP – ITEMS/EQUIPMENT PEOPLE WILL BRING
Items with who’s bringing them (name), notes, timestamp.
Data model (suggested)

sections table: id, key (e.g., timetable-tue30-breakfast), title, content, name, updated_at.
lists table: id, list_key (e.g., shopping-general), item_text, name, created_at.
Seed initial rows/keys so pages render even before edits.
Provide an SQL schema file (migration).
UI/UX

Neon aesthetic on dark background; high contrast; large tap targets; mobile-first responsive.
Simple forms/inputs per section; Save button; require name; show last updated time.
Lists: add item field + name; show newest-first; optional delete.
Config

Single PHP config file to read MySQL creds from environment (or a .php config with placeholders).
Credentials to wire (user will rotate later):
DB_HOST: (host)
DB_USER: chrisirl_newyear
DB_PASSWORD: Subaru5554346
DB_NAME: chrisirl_newyear
Security & robustness

Server-side validation: trim, length limits, require name and text.
Prepared statements; escape output.
Basic CSRF token (simple hidden token in session) preferred if easy; otherwise note in README.
Deliverables

Full PHP project files (no omissions).
SQL schema/migration file.
README with setup steps: create DB, import schema, set env/config, how to run on typical shared hosting (e.g., drop-in under public_html/newyear).
Brief description comment at top of every file.
Keep code modern/clean.
What to build

Entry point: index.php rendering all sections and lists.
PHP endpoints (can be the same file with routing or small handlers) to handle POST for:
Updating a section (key/title/content/name).
Adding list items (list_key/item_text/name).
Optional delete list item.
Shared includes: config.php (DB), db.php (PDO helper), functions.php (render helpers, sanitization).
Assets: a CSS file for neon theme; minimal JS for form submissions/UX (vanilla).
Completion criteria

After deployment, hitting https://newyear.chrisirlam.com shows the neon site with all sections and editable forms.
All writes go to MySQL and reflect immediately on reload.
UK date/time shown for last updated/created.
