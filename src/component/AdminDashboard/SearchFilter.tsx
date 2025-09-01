interface SearchFilterProps {
  search: string;
  setSearch: (value: string) => void;
  filter: string;
  setFilter: (value: string) => void;
}

const SearchFilter = ({
  search,
  setSearch,
  filter,
  setFilter,
}: SearchFilterProps) => {
  return (
    <div>
      <div className="bg-white flex flex-col md:flex-row justify-between items-center gap-3 p-4 rounded-2xl border border-gray-300">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name, brand, or model..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 outline-0 w-full rounded-md p-2 flex-1"
        />

        {/* Filter Dropdown */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="All">All Categories</option>
          <option value="Car">Car</option>
          <option value="2-Wheeler">2-Wheeler</option>
          <option value="Truck">Truck</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;
