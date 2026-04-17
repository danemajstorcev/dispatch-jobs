'use client';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Header() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">D</span>
            </div>
            <span className="font-display font-bold text-slate-900 text-lg hidden sm:block">
              DispatchBoard
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Browse Jobs
            </Link>
            <Link href="/#categories" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Categories
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600">
                  Hi, {session.user?.name?.split(' ')[0]}
                </span>
                <button
                  onClick={() => signOut()}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg px-4 py-2 hover:bg-slate-50 transition-all"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/signin"
                  className="text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white rounded-lg px-4 py-2 transition-colors"
                >
                  Post a Job
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-slate-200 py-3 space-y-1">
            <Link href="/" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg" onClick={() => setMenuOpen(false)}>
              Browse Jobs
            </Link>
            <Link href="/#categories" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg" onClick={() => setMenuOpen(false)}>
              Categories
            </Link>
            <div className="pt-2 border-t border-slate-100 space-y-1">
              {session ? (
                <>
                  <span className="block px-3 py-2 text-sm text-slate-500">Signed in as {session.user?.name}</span>
                  <button onClick={() => { signOut(); setMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg">
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/signin" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg" onClick={() => setMenuOpen(false)}>
                    Sign in
                  </Link>
                  <Link href="/auth/signin" className="block px-3 py-2 text-sm font-semibold text-brand-600 hover:bg-brand-50 rounded-lg" onClick={() => setMenuOpen(false)}>
                    Post a Job
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
