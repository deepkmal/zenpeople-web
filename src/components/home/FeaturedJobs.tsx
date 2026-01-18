import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { jobs, formatDate } from '../../data/jobs';

export function FeaturedJobs() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-navy italic">
            latest opportunities.
          </h2>
        </div>

        {/* Job Cards */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Top Row */}
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-orange">
                  {job.sector}
                </span>
                <span className="text-xs text-gray-500 uppercase tracking-wide">
                  {formatDate(job.postedDate)}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl lg:text-2xl font-bold text-navy mb-3">
                {job.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 line-clamp-2 mb-6">{job.description}</p>

              {/* Divider */}
              <hr className="border-gray-200 mb-6" />

              {/* Metadata Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-6 sm:gap-8">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Type
                    </p>
                    <p className="text-navy font-medium">{job.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Location
                    </p>
                    <p className="text-navy font-medium">{job.location}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Salary
                    </p>
                    <p className="text-navy font-medium">{job.salary}</p>
                  </div>
                </div>

                <Link
                  to={`/jobs/${job.slug}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-navy text-white text-sm font-medium rounded-lg hover:bg-navy/90 transition-colors"
                >
                  Learn more
                </Link>
              </div>
            </div>
          ))}
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
