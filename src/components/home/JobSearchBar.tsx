import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

const locations = [
  'All Locations',
  'Sydney',
  'Melbourne',
  'Brisbane',
  'Perth',
  'Adelaide',
  'Hobart',
  'Darwin',
  'Canberra',
];

export function JobSearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('All Locations');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Search:', { searchTerm, location });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      {/* Desktop Layout */}
      <div className="hidden sm:flex bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Job Search Input */}
        <div className="flex-1 flex items-center px-4 border-r border-gray-200">
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by job title or keyword"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-4 text-gray-700 placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* Location Dropdown */}
        <div className="flex items-center px-4">
          <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="px-3 py-4 text-gray-700 bg-transparent focus:outline-none cursor-pointer appearance-none pr-8"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
            }}
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-8 py-4 bg-orange text-white font-semibold hover:bg-orange/90 transition-colors"
        >
          Let's Go
        </button>
      </div>

      {/* Mobile Layout */}
      <div className="sm:hidden space-y-3">
        {/* Job Search Input */}
        <div className="flex items-center bg-white rounded-lg shadow px-4">
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by job title or keyword"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-4 text-gray-700 placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* Location Dropdown */}
        <div className="flex items-center bg-white rounded-lg shadow px-4">
          <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-4 text-gray-700 bg-transparent focus:outline-none cursor-pointer"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-8 py-4 bg-orange text-white font-semibold rounded-lg hover:bg-orange/90 transition-colors"
        >
          Let's Go
        </button>
      </div>
    </form>
  );
}
