export default function RecipeCard({ recipe, onClick }) {
  return (
    <button type="button" className="rcard" onClick={() => onClick(recipe.id)}>
      <span className="tag">{recipe.category}</span>
      <h3>{recipe.name}</h3>
      <div className="macros">
        {recipe.carbs && (
          <span>
            <b style={{ color: 'var(--gold)' }}>{recipe.carbs}</b> carbs
          </span>
        )}
        {recipe.protein && (
          <span>
            <b style={{ color: 'var(--gold)' }}>{recipe.protein}</b> protein
          </span>
        )}
        {recipe.fat && (
          <span>
            <b style={{ color: 'var(--gold)' }}>{recipe.fat}</b> fat
          </span>
        )}
      </div>
    </button>
  );
}
