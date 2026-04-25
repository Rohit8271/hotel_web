/**
 * FilterBar — Room filtering controls (type + price range).
 * @param {object} filters - Current filter state
 * @param {function} onChange - Called with updated filter key-value pair
 */
export default function FilterBar({ filters, onChange }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-wrap gap-4 items-center">
      <span className="text-sm font-semibold text-navy-700 flex items-center gap-2">
        <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
        </svg>
        Filters
      </span>

      {/* Room Type Filter */}
      <div className="flex-1 min-w-[140px]">
        <label htmlFor="filter-type" className="block text-xs text-gray-500 mb-1 font-medium">Room Type</label>
        <select
          id="filter-type"
          value={filters.type || ''}
          onChange={(e) => onChange('type', e.target.value)}
          className="input-field text-sm py-2"
        >
          <option value="">All Types</option>
          <option value="Standard">Standard</option>
          <option value="Deluxe">Deluxe</option>
          <option value="Premium">Premium</option>
        </select>
      </div>

      {/* Min Price Filter */}
      <div className="flex-1 min-w-[120px]">
        <label htmlFor="filter-min-price" className="block text-xs text-gray-500 mb-1 font-medium">Min Price (₹)</label>
        <input
          id="filter-min-price"
          type="number"
          min="0"
          placeholder="e.g. 1000"
          value={filters.minPrice || ''}
          onChange={(e) => onChange('minPrice', e.target.value)}
          className="input-field text-sm py-2"
        />
      </div>

      {/* Max Price Filter */}
      <div className="flex-1 min-w-[120px]">
        <label htmlFor="filter-max-price" className="block text-xs text-gray-500 mb-1 font-medium">Max Price (₹)</label>
        <input
          id="filter-max-price"
          type="number"
          min="0"
          placeholder="e.g. 5000"
          value={filters.maxPrice || ''}
          onChange={(e) => onChange('maxPrice', e.target.value)}
          className="input-field text-sm py-2"
        />
      </div>

      {/* Reset */}
      <button
        id="filter-reset-btn"
        onClick={() => { onChange('type', ''); onChange('minPrice', ''); onChange('maxPrice', ''); }}
        className="text-sm text-gray-400 hover:text-red-500 transition-colors pt-4 whitespace-nowrap"
      >
        ✕ Reset
      </button>
    </div>
  );
}
