import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { sectors } from '../../data/sectors';

interface IndustrySectorsProps {
  variant?: 'default' | 'hire';
}

export function IndustrySectors({ variant = 'default' }: IndustrySectorsProps) {
  const isHireVariant = variant === 'hire';

  return (
    <section className="bg-white">
      {/* Header */}
      {isHireVariant ? (
        <div className="px-6 sm:px-10 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))] pt-12 lg:pt-16 pb-6 lg:pb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-navy">
            We recruit for
          </h2>
        </div>
      ) : (
        <Container className="pt-12 lg:pt-16 pb-6 lg:pb-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-navy">
              We specialise in recruiting for
            </h2>
          </div>
        </Container>
      )}

      {/* Sectors Grid - Full Width with Max Width */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${
        isHireVariant
          ? 'px-6 sm:px-10 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]'
          : 'max-w-7xl mx-auto px-6 sm:px-6 lg:px-8'
      }`}>
        {sectors.map((sector) => (
          <Link
            key={sector.id}
            to={`/sectors/${sector.slug}`}
            className="group relative aspect-[3/1] sm:aspect-[2/1] lg:aspect-[2/1] overflow-hidden"
          >
            {/* Background Image */}
            <img
              src={sector.image}
              alt={sector.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            {/* Sector Name */}
            <div className="absolute inset-0 flex items-end p-5 lg:p-6">
              <h3 className="text-white text-lg lg:text-xl font-medium flex items-center gap-2">
                {sector.name}
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
