import { useState } from 'react'
import { MediaCard } from './components/MediaCard'
import { SortSelector, ToggleSwitch } from './components/Interactions'
import './App.css'


function FilterBar({ showNotDeletable, onDeleteFilterToggle, categoryFilter, onCategoryFilterChange, sortOption, onSortOptionChange }) {
  return (
    <div className="filter-bar">
    <div>
      <input 
        type="checkbox" 
        id="show-not-deletable" 
        checked={showNotDeletable}
        onChange={(e) => onDeleteFilterToggle(e.target.checked)}
      />
      <label htmlFor="show-not-deletable">Show not deletable</label>
    </div>
    <div>
      <SortSelector availableOptions={SORT_OPTIONS} sortOption={sortOption} onSortOptionChange={onSortOptionChange} />
    </div>
    <div>
      <ToggleSwitch category={categoryFilter} onCategoryFilterChange={onCategoryFilterChange} />
    </div>
    </div>  );
}

function MediaTable({ media, showNotDeletable, categoryFilter, sortOption }) {
  if (!showNotDeletable) {
    media = media.filter(item => item.isDeletable);
  } else {
    media = media.sort((a, b) => a.isDeletable === b.isDeletable ? 0 : a.isDeletable ? -1 : 1);
  }

  media = media.filter(item => item.category === categoryFilter);

  if (sortOption === "age") {
    media = media.sort((a, b) => b.age - a.age);
  } else if (sortOption === "size") {
    media = media.sort((a, b) => b.size - a.size);
  }

  return (
    <div className="media-table">
      {media.map((item, index) => (
        <MediaCard key={index} mediaItem={item} />
      ))}
    </div>
  );
}



function FilterableMediaList({ media }) {
  const [showNotDeletable, setShowNotDeletable] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("MOVIE");
  const [sortOption, setSortOption] = useState("size");

  return (
    <div>
      <FilterBar 
        showNotDeletable={showNotDeletable}
        onDeleteFilterToggle={setShowNotDeletable}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        sortOption={sortOption}
        onSortOptionChange={setSortOption}
      />
      <MediaTable 
        media={media}
        showNotDeletable={showNotDeletable} 
        categoryFilter={categoryFilter}
        sortOption={sortOption}
      />
    </div>
  );
}

const SORT_OPTIONS = [
  { value: "size", label: "Size" },
  { value: "age", label: "Age" },
];

const MEDIA = [
  {category: "MOVIE", name: "The Matrix", year: 1999, size: 15000, isDeletable: true, age: 125},
  {category: "MOVIE", name: "Inception", year: 2010, size: 14000, isDeletable: true, age: 14},
  {category: "MOVIE", name: "The Dark Knight", year: 2008, size: 16000, isDeletable: true, age: 16},
  {category: "MOVIE", name: "Interstellar", year: 2014, size: 17000, isDeletable: false, reason: "Saved by macron", age: 8},
  {category: "MOVIE", name: "The Lord of the Rings: The Fellowship of the Ring", year: 2001, size: 18000, isDeletable: true, age: 22},
  {category: "TV", name: "Breaking Bad", year: 2008, size: 12000, isDeletable: false, reason: "Saved by CaptainLag", age: 16},
  {category: "TV", name: "Game of Thrones", year: 2011, size: 15000, isDeletable: false, reason: "Saved by CaptainLag", age: 13},
  {category: "TV", name: "Stranger Things", year: 2016, size: 13000, isDeletable: false, reason: "Saved by tocoron", age: 8},
  {category: "TV", name: "The Mandalorian", year: 2019, size: 14000, isDeletable: true, age: 5},
  {category: "TV", name: "The Witcher", year: 2019, size: 16000, isDeletable: true, age: 5}
]


export default function App() {
  return <FilterableMediaList media={MEDIA} />
}
