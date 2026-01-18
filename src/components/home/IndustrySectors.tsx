import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';
import { sectors } from '../../data/sectors';

export function IndustrySectors() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-navy">
            We specialise in recruiting for
          </h2>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {sectors.map((sector) => (
            <Link
              key={sector.id}
              to={`/sectors/${sector.slug}`}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              {/* Background Image */}
              <img
                src={sector.image}
                alt={sector.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Sector Name */}
              <div className="absolute inset-0 flex items-end p-5 lg:p-6">
                <h3 className="text-white text-lg lg:text-xl font-medium">
                  {sector.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
