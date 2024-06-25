import React, { useState } from 'react';

function AdvancedSearch({ onSearch }) {
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    category: '',
    minSalary: '',
    maxSalary: '',
    jobType: '',
    experienceLevel: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <div className="advanced-search">
      <h2>高度な検索</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="keyword"
          value={filters.keyword}
          onChange={handleChange}
          placeholder="キーワード"
        />
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleChange}
          placeholder="勤務地"
        />
        <select name="category" value={filters.category} onChange={handleChange}>
          <option value="">カテゴリーを選択</option>
          <option value="IT">IT</option>
          <option value="データ">データ</option>
          <option value="デザイン">デザイン</option>
          <option value="マーケティング">マーケティング</option>
        </select>
        <input
          type="number"
          name="minSalary"
          value={filters.minSalary}
          onChange={handleChange}
          placeholder="最低給与"
        />
        <input
          type="number"
          name="maxSalary"
          value={filters.maxSalary}
          onChange={handleChange}
          placeholder="最高給与"
        />
        <select name="jobType" value={filters.jobType} onChange={handleChange}>
          <option value="">雇用形態を選択</option>
          <option value="フルタイム">フルタイム</option>
          <option value="パートタイム">パートタイム</option>
          <option value="契約">契約</option>
          <option value="インターン">インターン</option>
        </select>
        <select name="experienceLevel" value={filters.experienceLevel} onChange={handleChange}>
          <option value="">経験レベルを選択</option>
          <option value="エントリー">エントリー</option>
          <option value="中級">中級</option>
          <option value="シニア">シニア</option>
        </select>
        <button type="submit">検索</button>
      </form>
    </div>
  );
}

export default AdvancedSearch;