type DeleteButtonProps = {
  disabled: boolean;
};

type ToggleSwitchProps = {
  onCategoryFilterChange: (category: string) => void;
};

type SortSelectorProps = {
  availableOptions: { value: string; label: string }[];
  sortOption: string;
  onSortOptionChange: (option: string) => void;
};

type RadioButtonProps = {
  id: string;
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: () => void;
};

type MediaControlsProps = {
  deleteDisabled: boolean;
};

function MediaControls({ deleteDisabled }: MediaControlsProps) {
  return (
    <div className="media-controls">
      <SaveButton />
      <DeleteButton disabled={deleteDisabled} />
    </div>
  );
}

function SaveButton() {
  return (
    <button className="save-button">
      <img src="/src/assets/icons8-save-50-white.png" alt="Save icon" />
    </button>
  );
}

function DeleteButton({ disabled }: DeleteButtonProps) {
  return (
    <button className="delete-button" disabled={disabled}>
        <img src="/src/assets/icons8-trash-can-50-white.png" alt="Delete icon" />
    </button>
  );
}

function ToggleSwitch( { onCategoryFilterChange }: ToggleSwitchProps) {
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

function SortSelector({ availableOptions, sortOption, onSortOptionChange }: SortSelectorProps) {
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

function RadioButton({ id, name, value, label, checked, onChange }: RadioButtonProps) {
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

export { MediaControls, ToggleSwitch, SortSelector };