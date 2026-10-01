// Generative AI acknowledgement: the Express app structure in this file
// (and the wider server/ and client/ code in this project) was generated
// with assistance from Claude (Anthropic), prompted to build a React +
// Express.js recipe manager with a REST API backing recipe CRUD, for the
// Web Dev II Multi-Device Application assessment. See the Development
// Document's References section for the full citation.
const express = require('express');
const cors = require('cors');
const recipesRouter = require('./routes/recipes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/recipes', recipesRouter);

app.get('/', (req, res) => {
  res.send('Tara-Yah Keto Kitchen API is running. Try GET /api/recipes');
});

app.listen(PORT, () => {
  console.log(`Tara-Yah Keto Kitchen API listening on http://localhost:${PORT}`);
});
