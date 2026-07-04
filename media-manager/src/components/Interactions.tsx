function DeleteButton({disabled}) {
  return (
    <button className="delete-button" disabled={disabled}>
        <img src="/src/assets/icons8-trash-can-50-white.png" alt="Delete icon" />
    </button>
  );
}

function ToggleSwitch( { category, onCategoryFilterChange } ) {
  return (
    <div className="toggle-switch">
    <div>MOVIES</div>
    <label className="switch">
      <input 
        type="checkbox" 
        onChange={(e) => onCategoryFilterChange(e.target.checked ? "TV" : "MOVIE")}
      />
      <span className="slider round"></span>
    </label>
    <div>TV</div>
    </div>
  )
}

function SortSelector({ availableOptions, sortOption, onSortOptionChange }) {
  return (
    <div className="sort-selector">
        {availableOptions.map(option => (
            <RadioButton 
                key={option.value}
                id={option.value}
                name="sort"
                value={option.value}
                label={option.label}
                checked={sortOption === option.value}
                onChange={() => onSortOptionChange(option.value)}
            />
        ))}
    </div>
  );
}

function RadioButton({ id, name, value, label, checked, onChange }) {
  return (
    <div className="radio-button">
      <input 
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export { DeleteButton, ToggleSwitch, SortSelector };