export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
  type: 'client' | 'candidate';
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: "ZenPeople understood exactly what we needed. Within two weeks, we had three excellent candidates to choose from. Highly recommended!",
    name: 'John Smith',
    title: 'HR Manager',
    company: 'ABC Facades',
    type: 'client',
  },
  {
    id: '2',
    quote: "Professional service from start to finish. They kept me informed throughout and helped me land my dream role in facade engineering.",
    name: 'Sarah Johnson',
    title: 'Facade Engineer',
    company: 'Placed Candidate',
    type: 'candidate',
  },
  {
    id: '3',
    quote: "Finally, recruiters who actually understand the facade and glazing industry. Their candidates were all relevant and well-prepared.",
    name: 'Michael Chen',
    title: 'Operations Director',
    company: 'XYZ Glazing',
    type: 'client',
  },
  {
    id: '4',
    quote: "ZenPeople's industry knowledge is unmatched. They found us a Senior Project Manager who hit the ground running from day one.",
    name: 'Emma Williams',
    title: 'Managing Director',
    company: 'Premier Facades',
    type: 'client',
  },
  {
    id: '5',
    quote: "As someone transitioning from general construction to facades, ZenPeople guided me through the process and found the perfect fit.",
    name: 'David Brown',
    title: 'Project Coordinator',
    company: 'Placed Candidate',
    type: 'candidate',
  },
  {
    id: '9',
    quote: "ZenPeople took the time to understand what I was looking for in my next role. They matched me with a company that aligned perfectly with my career goals.",
    name: 'Marcus Lee',
    title: 'Facade Designer',
    company: 'Placed Candidate',
    type: 'candidate',
  },
  {
    id: '10',
    quote: "The team was incredibly supportive throughout the entire process. They prepared me for interviews and negotiated a great package on my behalf.",
    name: 'Sophie Williams',
    title: 'Project Manager',
    company: 'Placed Candidate',
    type: 'candidate',
  },
  {
    id: '11',
    quote: "I was impressed by how well ZenPeople knew the industry. They connected me with opportunities I never would have found on my own.",
    name: 'Tom Richards',
    title: 'Glazing Estimator',
    company: 'Placed Candidate',
    type: 'candidate',
  },
  {
    id: '6',
    quote: "We've worked with many recruiters over the years, but ZenPeople truly stands out. They consistently deliver candidates who understand our technical requirements.",
    name: 'Rachel Torres',
    title: 'HR Director',
    company: 'Cityscape Glazing',
    type: 'client',
  },
  {
    id: '7',
    quote: "The team at ZenPeople filled three critical roles for us in under a month. Their understanding of facade engineering roles is exceptional.",
    name: 'James Patterson',
    title: 'General Manager',
    company: 'Horizon Facades',
    type: 'client',
  },
  {
    id: '8',
    quote: "What impressed me most was how well ZenPeople understood our company culture. Every candidate they sent was not just qualified, but the right fit.",
    name: 'Lisa Nguyen',
    title: 'Operations Manager',
    company: 'Aurora Glass Systems',
    type: 'client',
  },
];
