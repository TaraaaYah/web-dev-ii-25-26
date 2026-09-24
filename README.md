# Tara-Yah Keto Kitchen — Recipe Manager

A multi-device recipe manager built with a React front-end and an Express.js
back-end, for the Web Dev II Multi-Device Application assessment.

## Project structure

```
tara-yah-keto-kitchen/
├── client/          React front-end (Vite)
│   └── src/
│       ├── components/   UI components (Header, CategoryChips, RecipeGrid, RecipeCard, modals)
│       ├── api.js        fetch wrapper for the recipes REST API
│       ├── App.jsx       top-level state and layout
│       └── styles.css    theme and layout styles
└── server/          Express.js back-end
    ├── data/recipes.json  recipe "database" (JSON file on disk)
    ├── routes/recipes.js  REST API route handlers
    └── server.js          Express app entry point
```

## Running the project

You need two terminals — one for the API, one for the front-end.

**1. Start the API server**
```
cd server
npm install
npm start
```
This runs on `http://localhost:4000`.

**2. Start the React app**
```
cd client
npm install
npm run dev
```
This runs on `http://localhost:5173` and proxies any `/api/...` request
through to the Express server, so the front-end always calls a relative
path (`/api/recipes`) rather than a hardcoded host.

Open `http://localhost:5173` in a browser — on a phone, use your computer's
local network IP instead of `localhost` (e.g. `http://192.168.1.x:5173`)
after running `npm run dev -- --host`.

## API

| Method | Route              | Description                    |
|--------|--------------------|---------------------------------|
| GET    | /api/recipes       | List all recipes               |
| GET    | /api/recipes/:id   | Get a single recipe            |
| POST   | /api/recipes       | Create a recipe                |
| PUT    | /api/recipes/:id   | Update a recipe                |
| DELETE | /api/recipes/:id   | Delete a recipe                |

Recipes are stored in `server/data/recipes.json`, read and written by the
route handlers in `server/routes/recipes.js`.

## Why a JSON-file store rather than a full database

For the scope of this assessment, an on-disk JSON file gives a genuine
persistence layer — separate from the route logic and reachable only
through the API — without adding a database server dependency that the
marking tutor would need to install and configure separately. It's easy to
swap for SQLite or another database later, since only `server/routes/recipes.js`
would need to change; the API contract and the React app wouldn't.
