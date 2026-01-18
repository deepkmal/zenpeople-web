import { useState, useCallback, useEffect, useMemo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { testimonials } from '../../data/testimonials';

interface TestimonialsProps {
  variant?: 'default' | 'clients-only';
}

export function Testimonials({ variant = 'default' }: TestimonialsProps) {
  const filteredTestimonials = useMemo(() => {
    if (variant === 'clients-only') {
      return testimonials.filter((t) => t.type === 'client');
    }
    return testimonials;
  }, [variant]);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    slidesToScroll: 1,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const isClientsOnly = variant === 'clients-only';

  return (
    <section className={`py-16 lg:py-24 ${isClientsOnly ? 'bg-white' : 'bg-gray-100'}`}>
      <Container>
        {/* Header */}
        <div className={`mb-8 ${isClientsOnly ? 'text-left' : 'text-center'}`}>
          <h2 className="text-2xl sm:text-3xl text-navy font-semibold">
            {isClientsOnly ? 'What our clients say' : 'What our clients & candidates say'}
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden py-4" ref={emblaRef}>
            <div className="flex gap-6 px-2">
              {filteredTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3"
                >
                  <div className={`bg-white shadow-md p-6 h-full flex flex-col ${isClientsOnly ? 'border-t-[0.5px] border-gray-200' : ''}`}>
                    <blockquote className="flex-1">
                      <p className="text-gray-700 leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                    </blockquote>
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <p className="font-semibold text-navy">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">
                        {testimonial.title}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-navy hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed hidden lg:flex"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-navy hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed hidden lg:flex"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Navigation Dots */}
        <div className="flex justify-center gap-2 mt-6 lg:hidden">
          {filteredTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className="w-2 h-2 rounded-full bg-gray-300 hover:bg-navy transition-colors"
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
