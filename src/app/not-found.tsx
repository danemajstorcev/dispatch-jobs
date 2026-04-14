import Link from 'next/link';
import Header from '@/components/layout/Header';

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="min-h-[60vh] flex items-center justify-center px-4 text-center">
        <div>
          <div className="text-6xl mb-4">🚛</div>
          <h1 className="font-display font-bold text-3xl text-slate-900 mb-2">Lost on the highway</h1>
          <p className="text-slate-500 mb-6">This page doesn&apos;t exist or the job has been filled.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm">
            ← Back to all jobs
          </Link>
        </div>
      </div>
    </>
  );
}
