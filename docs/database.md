# 📑 Database Documentation

## Tables Overview

### 1. `projects`

Stores information about different projects.

- **id**: `uuid` (PK, default `uuid_generate_v4()`)
- **title**: `text` (required)
- **description**: `text` (optional)
- **status**: `text` (`Open` | `Completed`)
- **created_at**: `timestamptz` (default `now()`)
- **updated_at**: `timestamptz` (default `now()`, auto-updated trigger)
- **is_draft**: `boolean` (optional)
- **link**: `text` (optional)

**Trigger:** `projects_updated_at` → calls `set_updated_at()` before every update.

---

### 2. `blogs`

Stores blog articles.

- **id**: `serial` (PK)
- **title**: `varchar(255)` (required)
- **author_name**: `varchar(100)` (required)
- **author_github**: `varchar(255)` (optional)
- **author_linkedin**: `varchar(255)` (optional)
- **category**: `varchar(50)` (optional)
- **tags**: `text[]` (optional)
- **cover_image_url**: `text` (optional)
- **summary**: `text` (required)
- **content**: `text` (required)
- **related_links**: `jsonb[]` (required)
- **created_at**: `timestamp` (default `now()`)
- **updated_at**: `timestamp` (default `now()`)

---

### 3. `timeline`

Stores events and milestones.

- **id**: `uuid` (PK, default `gen_random_uuid()`)
- **title**: `text` (required)
- **description**: `text` (optional)
- **date_of_event**: `date` (required)
- **images**: `text[]` (default `{}`)
- **tags**: `text[]` (default `{}`)
- **is_draft**: `boolean` (default `false`)
- **created_at**: `timestamptz` (default `now()`)
- **updated_at**: `timestamptz` (default `now()`)

**Trigger:** `update_timeline_updated_at` → calls `update_updated_at_column()` before every update.

---

### 4. `events`

Stores event announcements and registration details.

- **id**: `uuid` (PK, default `uuid_generate_v4()`)
- **title**: `text` (required)
- **description**: `text` (optional)
- **event_date**: `timestamptz` (required)
- **registration_open**: `timestamptz` (required)
- **registration_close**: `timestamptz` (required)
- **registration_link**: `text` (optional)
- **created_at**: `timestamptz` (default `now()`)
- **updated_at**: `timestamptz` (default `now()`)
- **is_draft**: `boolean` (optional)

**Trigger:** `events_updated_at` → calls `set_updated_at()` before every update.