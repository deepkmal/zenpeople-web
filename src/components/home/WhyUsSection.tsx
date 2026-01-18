import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';

const cityImages = [
  { city: 'Sydney', image: '/images/cities/sydney.webp' },
  { city: 'Melbourne', image: '/images/cities/melbourne.webp' },
  { city: 'Brisbane', image: '/images/cities/brisbane.webp' },
  { city: 'Perth', image: '/images/cities/perth.webp' },
  { city: 'Adelaide', image: '/images/cities/adelaide.webp' },
  { city: 'Canberra', image: '/images/cities/canberra.webp' },
];

export function WhyUsSection() {
  return (
    <section className="bg-gray-50">
      {/* Facade & Glazing Specialists - Image Right (Full Bleed) */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:items-stretch">
        {/* Text - Top on mobile, Left on desktop - Blue background full bleed left */}
        <div className="bg-[#2175D9] flex items-center px-4 sm:px-6 lg:pr-16 xl:pr-20 py-10 sm:py-12 lg:py-24 order-1">
          <div className="max-w-xl lg:ml-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4 sm:mb-6 tracking-tight">
              Facade & glazing specialists
            </h2>
            <p className="text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed mb-8">
              We focus exclusively on the facade and glazing industry. It's all we do, so we do it better than anyone else. Our deep industry knowledge means we understand the technical requirements, safety standards, and specific skills needed for every role.
            </p>
            <Link
              to="/hire"
              className="inline-flex items-center gap-3 bg-white shadow-lg hover:shadow-xl px-6 py-4 transition-all group"
            >
              <span className="text-lg font-semibold text-navy">Get me a quote</span>
              <ArrowRight className="w-5 h-5 text-navy group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
        {/* Image - Bottom on mobile, Right on desktop */}
        <div className="relative h-[250px] sm:h-[300px] lg:h-auto lg:min-h-[600px] order-2">
          <img
            src="/images/facade-specialist.webp"
            alt="Facade and glazing construction"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Australia-wide Coverage - Image Left (Full Bleed) */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:items-stretch">
        {/* Image Grid Left - Full bleed, no gaps, no rounded edges - Hidden on mobile/tablet */}
        <div className="hidden lg:grid lg:order-1 grid-cols-3 grid-rows-2">
          {cityImages.map((item) => (
            <div key={item.city} className="relative aspect-square overflow-hidden">
              <img
                src={item.image}
                alt={item.city}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-4">
                <span className="text-white text-sm font-semibold">{item.city}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Text Right */}
        <div className="flex items-center px-4 sm:px-6 lg:pl-16 xl:pl-20 py-10 sm:py-12 lg:py-24 order-1 lg:order-2">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy mb-6">
              Australia-wide coverage
            </h2>
            <p className="text-gray-600 text-lg lg:text-xl leading-relaxed mb-8">
              From Sydney to Perth, Melbourne to Brisbane - we recruit for companies across every major Australian city. Our national network means we can source talent locally or help candidates relocate for the right opportunity.
            </p>
            <Link
              to="/jobs"
              className="inline-flex items-center gap-3 bg-white shadow-lg hover:shadow-xl px-6 py-4 transition-all group"
            >
              <span className="text-lg font-semibold text-navy">Show me what's available</span>
              <ArrowRight className="w-5 h-5 text-navy group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
