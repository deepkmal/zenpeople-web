import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { sectors } from '../../data/sectors';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [isSectorsOpen, setIsSectorsOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 lg:hidden"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white z-50 lg:hidden transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-xl font-bold">
              <span className="text-orange">Zen</span>
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
              <Link
                to="/services"
                onClick={onClose}
                className="block px-4 py-3 text-gray-700 hover:text-navy hover:bg-gray-50 rounded-lg font-medium"
              >
                Our Services
              </Link>

              {/* Industry Sectors Accordion */}
              <div>
                <button
                  onClick={() => setIsSectorsOpen(!isSectorsOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-navy hover:bg-gray-50 rounded-lg font-medium"
                >
                  Industry Sectors
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isSectorsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isSectorsOpen && (
                  <div className="pl-4 mt-1 space-y-1">
                    {sectors.map((sector) => (
                      <Link
                        key={sector.id}
                        to={`/sectors/${sector.slug}`}
                        onClick={onClose}
                        className="block px-4 py-2 text-gray-600 hover:text-navy hover:bg-gray-50 rounded-lg"
                      >
                        {sector.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/hire"
                onClick={onClose}
                className="block px-4 py-3 text-gray-700 hover:text-navy hover:bg-gray-50 rounded-lg font-medium"
              >
                Find me staff
              </Link>

              <Link
                to="/jobs"
                onClick={onClose}
                className="block px-4 py-3 text-gray-700 hover:text-navy hover:bg-gray-50 rounded-lg font-medium"
              >
                Find me a job
              </Link>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              className="w-full"
              onClick={onClose}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
