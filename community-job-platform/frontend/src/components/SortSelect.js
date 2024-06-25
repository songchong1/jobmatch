import React from 'react';
import './SortSelect.css';

function SortSelect({ sortCriteria, setSortCriteria }) {
  return (
    <div className="sort-select">
      <label htmlFor="sort">並び替え: </label>
      <select
        id="sort"
        value={sortCriteria}
        onChange={(e) => setSortCriteria(e.target.value)}
      >
        <option value="date">日付 (新しい順)</option>
        <option value="title">職種 (A-Z)</option>
        <option value="company">会社名 (A-Z)</option>
      </select>
    </div>
  );
}
export default SortSelect;