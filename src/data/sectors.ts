export interface Sector {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export const sectors: Sector[] = [
  {
    id: '1',
    name: 'Engineering, Design & Consulting',
    slug: 'engineering-consulting',
    image: '/images/sectors/engineering.webp',
  },
  {
    id: '2',
    name: 'Facade Manufacturing & Supply',
    slug: 'facade-manufacturing',
    image: '/images/sectors/facade-manufacturing.webp',
  },
  {
    id: '3',
    name: 'Remedial Construction',
    slug: 'remedial-construction',
    image: '/images/sectors/remedial.webp',
  },
  {
    id: '4',
    name: 'Sales & Marketing',
    slug: 'sales-marketing',
    image: '/images/sectors/sales-marketing.webp',
  },
  {
    id: '5',
    name: 'Business Support & Admin',
    slug: 'business-support',
    image: '/images/sectors/business-support.webp',
  },
  {
    id: '6',
    name: 'Executive Search',
    slug: 'executive-search',
    image: '/images/sectors/executive-search.webp',
  },
];
