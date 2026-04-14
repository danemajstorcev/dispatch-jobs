'use client';
import { useSession, signIn } from 'next-auth/react';
import { useState } from 'react';

interface Props { jobTitle: string; company: string; }

export default function ApplyButton({ jobTitle, company }: Props) {
  const { data: session } = useSession();
  const [applied, setApplied] = useState(false);

  if (applied) {
    return (
      <div className="w-full py-3 bg-brand-50 text-brand-700 border border-brand-200 rounded-xl text-center text-sm font-semibold">
        ✓ Application Sent!
      </div>
    );
  }

  if (session) {
    return (
      <button
        onClick={() => setApplied(true)}
        className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm hover:shadow"
      >
        Apply Now
      </button>
    );
  }

  return (
    <button
      onClick={() => signIn(undefined, { callbackUrl: window.location.pathname })}
      className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm hover:shadow"
    >
      Sign in to Apply
    </button>
  );
}
