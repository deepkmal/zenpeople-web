import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';
import { sectors } from '../../data/sectors';

const locations = [
  'sydney',
  'melbourne',
  'brisbane',
  'perth',
  'adelaide',
  'canberra',
  'hobart',
  'darwin',
];

export function Footer() {
  return (
    <footer className="bg-[#141B2D] text-white">
      <Container>
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div>
              <Link to="/" className="inline-block">
                <span className="text-2xl font-bold">
                  <span className="text-[#2175D9]">Zen</span>
                  <span className="text-white">People</span>
                </span>
              </Link>
              <p className="mt-4 text-gray-300 leading-relaxed">
                specialist facade & glazing recruitment
                <br />
                australia-wide.
              </p>
              <div className="mt-6 space-y-2">
                <a
                  href="tel:0428192718"
                  className="block text-sky-300 hover:text-white transition-colors"
                >
                  0428 192 718
                </a>
                <a
                  href="mailto:hello@zenpeople.com.au"
                  className="block text-sky-300 hover:text-white transition-colors"
                >
                  hello@zenpeople.com.au
                </a>
              </div>
            </div>

            {/* Industries Column */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Industries we serve</h3>
              <ul className="space-y-2">
                {sectors.map((sector) => (
                  <li key={sector.id}>
                    <Link
                      to={`/sectors/${sector.slug}`}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {sector.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* General Column */}
            <div>
              <h3 className="font-semibold text-lg mb-4">General</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/jobs"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Find me a job
                  </Link>
                </li>
                <li>
                  <Link
                    to="/hire"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Find me staff
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Locations */}
        <div className="border-t border-white/20 py-6">
          <p className="text-center text-gray-400 text-sm">
            <span className="mr-2">locations:</span>
            {locations.map((location, index) => (
              <span key={location}>
                {location}
                {index < locations.length - 1 && (
                  <span className="mx-2">|</span>
                )}
              </span>
            ))}
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} ZenPeople. All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-white transition-colors">
                privacy policy
              </Link>
              <span>|</span>
              <Link to="/terms" className="hover:text-white transition-colors">
                terms & conditions
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
