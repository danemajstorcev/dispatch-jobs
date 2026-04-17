'use client';
import { useState } from 'react';
import type { Job, JobFilters } from '@/types';
import JobCard from './JobCard';
import JobFiltersPanel from './JobFilters';

interface Props { jobs: Job[] }

export default function JobList({ jobs }: Props) {
  const [filters, setFilters] = useState<JobFilters>({
    search: '', workMode: '', experience: '', salaryMin: 0, category: '',
  });

  const filtered = jobs.filter((job) => {
    const q = filters.search.toLowerCase();
    if (q && !job.title.toLowerCase().includes(q) &&
              !job.company.toLowerCase().includes(q) &&
              !job.tags.some((t) => t.toLowerCase().includes(q)) &&
              !job.category.toLowerCase().includes(q)) return false;
    if (filters.workMode   && job.workMode   !== filters.workMode)   return false;
    if (filters.experience && job.experience !== filters.experience) return false;
    if (filters.salaryMin  && job.salaryMax  < filters.salaryMin)    return false;
    if (filters.category   && job.category   !== filters.category)   return false;
    return true;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 xl:gap-8">

      <aside className="lg:sticky lg:top-20 lg:self-start">
        <JobFiltersPanel
          onFiltersChange={setFilters}
          totalJobs={jobs.length}
          filteredCount={filtered.length}
        />
      </aside>

      <div>
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-display font-semibold text-slate-900 text-lg mb-2">No jobs match your filters</h3>
            <p className="text-slate-500 text-sm">Try adjusting your search or clearing some filters.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
