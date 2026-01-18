import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { MobileMenu } from './MobileMenu';
import { sectors } from '../../data/sectors';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow ${
          isScrolled ? 'shadow-sm' : ''
        }`}
      >
        <Container>
          <nav className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold">
                <span className="text-orange">Zen</span>
                <span className="text-navy">People</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <Link
                to="/services"
                className="text-gray-700 hover:text-navy transition-colors font-medium"
              >
                Our Services
              </Link>

              {/* Industry Sectors Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onBlur={() => setTimeout(() => setIsDropdownOpen(false), 150)}
                  className={`flex items-center gap-1 font-medium transition-colors ${
                    isDropdownOpen ? 'text-orange' : 'text-gray-700 hover:text-navy'
                  }`}
                >
                  Industry Sectors
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 border border-gray-100">
                    {sectors.map((sector) => (
                      <Link
                        key={sector.id}
                        to={`/sectors/${sector.slug}`}
                        className="block px-4 py-3 text-gray-700 hover:text-navy hover:bg-gray-50 transition-colors"
                      >
                        {sector.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/hire"
                className="text-gray-700 hover:text-navy transition-colors font-medium"
              >
                Find me staff
              </Link>

              <Link
                to="/jobs"
                className="text-gray-700 hover:text-navy transition-colors font-medium"
              >
                Find me a job
              </Link>

              <Button href="/contact" variant="primary" size="md">
                Contact Us
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-700 hover:text-navy"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </nav>
        </Container>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
