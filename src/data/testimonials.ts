export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: "ZenPeople understood exactly what we needed. Within two weeks, we had three excellent candidates to choose from. Highly recommended!",
    name: 'John Smith',
    title: 'HR Manager',
    company: 'ABC Facades',
  },
  {
    id: '2',
    quote: "Professional service from start to finish. They kept me informed throughout and helped me land my dream role in facade engineering.",
    name: 'Sarah Johnson',
    title: 'Facade Engineer',
    company: 'Placed Candidate',
  },
  {
    id: '3',
    quote: "Finally, recruiters who actually understand the facade and glazing industry. Their candidates were all relevant and well-prepared.",
    name: 'Michael Chen',
    title: 'Operations Director',
    company: 'XYZ Glazing',
  },
  {
    id: '4',
    quote: "ZenPeople's industry knowledge is unmatched. They found us a Senior Project Manager who hit the ground running from day one.",
    name: 'Emma Williams',
    title: 'Managing Director',
    company: 'Premier Facades',
  },
  {
    id: '5',
    quote: "As someone transitioning from general construction to facades, ZenPeople guided me through the process and found the perfect fit.",
    name: 'David Brown',
    title: 'Project Coordinator',
    company: 'Placed Candidate',
  },
];
