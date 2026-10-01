export default function Header({ search, onSearchChange, onAddClick }) {
  return (
    <header className="top">
      <div className="brandrow">
        <div className="brand">
          <h1>Tara-Yah Keto Kitchen</h1>
          <span className="flourish"></span>
          <p>Recipe manager</p>
        </div>
        <button className="addbtn" onClick={onAddClick}>
          + Add recipe
        </button>
      </div>
      <div className="controls">
        <input
          className="search"
          type="text"
          placeholder="Search recipes or ingredients…"
          value={search}
          onChange={e => onSearchChange(e.target.value)}
        />
      </div>
    </header>
  );
}
