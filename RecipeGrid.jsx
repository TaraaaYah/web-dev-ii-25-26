import RecipeCard from './RecipeCard.jsx';

export default function RecipeGrid({ recipes, loading, onCardClick }) {
  if (loading) {
    return <div className="empty"><p>Loading recipes…</p></div>;
  }

  if (recipes.length === 0) {
    return (
      <div className="empty">
        <h2>No recipes here yet</h2>
        <p>Add your first recipe, or try a different search or category.</p>
      </div>
    );
  }

  return (
    <div className="grid">
      {recipes.map(r => (
        <RecipeCard key={r.id} recipe={r} onClick={onCardClick} />
      ))}
    </div>
  );
}
