# NoteLink – Shareable Notes App

A simple note-taking web app with shareable links and authentication.

## Features

* Register & login
* Create notes
* View your notes
* Open a single note
* Share notes via public link
* Update notes
* Delete notes
* Share notes via public link
* Relative "last updated" timestamps
* Sidebar dropdown actions (share/delete)
* Loading screen & overlay loader

## Tech Stack

* MongoDB
* Express
* React
* Node.js

## Recent Improvements

* Full note update flow (backend → API → store → UI)
* Improved note ordering logic
* Centralized error handling in Dashboard
* Server wake/retry logic on app init
* Cross-site auth fix (SameSite cookies)
* Netlify routing fix for SPA
* Relative time display for notes (min/hr/day/month/year)

## How it works

1. Create an account
2. Create a note
3. Copy the share link
4. Open it anywhere (no login required)

## Run locally

### Server

```bash id="s1"
cd server
npm install
npm run dev
```

### Client

```bash id="s2"
cd client
npm install
npm run dev
```

---
