import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { MobileMenu } from './MobileMenu';
import { sectors } from '../../data/sectors';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      scrollToSection('services');
    } else {
      navigate('/', { state: { scrollTo: 'services' } });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 bg-white transition-shadow w-full ${
          isScrolled ? 'shadow-sm' : ''
        }`}
      >
        <Container>
          <nav className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold">
                <span className="text-[#2175D9]">Zen</span>
                <span className="text-navy">People</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <a
                href="/#services"
                onClick={handleAboutClick}
                className="text-gray-700 hover:text-[#2175D9] transition-colors font-medium text-sm"
              >
                About us
              </a>

              {/* Industry Sectors Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 font-medium text-sm transition-colors ${
                    isDropdownOpen ? 'text-[#2175D9]' : 'text-gray-700 hover:text-[#2175D9]'
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
                  <div className="absolute top-full left-0 pt-2">
                    <div className="w-64 bg-white rounded-lg shadow-lg py-2 border border-gray-100">
                      {sectors.map((sector) => (
                        <Link
                          key={sector.id}
                          to={`/sectors/${sector.slug}`}
                          className="block px-4 py-3 text-gray-700 hover:text-[#2175D9] hover:bg-[#2175D9]/5 transition-colors"
                        >
                          {sector.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/hire"
                className="text-gray-700 hover:text-[#2175D9] transition-colors font-medium text-sm"
              >
                Find me staff
              </Link>

              <Link
                to="/jobs"
                className="text-gray-700 hover:text-[#2175D9] transition-colors font-medium text-sm"
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
