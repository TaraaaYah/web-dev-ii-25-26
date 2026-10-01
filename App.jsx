// Generative AI acknowledgement: this file and the components/api module
// it composes were generated with assistance from Claude (Anthropic),
// prompted to build the top-level React state and layout for a recipe
// manager fetching/writing data through the Express API. See the
// Development Document's References section for the full citation.
import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import CategoryChips from './components/CategoryChips.jsx';
import RecipeGrid from './components/RecipeGrid.jsx';
import RecipeDetailModal from './components/RecipeDetailModal.jsx';
import RecipeFormModal from './components/RecipeFormModal.jsx';
import { getRecipes, createRecipe, updateRecipe, deleteRecipe } from './api.js';

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const [detailId, setDetailId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Load recipes from the Express API on first render. Because the data
  // lives on the server rather than in each browser's local storage, the
  // same list shows up whether this is opened on a phone or a laptop.
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getRecipes()
      .then(data => { if (!cancelled) setRecipes(data); })
      .catch(err => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const visibleRecipes = useMemo(() => {
    return recipes.filter(r => {
      const inCategory = activeCategory === 'All' || r.category === activeCategory;
      if (!inCategory) return false;
      if (!search.trim()) return true;
      const haystack = (r.name + ' ' + (r.ingredients || []).join(' ')).toLowerCase();
      return haystack.includes(search.trim().toLowerCase());
    });
  }, [recipes, activeCategory, search]);

  const detailRecipe = recipes.find(r => r.id === detailId) || null;
  const editingRecipe = recipes.find(r => r.id === editingId) || null;

  function openAdd() {
    setEditingId(null);
    setFormOpen(true);
  }

  function openEdit(id) {
    setDetailId(null);
    setEditingId(id);
    setFormOpen(true);
  }

  async function handleFormSubmit(payload, id) {
    try {
      if (id) {
        const updated = await updateRecipe(id, payload);
        setRecipes(prev => prev.map(r => (r.id === id ? updated : r)));
      } else {
        const created = await createRecipe(payload);
        setRecipes(prev => [created, ...prev]);
      }
      setFormOpen(false);
      setEditingId(null);
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this recipe?')) return;
    try {
      await deleteRecipe(id);
      setRecipes(prev => prev.filter(r => r.id !== id));
      setDetailId(null);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <>
      <Header search={search} onSearchChange={setSearch} onAddClick={openAdd} />

      <main>
        <CategoryChips active={activeCategory} onChange={setActiveCategory} />

        {error && (
          <div className="empty">
            <h2>Couldn't load recipes</h2>
            <p>{error} — is the Express server running on port 4000?</p>
          </div>
        )}

        {!error && (
          <RecipeGrid
            recipes={visibleRecipes}
            loading={loading}
            onCardClick={setDetailId}
          />
        )}
      </main>

      <RecipeDetailModal
        recipe={detailRecipe}
        onClose={() => setDetailId(null)}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      <RecipeFormModal
        open={formOpen}
        editingRecipe={editingRecipe}
        onClose={() => { setFormOpen(false); setEditingId(null); }}
        onSubmit={handleFormSubmit}
      />
    </>
  );
}
