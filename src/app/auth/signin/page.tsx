'use client';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignInPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  useEffect(() => { if (session) router.push('/'); }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await signIn('credentials', { email, password, redirect: false });
    setLoading(false);
    if (res?.error) setError('Invalid email or password. Try alex@example.com / demo1234');
    else router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Minimal header */}
      <header className="bg-white border-b border-slate-200 px-4 py-4">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">D</span>
          </div>
          <span className="font-display font-bold text-slate-900">DispatchBoard</span>
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-2">Welcome back</h1>
            <p className="text-slate-500 text-sm">Sign in to apply for jobs and manage your profile</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">

            {/* Demo hint */}
            <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 mb-6">
              <p className="text-xs font-semibold text-brand-700 mb-1">Demo credentials</p>
              <p className="text-xs text-brand-600 font-mono">alex@example.com / demo1234</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent placeholder:text-slate-400"
                />
              </div>

              {error && (
                <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors text-sm"
              >
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>

            <p className="text-center text-xs text-slate-400 mt-4">
              Don&apos;t have an account?{' '}
              <Link href="/" className="text-brand-600 font-medium hover:text-brand-700">
                Browse jobs as guest
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
