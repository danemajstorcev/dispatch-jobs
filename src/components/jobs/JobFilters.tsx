'use client';
import { useState } from 'react';
import type { JobFilters, WorkMode, ExperienceLevel } from '@/types';

interface Props {
  onFiltersChange: (filters: JobFilters) => void;
  totalJobs: number;
  filteredCount: number;
}

const WORK_MODES:   WorkMode[]        = ['Remote', 'Hybrid', 'On-site'];
const EXPERIENCE:   ExperienceLevel[] = ['Entry Level', 'Mid Level', 'Senior', 'Lead', 'Manager'];
const SALARY_TIERS = [
  { label: 'Any', value: 0 },
  { label: '$40k+', value: 40000 },
  { label: '$55k+', value: 55000 },
  { label: '$70k+', value: 70000 },
  { label: '$85k+', value: 85000 },
];

export default function JobFilters({ onFiltersChange, totalJobs, filteredCount }: Props) {
  const [filters, setFilters] = useState<JobFilters>({
    search:     '',
    workMode:   '',
    experience: '',
    salaryMin:  0,
    category:   '',
  });

  const update = (patch: Partial<JobFilters>) => {
    const next = { ...filters, ...patch };
    setFilters(next);
    onFiltersChange(next);
  };

  const hasActive = filters.search || filters.workMode || filters.experience || filters.salaryMin > 0;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

      {/* Search */}
      <div className="mb-5">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Job title, company, keyword…"
            value={filters.search}
            onChange={(e) => update({ search: e.target.value })}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Work Mode */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Work Mode</label>
        <div className="flex flex-wrap gap-2">
          {WORK_MODES.map((mode) => (
            <button
              key={mode}
              onClick={() => update({ workMode: filters.workMode === mode ? '' : mode })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                filters.workMode === mode
                  ? 'bg-brand-600 text-white border-brand-600'
                  : 'bg-white text-slate-600 border-slate-300 hover:border-brand-400 hover:text-brand-600'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Experience</label>
        <div className="flex flex-wrap gap-2">
          {EXPERIENCE.map((exp) => (
            <button
              key={exp}
              onClick={() => update({ experience: filters.experience === exp ? '' : exp })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                filters.experience === exp
                  ? 'bg-brand-600 text-white border-brand-600'
                  : 'bg-white text-slate-600 border-slate-300 hover:border-brand-400 hover:text-brand-600'
              }`}
            >
              {exp}
            </button>
          ))}
        </div>
      </div>

      {/* Salary */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Min Salary</label>
        <div className="flex flex-wrap gap-2">
          {SALARY_TIERS.map((tier) => (
            <button
              key={tier.value}
              onClick={() => update({ salaryMin: filters.salaryMin === tier.value ? 0 : tier.value })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                filters.salaryMin === tier.value && tier.value > 0
                  ? 'bg-brand-600 text-white border-brand-600'
                  : tier.value === 0 && filters.salaryMin === 0
                  ? 'bg-slate-100 text-slate-700 border-slate-300'
                  : 'bg-white text-slate-600 border-slate-300 hover:border-brand-400 hover:text-brand-600'
              }`}
            >
              {tier.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count + clear */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <span className="text-xs text-slate-500">
          <span className="font-semibold text-slate-900">{filteredCount}</span> of {totalJobs} jobs
        </span>
        {hasActive && (
          <button
            onClick={() => update({ search: '', workMode: '', experience: '', salaryMin: 0, category: '' })}
            className="text-xs font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
