import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JobList from '@/components/jobs/JobList';
import { jobs, categories } from '@/data/jobs';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'DispatchBoard — Logistics & Dispatcher Jobs',
  description: 'Browse dispatcher, freight broker, and logistics coordinator jobs. Remote, hybrid, and on-site positions. Updated daily.',
};

const STATS = [
  { value: '340+', label: 'Active Jobs'     },
  { value: '180+', label: 'Companies Hiring'},
  { value: '60%',  label: 'Remote Roles'    },
  { value: '48h',  label: 'Avg. Response'   },
];

const CATEGORY_ICONS: Record<string, string> = {
  Dispatching:  '📡',
  Coordination: '📋',
  Planning:     '🗺️',
  Brokerage:    '🤝',
  Management:   '👔',
  Training:     '🎓',
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>

        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
              <span className="text-brand-300 text-xs font-semibold tracking-wide uppercase">
                {jobs.length} jobs live right now
              </span>
            </div>

            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight mb-5">
              Find Your Next
              <span className="text-brand-400 block sm:inline"> Dispatcher Job</span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-10">
              The only job board built for freight dispatchers, logistics coordinators, and supply chain professionals. Remote, hybrid, and on-site roles — all in one place.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display font-bold text-2xl sm:text-3xl text-white">{s.value}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="categories" className="bg-slate-50 border-b border-slate-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap flex-shrink-0">
                Browse by:
              </span>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/?category=${cat}`}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:border-brand-400 hover:text-brand-600 transition-all whitespace-nowrap flex-shrink-0 shadow-sm"
                >
                  <span>{CATEGORY_ICONS[cat] ?? '📦'}</span>
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-10 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900">
                All Jobs
              </h2>
              <span className="text-sm text-slate-500">{jobs.length} positions</span>
            </div>
            <JobList jobs={jobs} />
          </div>
        </section>

        <section className="bg-brand-600 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">
              Hiring dispatchers or logistics talent?
            </h2>
            <p className="text-brand-100 mb-6 text-sm sm:text-base">
              Post your job and reach thousands of qualified logistics professionals.
            </p>
            <Link
              href="/auth/signin"
              className="inline-flex items-center gap-2 bg-white text-brand-700 font-semibold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors text-sm"
            >
              Post a Job — Free Trial
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
