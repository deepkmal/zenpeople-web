import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-navy mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <Link
          to="/"
          className="inline-block bg-navy text-white px-6 py-3 rounded-lg hover:bg-navy/90 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
