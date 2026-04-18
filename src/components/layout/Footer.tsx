import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-brand-600 rounded-md flex items-center justify-center">
                <span className="text-white text-xs font-bold">D</span>
              </div>
              <span className="font-display font-bold text-white text-base">
                DispatchBoard
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              The #1 job board for freight dispatchers, logistics coordinators,
              and supply chain professionals.
            </p>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold mb-3">
              For Job Seekers
            </h3>
            <ul className="space-y-2">
              {[
                "Browse Jobs",
                "Remote Jobs",
                "Senior Roles",
                "Entry Level",
              ].map((l) => (
                <li key={l}>
                  <Link
                    href="/"
                    className="text-sm hover:text-white transition-colors"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold mb-3">
              For Employers
            </h3>
            <ul className="space-y-2">
              {[
                "Post a Job",
                "Pricing",
                "Employer Login",
                "Hiring Resources",
              ].map((l) => (
                <li key={l}>
                  <Link
                    href="/auth/signin"
                    className="text-sm hover:text-white transition-colors"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold mb-3">Company</h3>
            <ul className="space-y-2">
              {["About", "Blog", "Privacy Policy", "Terms of Service"].map(
                (l) => (
                  <li key={l}>
                    <Link
                      href="/"
                      className="text-sm hover:text-white transition-colors"
                    >
                      {l}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-sm text-center">
          © {new Date().getFullYear()} DispatchBoard. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
