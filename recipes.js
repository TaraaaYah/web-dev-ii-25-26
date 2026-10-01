// Generative AI acknowledgement: generated with assistance from Claude
// (Anthropic), prompted to build Express REST routes (GET/POST/PUT/DELETE)
// for recipes persisted to a JSON file, as the project's dynamic
// client-server feature. See the Development Document's References.
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const DATA_PATH = path.join(__dirname, '..', 'data', 'recipes.json');

// Small helpers so every route reads/writes the same JSON "database" file
// on disk. Using the filesystem as the store keeps the project dependency
// -free and easy for a tutor to run with `npm install` + `npm start`, while
// still demonstrating a real persistence layer separate from the routes.
function readRecipes() {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw);
}

function writeRecipes(recipes) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(recipes, null, 2));
}

// GET /api/recipes - list all recipes
router.get('/', (req, res) => {
  try {
    const recipes = readRecipes();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Could not read recipes.' });
  }
});

// GET /api/recipes/:id - a single recipe
router.get('/:id', (req, res) => {
  try {
    const recipes = readRecipes();
    const recipe = recipes.find(r => r.id === req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found.' });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: 'Could not read recipes.' });
  }
});

// POST /api/recipes - add a new recipe
router.post('/', (req, res) => {
  try {
    const recipes = readRecipes();
    const body = req.body || {};

    if (!body.name || !body.name.trim()) {
      return res.status(400).json({ error: 'Recipe name is required.' });
    }

    const newRecipe = {
      id: 'r' + Date.now(),
      name: body.name.trim(),
      category: body.category || 'Other',
      serves: body.serves || '',
      carbs: body.carbs || '',
      protein: body.protein || '',
      fat: body.fat || '',
      ingredients: Array.isArray(body.ingredients) ? body.ingredients : [],
      steps: Array.isArray(body.steps) ? body.steps : [],
      note: body.note || ''
    };

    recipes.unshift(newRecipe);
    writeRecipes(recipes);
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).json({ error: 'Could not save the recipe.' });
  }
});

// PUT /api/recipes/:id - edit an existing recipe
router.put('/:id', (req, res) => {
  try {
    const recipes = readRecipes();
    const index = recipes.findIndex(r => r.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Recipe not found.' });

    const body = req.body || {};
    if (!body.name || !body.name.trim()) {
      return res.status(400).json({ error: 'Recipe name is required.' });
    }

    const updated = {
      ...recipes[index],
      name: body.name.trim(),
      category: body.category || recipes[index].category,
      serves: body.serves ?? recipes[index].serves,
      carbs: body.carbs ?? recipes[index].carbs,
      protein: body.protein ?? recipes[index].protein,
      fat: body.fat ?? recipes[index].fat,
      ingredients: Array.isArray(body.ingredients) ? body.ingredients : recipes[index].ingredients,
      steps: Array.isArray(body.steps) ? body.steps : recipes[index].steps,
      note: body.note ?? recipes[index].note
    };

    recipes[index] = updated;
    writeRecipes(recipes);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Could not update the recipe.' });
  }
});

// DELETE /api/recipes/:id
router.delete('/:id', (req, res) => {
  try {
    const recipes = readRecipes();
    const exists = recipes.some(r => r.id === req.params.id);
    if (!exists) return res.status(404).json({ error: 'Recipe not found.' });

    const filtered = recipes.filter(r => r.id !== req.params.id);
    writeRecipes(filtered);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Could not delete the recipe.' });
  }
});

module.exports = router;
