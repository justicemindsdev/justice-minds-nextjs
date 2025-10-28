import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-primary-blue mt-16">
      <nav className="bg-black/20 border-t border-white/10">
        <div className="flex justify-center items-center flex-wrap gap-0 px-4 py-2">
          <Link href="/about" className="px-6 py-3 text-white/80 no-underline text-xs font-semibold tracking-wide hover:text-white hover:bg-white/10 transition-all">
            About
          </Link>
          <Link href="/contact" className="px-6 py-3 text-white/80 no-underline text-xs font-semibold tracking-wide hover:text-white hover:bg-white/10 transition-all">
            Contact
          </Link>
          <Link href="/privacy-policy" className="px-6 py-3 text-white/80 no-underline text-xs font-semibold tracking-wide hover:text-white hover:bg-white/10 transition-all">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="px-6 py-3 text-white/80 no-underline text-xs font-semibold tracking-wide hover:text-white hover:bg-white/10 transition-all">
            Terms of Service
          </Link>
          <Link href="/legal/legal-framework" className="px-6 py-3 text-white/80 no-underline text-xs font-semibold tracking-wide hover:text-white hover:bg-white/10 transition-all">
            Legal Framework
          </Link>
          <Link href="/gov-uk" className="px-6 py-3 text-white/80 no-underline text-xs font-semibold tracking-wide hover:text-white hover:bg-white/10 transition-all">
            Department for Forensic Intelligence Company Number 16331423 | ICO Certified ZB896365
          </Link>
        </div>
      </nav>
      <Image
        src="https://tvecnfdqakrevzaeifpk.supabase.co/storage/v1/object/public/caseworks/Creative%20Business%20Presentation%20(510%20x%20218%20mm).svg"
        alt="Justice Minds Footer"
        width={1920}
        height={400}
        className="w-full h-auto"
      />
    </footer>
  )
}
