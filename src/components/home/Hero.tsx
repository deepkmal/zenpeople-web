import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { JobSearchBar } from './JobSearchBar';

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.webp"
          alt="Construction site with cranes"
          className="w-full h-full object-cover object-center"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left pt-20">
        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight mb-8 tracking-tighter">
          #1 in Facade & Glazing Recruitment.
          <br />
          Australia Wide.
        </h1>

        {/* Search Bar */}
        <div className="mb-8">
          <JobSearchBar />
        </div>

        {/* Secondary Link */}
        <Link
          to="/employers"
          className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors group"
        >
          <span className="underline underline-offset-4">Looking to hire? Click here.</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
