import React from 'react';
import './CategoryFilter.css';

function CategoryFilter({ categoryFilter, setCategoryFilter }) {
  return (
    <div className="category-filter">
      <label htmlFor="category-select">カテゴリーでフィルター：</label>
      <select
        id="category-select"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <option value="">すべて</option>
        <option value="IT">IT</option>
        <option value="データ">データ</option>
        <option value="デザイン">デザイン</option>
        <option value="マーケティング">マーケティング</option>
        <option value="営業">営業</option>
      </select>
    </div>
  );
}

export default CategoryFilter;