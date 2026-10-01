const CATEGORIES = ['All', 'Egg', 'Shake', 'Soup', 'Keema', 'Fish', 'Grill', 'Desserts', 'Wrap', 'Other'];

export default function CategoryChips({ active, onChange }) {
  return (
    <div className="chips">
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          type="button"
          className={`chip${cat === active ? ' active' : ''}`}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export { CATEGORIES };
