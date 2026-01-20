import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Briefcase } from 'lucide-react';
import { Container } from '../ui/Container';
import { useFeaturedJobs } from '../../hooks/useFeaturedJobs';
import { employmentTypeLabels, formatRelativeTime } from '../../utils/payload-api';

export function FeaturedJobs() {
  const { jobs, loading, error } = useFeaturedJobs();

  // Don't render section if there's an error or no jobs
  if (error || (!loading && jobs.length === 0)) {
    return null;
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-navy">
            Recently listed
          </h2>
        </div>

        {/* Job Cards */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 p-5 animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="flex gap-4">
                  <div className="h-4 bg-gray-200 rounded w-24" />
                  <div className="h-4 bg-gray-200 rounded w-32" />
                </div>
              </div>
            ))
          ) : (
            jobs.map((job) => (
              <Link
                key={job.id}
                to={`/jobs/${job.slug}`}
                className="block bg-white border border-gray-200 p-5 hover:shadow-md transition-shadow"
              >
                {/* Title */}
                <h3 className="text-lg font-semibold text-navy mb-3">
                  {job.title}
                </h3>

                {/* Metadata Row */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {job.city}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    {employmentTypeLabels[job.employment_type] || job.employment_type}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-navy font-medium hover:text-navy/80 transition-colors"
          >
            view all jobs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
