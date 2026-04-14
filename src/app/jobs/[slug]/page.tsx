import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ApplyButton from '@/components/jobs/ApplyButton';
import { jobs } from '@/data/jobs';
import { formatSalary, formatDate, timeAgo } from '@/lib/utils';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = jobs.find((j) => j.slug === params.slug);
  if (!job) return { title: 'Job Not Found' };
  return {
    title:       `${job.title} at ${job.company}`,
    description: `${job.title} at ${job.company} — ${job.workMode} · ${job.type} · ${formatSalary(job.salaryMin, job.salaryMax)}/yr`,
    openGraph: {
      title:       `${job.title} at ${job.company} | DispatchBoard`,
      description: `${job.workMode} · ${job.experience} · ${formatSalary(job.salaryMin, job.salaryMax)}`,
    },
  };
}

const workModeColor: Record<string, string> = {
  Remote:    'bg-brand-50 text-brand-700 border-brand-200',
  Hybrid:    'bg-blue-50 text-blue-700 border-blue-200',
  'On-site': 'bg-slate-100 text-slate-600 border-slate-200',
};

export default function JobPage({ params }: Props) {
  const job = jobs.find((j) => j.slug === params.slug);

  if (!job) notFound();

  const related = jobs.filter((j) => j.id !== job.id && j.category === job.category).slice(0, 3);

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-slate-900 transition-colors">Jobs</Link>
          <span>›</span>
          <span className="text-slate-700">{job.category}</span>
          <span>›</span>
          <span className="text-slate-400 truncate max-w-[200px]">{job.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">

          {/* Main */}
          <div className="space-y-4">

            {/* Header card */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600 flex-shrink-0">
                  {job.companyLogo}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-slate-600">{job.company}</span>
                    {job.urgent   && <span className="text-xs font-semibold bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full">Urgent</span>}
                    {job.featured && <span className="text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200 px-2 py-0.5 rounded-full">Featured</span>}
                  </div>
                  <h1 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-slate-900 leading-tight">
                    {job.title}
                  </h1>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                {[
                  { icon: '📍', label: 'Location',  value: job.location },
                  { icon: '💼', label: 'Type',       value: job.type },
                  { icon: '⭐', label: 'Experience', value: job.experience },
                  { icon: '💰', label: 'Salary',     value: formatSalary(job.salaryMin, job.salaryMax) + '/yr' },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="bg-slate-50 rounded-lg p-3">
                    <div className="text-xs text-slate-500 mb-0.5">{icon} {label}</div>
                    <div className="text-sm font-semibold text-slate-900">{value}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-sm font-medium px-3 py-1 rounded-full border ${workModeColor[job.workMode] ?? 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                  {job.workMode}
                </span>
                {job.tags.map((tag) => (
                  <span key={tag} className="text-xs text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
                <span className="text-xs text-slate-400 ml-auto">
                  Posted {timeAgo(job.postedAt)} · {formatDate(job.postedAt)}
                </span>
              </div>
            </div>

            {/* Apply button — mobile only, shown above description */}
            <div className="lg:hidden">
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="text-center mb-3">
                  <div className="font-display font-bold text-xl text-slate-900">{formatSalary(job.salaryMin, job.salaryMax)}</div>
                  <div className="text-xs text-slate-500">per year</div>
                </div>
                <ApplyButton jobTitle={job.title} company={job.company} />
              </div>
            </div>

            {/* Description */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
              <h2 className="font-display font-bold text-lg text-slate-900 mb-3">About the Role</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{job.description}</p>
            </div>

            {/* Responsibilities */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
              <h2 className="font-display font-bold text-lg text-slate-900 mb-3">Responsibilities</h2>
              <ul className="space-y-2.5">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
              <h2 className="font-display font-bold text-lg text-slate-900 mb-3">Requirements</h2>
              <ul className="space-y-2.5">
                {job.requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <span className="text-brand-500 font-bold flex-shrink-0 mt-0.5">✓</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
              <h2 className="font-display font-bold text-lg text-slate-900 mb-3">Benefits &amp; Perks</h2>
              <ul className="space-y-2.5">
                {job.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <span className="text-amber-500 flex-shrink-0 mt-0.5">★</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Sidebar — desktop only */}
          <aside className="hidden lg:block space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm sticky top-20">
              <div className="text-center mb-4">
                <div className="font-display font-bold text-2xl text-slate-900">
                  {formatSalary(job.salaryMin, job.salaryMax)}
                </div>
                <div className="text-sm text-slate-500">per year</div>
              </div>
              <ApplyButton jobTitle={job.title} company={job.company} />
              <p className="text-xs text-slate-400 text-center mt-2">
                Sign in to apply and track your application
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                {[
                  { icon: '🌐', text: job.workMode },
                  { icon: '📅', text: `Posted ${formatDate(job.postedAt)}` },
                  { icon: '🏢', text: job.company },
                  { icon: '📍', text: job.location },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{icon}</span><span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {related.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <h3 className="font-display font-semibold text-sm text-slate-900 mb-3">Similar Jobs</h3>
                <div className="space-y-3">
                  {related.map((j) => (
                    <Link key={j.id} href={`/jobs/${j.slug}`} className="block group">
                      <div className="text-sm font-medium text-slate-800 group-hover:text-brand-600 transition-colors leading-tight">
                        {j.title}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{j.company} · {j.workMode}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>

        </div>
      </main>
      <Footer />
    </>
  );
}
