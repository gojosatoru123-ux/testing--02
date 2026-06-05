import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const location = usePathname();
  const isHome = location === "/";

  const textPrimary = isHome ? "text-white/40" : "text-black/60";
  const textLinks = isHome ? "text-white/30" : "text-black/60";
  const textDivider = isHome ? "text-white/10" : "text-black/20";
  const textCopyright = isHome ? "text-white/20" : "text-black/50";

  return (
    <footer className="relative mt-32">

      <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      <div className="px-6 md:px-12 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <img
              src="/cacheu_logo.webp"
              alt="CacheU Logo"
              className="w-8 h-8 rounded-lg object-cover opacity-80"
            />

            <span className={`text-sm font-mono tracking-wide ${textPrimary}`}>
              CacheU — built by engineers, for engineers.
            </span>
          </div>

          {/* Links */}
          <div className={`flex flex-wrap items-center justify-center gap-8 text-sm font-mono ${textLinks}`}>

            <Link
              href="/home"
              className="transition hover:text-purple-400"
            >
              Library
            </Link>

            <Link
              href="/docs/lld-introduction"
              className="transition hover:text-purple-400"
            >
              Docs
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-purple-400"
            >
              Terms
            </Link>

            <Link
              href="/privacy-policy"
              className="transition hover:text-purple-400"
            >
              Privacy
            </Link>

            <span className={`select-none ${textDivider}`}>|</span>

            <span className={textCopyright}>
              © {currentYear}
            </span>

          </div>

        </div>
      </div>
    </footer>
  );
}