import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getSectorBySlug } from '../data/sectors';
import { Container } from '../components/ui/Container';
import { SectorFormsSection } from '../components/sectors/SectorFormsSection';

export function SectorPage() {
  const { slug } = useParams<{ slug: string }>();
  const sector = slug ? getSectorBySlug(slug) : undefined;

  if (!sector) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section - Left/Right Layout */}
      <section>
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2">
          {/* Left - Content */}
          <div className="bg-[#141B2D] flex items-center px-6 sm:px-10 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-16 xl:pr-20 py-12 sm:py-16 lg:py-20">
            <div className="max-w-xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6 tracking-tight">
                {sector.name}
              </h1>
              <p className="text-white/80 text-base sm:text-lg lg:text-xl leading-relaxed">
                {sector.description}
              </p>
            </div>
          </div>

          {/* Right - Image */}
          <div className="h-64 sm:h-80 lg:h-auto lg:min-h-[400px] relative">
            <img
              src={sector.image}
              alt={sector.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Positions Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <h2 className="text-2xl sm:text-3xl font-semibold text-navy mb-8 text-center">
            Positions we recruit for
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto">
            {sector.positions.map((position) => (
              <div
                key={position.id}
                className="bg-gray-50 px-6 py-5 text-center border border-gray-100 hover:border-[#2175D9]/30 hover:bg-[#2175D9]/5 transition-colors"
              >
                <span className="text-navy font-medium">{position.name}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-12 text-center">
            <Link
              to={`/jobs?sector=${sector.jobSector}`}
              className="inline-flex items-center gap-3 bg-[#141B2D] text-white px-8 py-4 font-semibold hover:bg-[#141B2D]/90 transition-colors group"
            >
              <span>Show me what's available</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Forms Section */}
      <SectorFormsSection />
    </div>
  );
}
