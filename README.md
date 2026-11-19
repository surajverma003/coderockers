# CodeRokers

A full-stack developer blog built with **React**, **Tailwind CSS** and **Appwrite**. Read articles, search and filter them, write your own in a Markdown editor with live preview, and manage your account, all with a dark/light theme and a fully responsive layout.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Appwrite](https://img.shields.io/badge/Appwrite-Cloud-F02E65?logo=appwrite&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)

**[Live demo](https://YOUR-LIVE-LINK)** · **[Source code](https://github.com/YOUR-USERNAME/YOUR-REPO)**

![CodeRokers home page](docs/screenshots/home-dark.png)

## Screenshots

| Home (light) | Articles |
| :---: | :---: |
| ![Home in light mode](docs/screenshots/home-light.png) | ![Articles list with search and filters](docs/screenshots/blogs.png) |

| Article page | Editor |
| :---: | :---: |
| ![Article with table of contents](docs/screenshots/article.png) | ![Markdown editor with live preview](docs/screenshots/editor.png) |

| Profile settings | Mobile |
| :---: | :---: |
| ![Profile settings](docs/screenshots/profile.png) | ![Mobile layout](docs/screenshots/mobile.png) |

## Features

**Reading**
- Article list with search, category filter, sorting (newest, oldest, most viewed, A-Z) and pagination
- Category pages (`/category/technology`) and search from the navbar
- Article page with reading progress bar, table of contents, related posts, share buttons (WhatsApp, X, LinkedIn, copy link)
- Home page powered by real data: category counts, stats, most-read articles, latest articles, top writers

**Writing**
- Markdown editor with toolbar, keyboard shortcuts (Ctrl+B / I / K) and a live **Preview** tab
- Drafts and publishing (`is_published`), draft autosave on the device, unique slugs generated from the title
- Cover image by URL (or upload to Appwrite Storage, optional), category and tags

**Accounts**
- Email/password, Google and GitHub sign-in
- Forgot password (email link, one-time, expires in 1 hour) and change password
- Profile settings: public profile with live preview, account details, active sessions with sign-out per device

**Everything else**
- Newsletter signup and contact form, both saved to Appwrite
- Dark and light mode, skeleton loaders, custom 404 page
- Accessibility: keyboard focus styles, labelled forms, ARIA live messages, reduced-motion support

## Tech stack

| Area | Tools |
| --- | --- |
| UI | React, React Router, Tailwind CSS |
| Icons | Iconify, lucide-react |
| Backend | Appwrite (Auth, Database, optional Storage) |
| Tooling | Vite |

## Technical highlights

- **Safe Markdown rendering.** The article body is parsed into blocks and rendered as React elements. It never uses `dangerouslySetInnerHTML`, and links only allow `http(s)`, `mailto` and relative URLs, so user content cannot inject scripts.
- **URL as the source of truth.** Search, category, sort and page live in the query string (`/blogs?search=react&category=technology&page=2`), so links can be shared and the back button behaves.
- **Fewer database reads.** Posts are cached in context after the first load, and the article page reuses that cache instead of fetching again. Useful on Appwrite's free plan.
- **Spam and duplicate protection.** The newsletter form has a honeypot field, and a unique index on `email` stops duplicates. Duplicate sign-ups show the same success message, so nobody can check who is subscribed.
- **Least-privilege permissions** on the `subscribers` and `feedbacks` tables (create only, no read).
- **Careful auth flows.** The recovery link is read once and removed from the address bar. Google/GitHub users, who have no password, can set one without entering a "current password". Expired and invalid links, expired sessions and rate limits each get their own message.
- **Better editing experience.** Draft autosave, a "restored draft" banner, unsaved-changes warnings and a sticky save bar.

## Getting started

### Prerequisites
- Node.js 18 or newer
- A free [Appwrite Cloud](https://cloud.appwrite.io) project

### 1. Install

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
cd YOUR-REPO
npm install
```

### 2. Set up Appwrite

**Auth.** Enable *Email/Password*, *Google* and *GitHub* in the Auth settings. Under *Overview → Platforms*, add a Web platform for `localhost` and for your deployed domain. Without this, sign-in and password-reset emails will fail.

**Database.** Create a database, then these three tables. The **Table ID** must match the name below (you can set a custom ID when creating the table).

| Table ID | Columns |
| --- | --- |
| `blogpost` | `title` (varchar 100), `content` (text, 8000), `slug` (varchar, with an index), `views` (integer), `author` (varchar), `is_published` (boolean), `image` (varchar, URL), `category` (varchar 50, default `General`), `tags` (varchar 30, **array**) |
| `feedbacks` | `name`, `email`, `subject`, `message` (all varchar/text) |
| `subscribers` | `email` (varchar 255, required) and a **unique** index on `email` |

**Permissions** (table Settings → Permissions):

| Table | Role | Allowed |
| --- | --- | --- |
| `blogpost` | Any | Read |
| `blogpost` | All users | Create |
| `feedbacks` | Any | Create only |
| `subscribers` | Any | Create only |

> The views counter currently updates from the browser, so the demo `blogpost` table also needs **Update** for *Any*. See [Known limitations](#known-limitations-and-roadmap) for the plan to replace this.

### 3. Add your IDs

The Appwrite IDs are plain constants for now. Set your endpoint and project ID in `src/appwrite/appwrite.js`, then replace the database ID in:

- `src/context/ContextState.jsx`
- `src/components/CreateBlog.jsx`
- `src/components/ContactUs.jsx`
- `src/utils/newsletter.js`
- `src/utils/views.js`

*Optional, image upload:* export a `storage` instance from `src/appwrite/appwrite.js`, create a public-read bucket, and set `BUCKET_ID` in `CreateBlog.jsx`. Without this, the editor falls back to image URLs.

### 4. Run

```bash
npm run dev
```

Open the address printed in the terminal (the Appwrite OAuth redirects use the current origin, so any port works once it is added as a platform).

## Deployment

The app uses client-side routing, so the host must send every path to `index.html`.

- **Vercel** - add `vercel.json`:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
  ```
- **Netlify** - add `public/_redirects`:
  ```
  /*  /index.html  200
  ```

After deploying, add the live domain under Appwrite *Platforms*.

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/blogs`, `/category/:category` | Article list |
| `/view-blog/:slug` | Article |
| `/create-blog` | Editor (login required) |
| `/profile` | Profile settings |
| `/login`, `/signup` | Sign in / sign up |
| `/forgot-password`, `/change-password` | Password reset and change |
| `/newsletter`, `/about`, `/privacy`, `/terms` | Newsletter + contact, about, legal |

## Project structure

```
src/
├── appwrite/      Appwrite client setup
├── components/    Pages and layout (Home, Blogs, ViewBlog, CreateBlog, Navbar, Footer, ...)
├── context/       Global state: user, cached posts, auth helpers
├── reuse/         Shared UI (profile popup, auth layout, Markdown renderer)
└── utils/         Helpers (post normalizing, newsletter, views, password rules)
```

## Known limitations and roadmap

- **Edit and delete post** are not built yet. Only create is available. Next step: author-only update/delete using Appwrite row permissions.
- **Views counter** runs from the browser (one count per browser per 24 hours). This needs update access on the table, so the plan is to move it into an Appwrite Function.
- **Newsletter** collects emails but does not send them yet. Sending needs Appwrite Messaging or a Function.
- **Testimonials** on the home page are demo content. They are meant to be replaced by comments stored in the database.
- **Config** values (database ID, table IDs) are constants in code. Moving them to environment variables is planned.
- **Tests** are not added yet.

## What I learned

- Appwrite permissions apply to the whole row, not to single fields. That is why a safe views counter needs a Function instead of a client-side update.
- Keeping filters in the URL removed a lot of state-syncing code between the navbar, list page and category pages.
- Auth is mostly edge cases: expired links, users without passwords, rate limits and stale sessions each need their own handling.

## Author

**Suraj Verma** · [GitHub](https://github.com/YOUR-USERNAME) · [LinkedIn](https://www.linkedin.com/in/YOUR-PROFILE)

## License

MIT
