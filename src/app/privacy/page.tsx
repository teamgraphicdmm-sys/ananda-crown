import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Ananda Crown Mohali",
  description:
    "Privacy policy and legal disclaimers for Ananda Crown, Sector 78 Mohali.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen w-full bg-[#0E0703] text-white px-6 sm:px-12 md:px-16 py-12 md:py-16">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link
          href="/"
          className="text-xs tracking-[0.18em] uppercase text-white/70 hover:text-[#A27B58] transition-colors"
        >
          ← Back to home
        </Link>
        <h1 className="font-serif text-5xl sm:text-6xl font-light uppercase">
          Privacy Policy
        </h1>
        <div className="space-y-4 text-sm leading-relaxed text-white/70">
          <p>
            <strong className="text-white">Project compliance:</strong> Ananda
            Crown is an upcoming residential development in Sector 78, SAS
            Nagar, Mohali. Details here are indicative and subject to Punjab
            RERA approvals and the agreement for sale.
          </p>
          <p>
            <strong className="text-white">Information usage:</strong> Contact
            details submitted via inquiry forms are used solely by authorised
            representatives of Ananda Group for pricing, availability, and
            visit scheduling. We do not sell your data to third parties.
          </p>
          <p>
            <strong className="text-white">Disclaimer:</strong> Renderings,
            specifications, and dimensions on this website are conceptual. Final
            specifications follow the executed agreement for sale under Punjab
            RERA guidelines.
          </p>
        </div>
      </div>
    </div>
  );
}
