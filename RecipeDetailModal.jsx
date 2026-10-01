export default function RecipeDetailModal({ recipe, onClose, onEdit, onDelete }) {
  if (!recipe) return null;

  return (
    <div className="overlay show" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal detail">
        <button className="closeX" onClick={onClose}>&times;</button>
        <span className="tag">{recipe.category}</span>
        <h2>{recipe.name}</h2>
        <div className="macros">
          {recipe.serves && <span>Serves {recipe.serves}</span>}
          {recipe.carbs && <span><b>{recipe.carbs}</b> net carbs</span>}
          {recipe.protein && <span><b>{recipe.protein}</b> protein</span>}
          {recipe.fat && <span><b>{recipe.fat}</b> fat</span>}
        </div>

        <h4>Ingredients</h4>
        <ul>
          {(recipe.ingredients || []).map((ing, i) => <li key={i}>{ing}</li>)}
        </ul>

        <h4>Steps</h4>
        <ol>
          {(recipe.steps || []).map((step, i) => <li key={i}>{step}</li>)}
        </ol>

        {recipe.note && <div className="note">{recipe.note}</div>}

        <div className="detailbtns">
          <button className="btn" onClick={() => onEdit(recipe.id)}>Edit</button>
          <button className="btn danger" onClick={() => onDelete(recipe.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}
