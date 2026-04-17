import Link from "next/link";
import type { Job } from "@/types";
import { formatSalary, timeAgo } from "@/lib/utils";

interface Props {
  job: Job;
}

const workModeStyle: Record<string, string> = {
  Remote: "bg-brand-50 text-brand-700 border-brand-200",
  Hybrid: "bg-blue-50 text-blue-700 border-blue-200",
  "On-site": "bg-slate-100 text-slate-600 border-slate-200",
};

const expStyle: Record<string, string> = {
  "Entry Level": "bg-emerald-50 text-emerald-700",
  "Mid Level": "bg-sky-50 text-sky-700",
  Senior: "bg-violet-50 text-violet-700",
  Lead: "bg-amber-50 text-amber-700",
  Manager: "bg-rose-50 text-rose-700",
};

export default function JobCard({ job }: Props) {
  return (
    <Link href={`/jobs/${job.slug}`} className="block group">
      <article
        className={`bg-white rounded-xl border transition-all duration-200 p-5 hover:shadow-md hover:-translate-y-0.5 ${job.featured ? "border-brand-200 shadow-sm" : "border-slate-200"}`}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 flex-shrink-0">
              {job.companyLogo}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-medium text-slate-500 truncate">
                {job.company}
              </div>
              <h2 className="font-display font-semibold text-slate-900 text-base leading-tight group-hover:text-brand-600 transition-colors line-clamp-2">
                {job.title}
              </h2>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            {job.urgent && (
              <span className="text-[11px] font-semibold bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full">
                Urgent
              </span>
            )}
            {job.featured && (
              <span className="text-[11px] font-semibold bg-brand-50 text-brand-700 border border-brand-200 px-2 py-0.5 rounded-full">
                Featured
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border ${workModeStyle[job.workMode] ?? "bg-slate-100 text-slate-600 border-slate-200"}`}
          >
            {job.workMode === "Remote" && "🌐 "}
            {job.workMode}
          </span>
          <span
            className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${expStyle[job.experience] ?? "bg-slate-100 text-slate-600"}`}
          >
            {job.experience}
          </span>
          <span className="text-xs text-slate-500">📍 {job.location}</span>
          <span className="text-xs text-slate-500">· {job.type}</span>
        </div>

        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex flex-wrap gap-1.5">
            {job.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-sm font-semibold text-slate-900">
              {formatSalary(job.salaryMin, job.salaryMax)}
            </div>
            <div className="text-xs text-slate-400">
              {timeAgo(job.postedAt)}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
