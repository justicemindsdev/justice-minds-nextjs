import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-primary-blue border-b-4 border-accent-red">
      <div className="w-full bg-primary-blue">
        <Image
          src="https://tvecnfdqakrevzaeifpk.supabase.co/storage/v1/object/public/COURT_OF_APPEAL/FINAL_JUSTICE_HERO.svg"
          alt="Justice Minds Forensic Intelligence"
          width={1920}
          height={400}
          className="w-full h-auto"
          priority
        />
      </div>
      
      <nav className="guardian-nav">
        <div className="flex justify-center items-center">
          <Link 
            href="/" 
            className="px-10 py-4 text-white no-underline font-bold text-sm tracking-wider uppercase border-b-3 border-transparent hover:bg-white/10 hover:border-accent-red transition-all"
          >
            INVESTIGATIONS
          </Link>
          <Link 
            href="/investigations/institutional" 
            className="px-10 py-4 text-white no-underline font-bold text-sm tracking-wider uppercase border-b-3 border-transparent hover:bg-white/10 hover:border-accent-red transition-all"
          >
            INSTITUTIONAL
          </Link>
          <Link 
            href="/gov-uk" 
            className="px-10 py-4 text-white no-underline font-bold text-sm tracking-wider uppercase border-b-3 border-transparent hover:bg-white/10 hover:border-accent-red transition-all"
          >
            GOV.UK
          </Link>
          <Link 
            href="/#features" 
            className="px-10 py-4 text-white no-underline font-bold text-sm tracking-wider uppercase border-b-3 border-transparent hover:bg-white/10 hover:border-accent-red transition-all"
          >
            FEATURES
          </Link>
          <Link 
            href="/#analysis" 
            className="px-10 py-4 text-white no-underline font-bold text-sm tracking-wider uppercase border-b-3 border-transparent hover:bg-white/10 hover:border-accent-red transition-all"
          >
            ANALYSIS
          </Link>
          <Link 
            href="/#about" 
            className="px-10 py-4 text-white no-underline font-bold text-sm tracking-wider uppercase border-b-3 border-transparent hover:bg-white/10 hover:border-accent-red transition-all"
          >
            ABOUT
          </Link>
          <Link 
            href="/contact" 
            className="px-10 py-4 text-white no-underline font-bold text-sm tracking-wider uppercase border-b-3 border-transparent hover:bg-white/10 hover:border-accent-red transition-all"
          >
            CONTACT
          </Link>
        </div>
      </nav>
    </header>
  )
}
