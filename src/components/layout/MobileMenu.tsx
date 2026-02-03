import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { X, ChevronDown } from 'lucide-react';
import { sectors } from '../../data/sectors';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [isSectorsOpen, setIsSectorsOpen] = useState(false);
  const [isEmployersOpen, setIsEmployersOpen] = useState(false);
  const [isTalentOpen, setIsTalentOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    if (location.pathname === '/') {
      setTimeout(() => scrollToSection('services'), 100);
    } else {
      navigate('/', { state: { scrollTo: 'services' } });
    }
  };

  const handleGetQuoteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    if (location.pathname === '/employers') {
      setTimeout(() => scrollToSection('get-a-quote'), 100);
    } else {
      navigate('/employers', { state: { scrollTo: 'get-a-quote' } });
    }
  };

  const handleRegisterResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    if (location.pathname === '/talent') {
      setTimeout(() => scrollToSection('register-resume'), 100);
    } else {
      navigate('/talent', { state: { scrollTo: 'register-resume' } });
    }
  };

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = 'hidden';
      // Small delay to ensure DOM is ready before animating
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    } else {
      setIsVisible(false);
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!shouldRender) return null;

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setShouldRender(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white z-50 lg:hidden transition-transform duration-300 ease-out ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4">
            <span className="text-xl font-bold">
              <span className="text-[#2175D9]">Zen</span>
              <span className="text-navy">People</span>
            </span>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              <a
                href="/#services"
                onClick={handleAboutClick}
                className="block px-4 py-3 text-gray-700 hover:text-[#2175D9] hover:bg-gray-50 rounded-lg font-medium"
              >
                About us
              </a>

              {/* Industry Sectors Accordion */}
              <div>
                <button
                  onClick={() => setIsSectorsOpen(!isSectorsOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-[#2175D9] hover:bg-gray-50 rounded-lg font-medium"
                >
                  Industry Sectors
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isSectorsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    isSectorsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pl-4 mt-1 space-y-1">
                    {sectors.map((sector) => (
                      <Link
                        key={sector.id}
                        to={`/sectors/${sector.slug}`}
                        onClick={onClose}
                        className="block px-4 py-2 text-gray-600 hover:text-[#2175D9] hover:bg-gray-50 rounded-lg"
                      >
                        {sector.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* For employers Accordion */}
              <div>
                <div className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                  <Link
                    to="/employers"
                    onClick={onClose}
                    className="font-medium hover:text-[#2175D9]"
                  >
                    For employers
                  </Link>
                  <button
                    onClick={() => setIsEmployersOpen(!isEmployersOpen)}
                    className="p-1 hover:text-[#2175D9]"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isEmployersOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    isEmployersOpen ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pl-4 mt-1 space-y-1">
                    <a
                      href="/employers#get-a-quote"
                      onClick={handleGetQuoteClick}
                      className="block px-4 py-2 text-gray-600 hover:text-[#2175D9] hover:bg-gray-50 rounded-lg"
                    >
                      Get a quote
                    </a>
                  </div>
                </div>
              </div>

              {/* For talent Accordion */}
              <div>
                <div className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                  <Link
                    to="/talent"
                    onClick={onClose}
                    className="font-medium hover:text-[#2175D9]"
                  >
                    For talent
                  </Link>
                  <button
                    onClick={() => setIsTalentOpen(!isTalentOpen)}
                    className="p-1 hover:text-[#2175D9]"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isTalentOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    isTalentOpen ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pl-4 mt-1 space-y-1">
                    <a
                      href="/talent#register-resume"
                      onClick={handleRegisterResumeClick}
                      className="block px-4 py-2 text-gray-600 hover:text-[#2175D9] hover:bg-gray-50 rounded-lg"
                    >
                      Match me with employment opportunities
                    </a>
                  </div>
                </div>
              </div>

              <Link
                to="/jobs"
                onClick={onClose}
                className="block px-4 py-3 text-gray-700 hover:text-[#2175D9] hover:bg-gray-50 rounded-lg font-medium"
              >
                Search jobs
              </Link>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4">
            <Link
              to="/contact"
              onClick={onClose}
              className="block w-full px-6 py-3 bg-[#141B2D] text-white text-center font-medium hover:bg-[#141B2D]/90 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
