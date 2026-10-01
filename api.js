// Thin wrapper around the recipes REST API served by the Express backend.
// Keeping fetch calls in one module (rather than scattered through
// components) means the components only deal with plain JS data, and the
// API base/error handling only needs to be changed in one place.

const BASE = '/api/recipes';

async function handle(res) {
  if (res.status === 204) return null;
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error((data && data.error) || `Request failed (${res.status})`);
  }
  return data;
}

export async function getRecipes() {
  const res = await fetch(BASE);
  return handle(res);
}

export async function createRecipe(recipe) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe)
  });
  return handle(res);
}

export async function updateRecipe(id, recipe) {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe)
  });
  return handle(res);
}

export async function deleteRecipe(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  return handle(res);
}
