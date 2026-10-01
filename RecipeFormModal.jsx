import { useEffect, useState } from 'react';
import { CATEGORIES } from './CategoryChips.jsx';

const EMPTY = {
  name: '',
  category: 'Egg',
  serves: '',
  carbs: '',
  protein: '',
  fat: '',
  ingredients: [''],
  steps: [''],
  note: ''
};

// Categories minus "All", since a recipe can't belong to "All" itself.
const CATEGORY_OPTIONS = CATEGORIES.filter(c => c !== 'All');

export default function RecipeFormModal({ open, editingRecipe, onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY);

  // Reset the form whenever the modal opens, either blank (add) or
  // pre-filled with the recipe being edited.
  useEffect(() => {
    if (!open) return;
    if (editingRecipe) {
      setForm({
        name: editingRecipe.name || '',
        category: editingRecipe.category || 'Other',
        serves: editingRecipe.serves || '',
        carbs: editingRecipe.carbs || '',
        protein: editingRecipe.protein || '',
        fat: editingRecipe.fat || '',
        ingredients: editingRecipe.ingredients?.length ? editingRecipe.ingredients : [''],
        steps: editingRecipe.steps?.length ? editingRecipe.steps : [''],
        note: editingRecipe.note || ''
      });
    } else {
      setForm(EMPTY);
    }
  }, [open, editingRecipe]);

  if (!open) return null;

  function setField(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function setListItem(field, index, value) {
    setForm(prev => {
      const list = [...prev[field]];
      list[index] = value;
      return { ...prev, [field]: list };
    });
  }

  function addListItem(field) {
    setForm(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  }

  function removeListItem(field, index) {
    setForm(prev => {
      const list = prev[field].filter((_, i) => i !== index);
      return { ...prev, [field]: list.length ? list : [''] };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      ingredients: form.ingredients.map(s => s.trim()).filter(Boolean),
      steps: form.steps.map(s => s.trim()).filter(Boolean)
    };
    onSubmit(payload, editingRecipe ? editingRecipe.id : null);
  }

  return (
    <div className="overlay show" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button type="button" className="closeX" onClick={onClose}>&times;</button>
        <h2>{editingRecipe ? 'Edit recipe' : 'Add recipe'}</h2>
        <p className="sub">Cups &amp; tablespoons as usual — leave a field blank if it doesn't apply.</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="f-name">Recipe name</label>
            <input
              id="f-name"
              type="text"
              required
              value={form.name}
              onChange={e => setField('name', e.target.value)}
            />
          </div>

          <div className="row2">
            <div className="field">
              <label htmlFor="f-category">Category</label>
              <select
                id="f-category"
                value={form.category}
                onChange={e => setField('category', e.target.value)}
              >
                {CATEGORY_OPTIONS.map(cat => <option key={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="f-serves">Serves</label>
              <input
                id="f-serves"
                type="text"
                placeholder="e.g. 2"
                value={form.serves}
                onChange={e => setField('serves', e.target.value)}
              />
            </div>
          </div>

          <div className="row3">
            <div className="field">
              <label htmlFor="f-carbs">Net carbs</label>
              <input
                id="f-carbs"
                type="text"
                placeholder="e.g. 4g"
                value={form.carbs}
                onChange={e => setField('carbs', e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="f-protein">Protein</label>
              <input
                id="f-protein"
                type="text"
                placeholder="e.g. 38g"
                value={form.protein}
                onChange={e => setField('protein', e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="f-fat">Fat</label>
              <input
                id="f-fat"
                type="text"
                placeholder="e.g. 30g"
                value={form.fat}
                onChange={e => setField('fat', e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label>Ingredients</label>
            <div className="listedit">
              {form.ingredients.map((val, i) => (
                <div className="item" key={i}>
                  <input
                    type="text"
                    value={val}
                    placeholder="e.g. 1 cup beef broth"
                    onChange={e => setListItem('ingredients', i, e.target.value)}
                  />
                  <button type="button" className="rmv" onClick={() => removeListItem('ingredients', i)}>&times;</button>
                </div>
              ))}
            </div>
            <button type="button" className="addline" onClick={() => addListItem('ingredients')}>
              + add ingredient
            </button>
          </div>

          <div className="field">
            <label>Steps</label>
            <div className="listedit">
              {form.steps.map((val, i) => (
                <div className="item" key={i}>
                  <input
                    type="text"
                    value={val}
                    placeholder="e.g. Brown the beef"
                    onChange={e => setListItem('steps', i, e.target.value)}
                  />
                  <button type="button" className="rmv" onClick={() => removeListItem('steps', i)}>&times;</button>
                </div>
              ))}
            </div>
            <button type="button" className="addline" onClick={() => addListItem('steps')}>
              + add step
            </button>
          </div>

          <div className="field">
            <label htmlFor="f-note">Note (optional)</label>
            <textarea
              id="f-note"
              rows={2}
              placeholder="e.g. collagen/wellness note"
              value={form.note}
              onChange={e => setField('note', e.target.value)}
            />
          </div>

          <div className="modalbtns">
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn primary">Save recipe</button>
          </div>
        </form>
      </div>
    </div>
  );
}
