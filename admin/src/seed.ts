import { getPayload } from 'payload'
import config from './payload.config'

const cities = ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Hobart', 'Darwin', 'Canberra']

const employmentTypes = [
  'permanent-full-time',
  'permanent-part-time',
  'contract-full-time',
  'contract-part-time',
  'casual',
] as const

const sectors = [
  'engineering-design-consulting',
  'facade-manufacturing-supply',
  'remedial-construction',
  'sales-marketing',
  'business-support-admin',
  'executive-search',
] as const

const sectorDisplayNames: Record<string, string> = {
  'engineering-design-consulting': 'Engineering, Design & Consulting',
  'facade-manufacturing-supply': 'Facade Manufacturing & Supply',
  'remedial-construction': 'Remedial Construction',
  'sales-marketing': 'Sales & Marketing',
  'business-support-admin': 'Business Support & Admin',
  'executive-search': 'Executive Search',
}

const employmentTypeDisplayNames: Record<string, string> = {
  'permanent-full-time': 'Permanent/Full-time',
  'permanent-part-time': 'Permanent/Part-time',
  'contract-full-time': 'Contract/Full-time',
  'contract-part-time': 'Contract/Part-time',
  'casual': 'Casual',
}

const jobTitlesBySector: Record<string, string[]> = {
  'engineering-design-consulting': [
    'Senior Facade Engineer',
    'Facade Design Engineer',
    'Structural Engineer',
    'Project Engineer',
    'Building Envelope Consultant',
    'Facade Performance Engineer',
    'Thermal Performance Engineer',
    'BIM Coordinator',
    'CAD Technician',
    'Facade Consultant',
  ],
  'facade-manufacturing-supply': [
    'Project Manager - Curtain Wall',
    'Production Manager',
    'Quality Control Manager',
    'Estimator',
    'Supply Chain Coordinator',
    'Manufacturing Supervisor',
    'Installation Manager',
    'Glazing Specialist',
    'Fabrication Team Leader',
    'Logistics Coordinator',
  ],
  'remedial-construction': [
    'Remedial Works Supervisor',
    'Site Manager',
    'Project Manager - Remedial',
    'Building Inspector',
    'Waterproofing Specialist',
    'Concrete Repair Technician',
    'Rope Access Technician',
    'Safety Officer',
    'Works Coordinator',
    'Remedial Engineer',
  ],
  'sales-marketing': [
    'Business Development Manager',
    'Sales Representative',
    'Marketing Manager',
    'Account Manager',
    'Digital Marketing Specialist',
    'Brand Manager',
    'Sales Coordinator',
    'Marketing Coordinator',
    'Client Relations Manager',
    'Technical Sales Engineer',
  ],
  'business-support-admin': [
    'Office Manager',
    'Executive Assistant',
    'HR Coordinator',
    'Finance Officer',
    'Accounts Payable Officer',
    'Receptionist',
    'Administration Officer',
    'Payroll Officer',
    'Document Controller',
    'Office Administrator',
  ],
  'executive-search': [
    'Executive Director',
    'General Manager',
    'Chief Operations Officer',
    'Managing Director',
    'Head of Engineering',
    'National Sales Manager',
    'Regional Director',
    'Head of Project Management',
    'Chief Financial Officer',
    'Head of Business Development',
  ],
}

const salaryRanges = [
  '$60k - $75k + super',
  '$75k - $90k + super',
  '$90k - $110k + super',
  '$110k - $130k + super',
  '$130k - $150k + super',
  '$150k - $180k + super',
  '$180k - $220k + super',
  '$220k+ package',
]

function slugify(text: string, city: string): string {
  return `${text}-${city}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function generateJobDescription(title: string, sector: string, city: string): string {
  const sectorName = sectorDisplayNames[sector]

  const intros = [
    `We are seeking an experienced ${title} to join our growing team in ${city}.`,
    `An exciting opportunity has arisen for a ${title} in ${city}.`,
    `Our client, a leading company in the ${sectorName} sector, is looking for a ${title}.`,
    `Join our dynamic team as a ${title} based in ${city}.`,
  ]

  return getRandomItem(intros)
}

function generateRoleDescription(title: string, sector: string): object {
  const sectorName = sectorDisplayNames[sector]

  const responsibilities = [
    `Lead and manage projects within the ${sectorName} sector`,
    'Collaborate with cross-functional teams to deliver high-quality outcomes',
    'Develop and maintain client relationships',
    'Ensure compliance with industry standards and regulations',
    'Mentor and develop junior team members',
    'Prepare reports and documentation as required',
    'Contribute to continuous improvement initiatives',
  ]

  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'About the Role' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: `This is an exciting opportunity to join a respected organisation in the ${sectorName} industry. As a ${title}, you will play a key role in delivering exceptional outcomes for our clients.`,
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Key Responsibilities' }],
        },
        {
          type: 'list',
          listType: 'bullet',
          children: responsibilities.slice(0, 5).map((resp) => ({
            type: 'listitem',
            children: [{ type: 'paragraph', children: [{ type: 'text', text: resp }] }],
          })),
        },
      ],
    },
  }
}

function generateRequirements(title: string, sector: string): object {
  const requirements = [
    'Relevant tertiary qualifications',
    '5+ years of experience in a similar role',
    'Strong communication and interpersonal skills',
    'Proven ability to work autonomously and as part of a team',
    'Valid driver\'s licence',
    'Right to work in Australia',
  ]

  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Requirements' }],
        },
        {
          type: 'list',
          listType: 'bullet',
          children: requirements.map((req) => ({
            type: 'listitem',
            children: [{ type: 'paragraph', children: [{ type: 'text', text: req }] }],
          })),
        },
      ],
    },
  }
}

async function seed() {
  console.log('Starting seed process...')

  const payload = await getPayload({ config })

  // Delete existing jobs
  console.log('Deleting existing jobs...')
  const existingJobs = await payload.find({
    collection: 'jobs',
    limit: 1000,
  })

  for (const job of existingJobs.docs) {
    await payload.delete({
      collection: 'jobs',
      id: job.id,
    })
  }

  console.log('Creating 50 new jobs...')

  const jobs = []
  const usedSlugs = new Set<string>()

  for (let i = 0; i < 50; i++) {
    const sector = sectors[i % sectors.length]
    const titles = jobTitlesBySector[sector]
    const title = titles[Math.floor(i / sectors.length) % titles.length]
    const city = getRandomItem(cities)
    const employmentType = getRandomItem(employmentTypes)

    // Generate unique slug
    let slug = slugify(title, city)
    let counter = 1
    while (usedSlugs.has(slug)) {
      slug = `${slugify(title, city)}-${counter}`
      counter++
    }
    usedSlugs.add(slug)

    // Assign salary based on sector and title seniority
    const salaryIndex = Math.min(
      Math.floor(i / 10) + Math.floor(Math.random() * 3),
      salaryRanges.length - 1
    )
    const salary = salaryRanges[salaryIndex]

    const job = await payload.create({
      collection: 'jobs',
      data: {
        title,
        slug,
        summary: generateJobDescription(title, sector, city),
        city,
        employment_type: employmentType,
        sector,
        salary,
        role_desc: generateRoleDescription(title, sector),
        role_requirements: generateRequirements(title, sector),
        isActive: true,
      },
    })

    jobs.push(job)
    console.log(`Created job ${i + 1}/50: ${title} in ${city}`)
  }

  console.log(`\nSeed completed! Created ${jobs.length} jobs.`)
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed error:', err)
  process.exit(1)
})
