import { Filter, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

type Filters = {
  sponsors: string[];
  difficulty: string[];
  techRequirements: string[];
};

type FilterBarProps = {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  sponsors: string[];
};

export function FilterBar({ filters, onFiltersChange, sponsors }: FilterBarProps) {
  const toggleFilter = (category: keyof Filters, value: string) => {
    const currentValues = filters[category];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    onFiltersChange({ ...filters, [category]: newValues });
  };

  const clearAllFilters = () => {
    onFiltersChange({ sponsors: [], difficulty: [], techRequirements: [] });
  };

  const activeFilterCount =
    filters.sponsors.length + filters.difficulty.length + filters.techRequirements.length;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2 text-gray-400">
        <Filter className="w-4 h-4" />
        <span className="text-sm">Filter by:</span>
      </div>

      {/* Sponsors Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="gap-2 bg-[#16161d] border-[#2a2a3a] text-white hover:bg-[#1e1e2e] hover:border-[#00ffcc]/50"
          >
            Sponsors
            {filters.sponsors.length > 0 && (
              <Badge className="ml-1 px-1.5 py-0.5 text-xs bg-[#00ffcc] text-[#0a0a0f]">
                {filters.sponsors.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 bg-[#16161d] border-[#2a2a3a]">
          <DropdownMenuLabel className="text-white">Filter by Sponsor</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-[#2a2a3a]" />
          {sponsors.map((sponsor) => (
            <DropdownMenuCheckboxItem
              key={sponsor}
              checked={filters.sponsors.includes(sponsor)}
              onCheckedChange={() => toggleFilter('sponsors', sponsor)}
              className="text-gray-300 focus:bg-[#1e1e2e] focus:text-white"
            >
              {sponsor}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Difficulty Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="gap-2 bg-[#16161d] border-[#2a2a3a] text-white hover:bg-[#1e1e2e] hover:border-[#00ffcc]/50"
          >
            Difficulty
            {filters.difficulty.length > 0 && (
              <Badge className="ml-1 px-1.5 py-0.5 text-xs bg-[#00ffcc] text-[#0a0a0f]">
                {filters.difficulty.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 bg-[#16161d] border-[#2a2a3a]">
          <DropdownMenuLabel className="text-white">Filter by Difficulty</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-[#2a2a3a]" />
          {[
            { value: 'beginner', label: '🟢 Easy' },
            { value: 'intermediate', label: '🟡 Medium' },
            { value: 'advanced', label: '🔴 Hard' },
          ].map((level) => (
            <DropdownMenuCheckboxItem
              key={level.value}
              checked={filters.difficulty.includes(level.value)}
              onCheckedChange={() => toggleFilter('difficulty', level.value)}
              className="text-gray-300 focus:bg-[#1e1e2e] focus:text-white"
            >
              {level.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Tech Requirements Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="gap-2 bg-[#16161d] border-[#2a2a3a] text-white hover:bg-[#1e1e2e] hover:border-[#00ffcc]/50"
          >
            Tech Level
            {filters.techRequirements.length > 0 && (
              <Badge className="ml-1 px-1.5 py-0.5 text-xs bg-[#00ffcc] text-[#0a0a0f]">
                {filters.techRequirements.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 bg-[#16161d] border-[#2a2a3a]">
          <DropdownMenuLabel className="text-white">Filter by Tech Requirements</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-[#2a2a3a]" />
          {[
            { value: 'low-code', label: 'Low-Code' },
            { value: 'moderate', label: 'Moderate' },
            { value: 'highly-technical', label: 'Highly Technical' },
          ].map((level) => (
            <DropdownMenuCheckboxItem
              key={level.value}
              checked={filters.techRequirements.includes(level.value)}
              onCheckedChange={() => toggleFilter('techRequirements', level.value)}
              className="text-gray-300 focus:bg-[#1e1e2e] focus:text-white"
            >
              {level.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <Button
          variant="ghost"
          onClick={clearAllFilters}
          className="gap-2 text-gray-400 hover:text-[#00ffcc] hover:bg-[#16161d]"
        >
          <X className="w-4 h-4" />
          Clear all
        </Button>
      )}
    </div>
  );
}
