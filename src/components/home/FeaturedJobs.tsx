import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { JobCard } from '../jobs/JobCard';
import { useFeaturedJobs } from '../../hooks/useFeaturedJobs';

function JobCardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 p-6 animate-pulse">
      <div className="flex justify-between items-start mb-3">
        <div className="h-4 bg-gray-200 rounded w-32" />
        <div className="h-4 bg-gray-200 rounded w-24" />
      </div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-6" />
      <div className="flex flex-wrap gap-6">
        <div>
          <div className="h-3 bg-gray-200 rounded w-10 mb-1" />
          <div className="h-4 bg-gray-200 rounded w-20" />
        </div>
        <div>
          <div className="h-3 bg-gray-200 rounded w-16 mb-1" />
          <div className="h-4 bg-gray-200 rounded w-24" />
        </div>
      </div>
    </div>
  );
}

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
              <JobCardSkeleton key={i} />
            ))
          ) : (
            jobs.map((job) => (
              <JobCard key={job.id} job={job} />
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
