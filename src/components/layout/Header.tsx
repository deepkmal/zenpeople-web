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
  const [isEmployersDropdownOpen, setIsEmployersDropdownOpen] = useState(false);
  const [isTalentDropdownOpen, setIsTalentDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';
  const isTransparent = isHomePage && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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

  const handleGetQuoteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsEmployersDropdownOpen(false);
    if (location.pathname === '/employers') {
      scrollToSection('get-a-quote');
    } else {
      navigate('/employers', { state: { scrollTo: 'get-a-quote' } });
    }
  };

  const handleRegisterResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTalentDropdownOpen(false);
    if (location.pathname === '/talent') {
      scrollToSection('register-resume');
    } else {
      navigate('/talent', { state: { scrollTo: 'register-resume' } });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 w-full ${
          isTransparent ? 'bg-transparent' : 'bg-white shadow-sm'
        }`}
      >
        <Container>
          <nav className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold">
                <span className={isTransparent ? 'text-white' : 'text-[#2175D9]'}>Zen</span>
                <span className={isTransparent ? 'text-white' : 'text-navy'}>People</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <a
                href="/#services"
                onClick={handleAboutClick}
                className={`transition-colors font-medium text-sm ${
                  isTransparent
                    ? 'text-white hover:text-white/80'
                    : 'text-gray-700 hover:text-[#2175D9]'
                }`}
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
                    isTransparent
                      ? 'text-white hover:text-white/80'
                      : isDropdownOpen ? 'text-[#2175D9]' : 'text-gray-700 hover:text-[#2175D9]'
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
                    <div className="w-64 bg-white shadow-lg py-2 border border-gray-100">
                      {sectors.map((sector) => (
                        <Link
                          key={sector.id}
                          to={`/sectors/${sector.slug}`}
                          className="block px-4 py-3 text-sm text-gray-700 hover:text-[#2175D9] hover:bg-[#2175D9]/5 transition-colors !cursor-pointer"
                        >
                          {sector.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* For employers Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsEmployersDropdownOpen(true)}
                onMouseLeave={() => setIsEmployersDropdownOpen(false)}
              >
                <Link
                  to="/employers"
                  className={`flex items-center gap-1 font-medium text-sm transition-colors ${
                    isTransparent
                      ? 'text-white hover:text-white/80'
                      : isEmployersDropdownOpen ? 'text-[#2175D9]' : 'text-gray-700 hover:text-[#2175D9]'
                  }`}
                >
                  For employers
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isEmployersDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </Link>

                {isEmployersDropdownOpen && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="w-48 bg-white shadow-lg py-2 border border-gray-100">
                      <a
                        href="/employers#get-a-quote"
                        onClick={handleGetQuoteClick}
                        className="block px-4 py-3 text-sm text-gray-700 hover:text-[#2175D9] hover:bg-[#2175D9]/5 transition-colors !cursor-pointer"
                      >
                        Get a quote
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* For talent Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsTalentDropdownOpen(true)}
                onMouseLeave={() => setIsTalentDropdownOpen(false)}
              >
                <Link
                  to="/talent"
                  className={`flex items-center gap-1 font-medium text-sm transition-colors ${
                    isTransparent
                      ? 'text-white hover:text-white/80'
                      : isTalentDropdownOpen ? 'text-[#2175D9]' : 'text-gray-700 hover:text-[#2175D9]'
                  }`}
                >
                  For talent
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isTalentDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </Link>

                {isTalentDropdownOpen && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="w-72 bg-white shadow-lg py-2 border border-gray-100">
                      <a
                        href="/talent#register-resume"
                        onClick={handleRegisterResumeClick}
                        className="block px-4 py-3 text-sm text-gray-700 hover:text-[#2175D9] hover:bg-[#2175D9]/5 transition-colors !cursor-pointer"
                      >
                        Match me with employment opportunities
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/jobs"
                className={`transition-colors font-medium text-sm ${
                  isTransparent
                    ? 'text-white hover:text-white/80'
                    : 'text-gray-700 hover:text-[#2175D9]'
                }`}
              >
                Search jobs
              </Link>

              {isTransparent ? (
                <Link
                  to="/contact"
                  className="px-5 py-2.5 bg-white text-navy font-medium text-sm hover:bg-white/90 transition-colors"
                >
                  Contact Us
                </Link>
              ) : (
                <Button href="/contact" variant="primary" size="md">
                  Contact Us
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`lg:hidden p-2 ${
                isTransparent ? 'text-white hover:text-white/80' : 'text-gray-700 hover:text-navy'
              }`}
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
