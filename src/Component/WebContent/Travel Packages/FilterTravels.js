import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom UI Components
const Button = ({ 
  children, 
  variant = 'default', 
  className = '', 
  onClick, 
  ...props 
}) => {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors flex items-center justify-center gap-2';
  const variantClasses = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm',
    ghost: 'text-gray-700 hover:bg-gray-100',
  };
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ 
  className = '', 
  placeholder, 
  value, 
  onChange, 
  type = 'text',
  ...props 
}) => {
  return (
    <input
      type={type}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

const Select = ({ 
  value, 
  onValueChange, 
  children, 
  placeholder,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const selectedChild = children.find(child => child.props.value === value);
  const displayValue = selectedChild ? selectedChild.props.children : placeholder;
  
  return (
    <div className={`relative ${className}`} ref={selectRef}>
      <div 
        className="w-full px-3 py-2.5 border border-gray-300 rounded-md flex items-center justify-between cursor-pointer bg-white hover:border-gray-400 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={!value ? 'text-gray-500' : ''}>
          {displayValue}
        </span>
        <svg 
          className={`w-4 h-4 transition-transform text-gray-500 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {children}
        </div>
      )}
    </div>
  );
};

const SelectItem = ({ 
  value, 
  children, 
  onSelect 
}) => {
  return (
    <div
      className="px-3 py-2.5 cursor-pointer hover:bg-blue-50 transition-colors"
      onClick={() => onSelect(value)}
    >
      {children}
    </div>
  );
};

const SelectContent = ({ children }) => {
  return <>{children}</>;
};

const SelectTrigger = ({ children, className = '' }) => {
  return (
    <div className={`cursor-pointer ${className}`}>
      {children}
    </div>
  );
};

const SelectValue = ({ placeholder }) => {
  return <span className="text-gray-500">{placeholder}</span>;
};

// Helper functions
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const homestayTypes = ['Apartment', 'House', 'Cabin', 'Villa', 'Condo', 'Studio', 'Loft', 'Townhouse'];

const defaultFilters = {
  q: '',
  type: '',
  minPrice: '',
  maxPrice: '',
  guests: '',
  amenities: '',
  destinations: '',
  destinationSlug: '',
  withinKm: '',
  from: '',
  to: '',
  published: 'yes',
  status: '',
};

// Main Filter Component
export default function FilterComponent({ filters, setFilters, sortBy, setSortBy }) {
  const [showFilters, setShowFilters] = useState(false);

  const debouncedSearch = useMemo(() => debounce((searchTerm) => {
    setFilters(prev => ({ ...prev, q: searchTerm }));
  }, 300), [setFilters]);

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  const activeFiltersCount = Object.values(filters).filter(value => value && value !== 'all').length;

  // Icons using Lucide React (if available) or fallback SVGs
  const SearchIcon = () => (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );

  const FilterIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
    </svg>
  );

  return (
    <div className="bg-gray-200 rounded-lg shadow-sm border border-gray-400 p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <SearchIcon />
          </div>
          <Input
            placeholder="Search stays, locations..."
            className="pl-10"
            onChange={(e) => debouncedSearch(e.target.value)}
            defaultValue={filters.q}
          />
        </div>

        {/* Filter & Sort */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-white"
          >
            <FilterIcon />
            Filters
            {activeFiltersCount > 0 && (
              <span className="bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </Button>

          <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
            <SelectTrigger className="w-[140px] border border-gray-300 rounded-md px-3 py-2 bg-white hover:border-gray-400">
              {sortBy === 'newest' && 'Newest'}
              {sortBy === 'price-asc' && 'Price: Low to High'}
              {sortBy === 'price-desc' && 'Price: High to Low'}
              {!sortBy && <SelectValue placeholder="Sort by" />}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest" onSelect={setSortBy}>Newest</SelectItem>
              <SelectItem value="price-asc" onSelect={setSortBy}>Price: Low to High</SelectItem>
              <SelectItem value="price-desc" onSelect={setSortBy}>Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-200 pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden"
          >
            <Select 
              value={filters.type} 
              onValueChange={(value) => setFilters(prev => ({ ...prev, type: value === 'all' ? '' : value }))}
              className='bg-white'
              placeholder="Property Type"
            >
              <SelectTrigger className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white hover:border-gray-400">
                {filters.type ? filters.type : <SelectValue placeholder="Property Type" />}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" onSelect={(value) => setFilters(prev => ({ ...prev, type: value === 'all' ? '' : value }))}>
                  All Types
                </SelectItem>
                {homestayTypes.map(type => (
                  <SelectItem 
                    key={type} 
                    value={type} 
                    onSelect={(value) => setFilters(prev => ({ ...prev, type: value }))}
                  >
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Input
                placeholder="Min Price"
                type="number"
                value={filters.minPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                className="text-sm"
              />
              <Input
                placeholder="Max Price"
                type="number"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                className="text-sm"
              />
            </div>

            <Input
              placeholder="Guests"
              type="number"
              value={filters.guests}
              onChange={(e) => setFilters(prev => ({ ...prev, guests: e.target.value }))}
              className="text-sm"
            />

            <Input
              placeholder="Amenities (comma-separated)"
              value={filters.amenities}
              onChange={(e) => setFilters(prev => ({ ...prev, amenities: e.target.value }))}
              className="text-sm"
            />

            <div className="flex gap-2">
              <Input
                placeholder="Check-in"
                type="date"
                value={filters.from}
                onChange={(e) => setFilters(prev => ({ ...prev, from: e.target.value }))}
                className="text-sm"
              />
              <Input
                placeholder="Check-out"
                type="date"
                value={filters.to}
                onChange={(e) => setFilters(prev => ({ ...prev, to: e.target.value }))}
                className="text-sm"
              />
            </div>

            <Input
              placeholder="Destinations (comma-separated)"
              value={filters.destinations}
              onChange={(e) => setFilters(prev => ({ ...prev, destinations: e.target.value }))}
              className="text-sm"
            />

            <Select 
              value={filters.published} 
              onValueChange={(value) => setFilters(prev => ({ ...prev, published: value }))}
              placeholder="Published"
            >
              <SelectTrigger className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white hover:border-gray-400">
                {filters.published === 'all' && 'Any'}
                {filters.published === 'yes' && 'Published'}
                {filters.published === 'no' && 'Unpublished'}
                {!filters.published && <SelectValue placeholder="Published" />}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" onSelect={(value) => setFilters(prev => ({ ...prev, published: value }))}>
                  Any
                </SelectItem>
                <SelectItem value="yes" onSelect={(value) => setFilters(prev => ({ ...prev, published: value }))}>
                  Published
                </SelectItem>
                <SelectItem value="no" onSelect={(value) => setFilters(prev => ({ ...prev, published: value }))}>
                  Unpublished
                </SelectItem>
              </SelectContent>
            </Select>

            <div className="flex justify-end md:col-span-2 lg:col-span-4">
              <Button variant="outline" onClick={clearFilters} className="px-3 py-1.5 text-sm">
                Clear All Filters
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}