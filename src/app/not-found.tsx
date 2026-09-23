import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-[#0E0703] text-white flex flex-col items-center justify-center px-6 text-center space-y-6">
      <p className="text-[11px] tracking-[0.3em] uppercase text-[#A27B58]">
        Page not found
      </p>
      <h1 className="font-serif text-6xl sm:text-7xl font-light uppercase">
        404
      </h1>
      <Link
        href="/"
        className="rounded-full border border-white/30 px-6 py-3 text-xs tracking-[0.25em] uppercase hover:bg-white hover:text-black transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
}
