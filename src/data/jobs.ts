import type { Job } from '../utils/payload-api'

// Static job listings
export const jobs: Job[] = [
  {
    id: '1',
    title: 'Facade & Window Sales',
    slug: 'facade-window-sales-sydney',
    summary: 'Join a leading facade and window manufacturer as a Sales Representative, driving business growth across the Sydney region.',
    city: 'Sydney NSW',
    employment_type: 'permanent-full-time',
    sector: 'sales-marketing',
    salary: '$90K - $180K + Super',
    isActive: true,
    createdAt: '2026-02-04T00:00:00.000Z',
    updatedAt: '2026-02-04T00:00:00.000Z',
    company_desc: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Our client is a well-established facade and window manufacturer with over 20 years of experience delivering high-quality products to the Australian construction industry. They pride themselves on innovation, quality craftsmanship, and exceptional customer service.' }
            ]
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'With a strong reputation in both commercial and residential markets, they offer a supportive team environment and genuine career progression opportunities.' }
            ]
          }
        ]
      }
    },
    role_desc: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'As a Facade & Window Sales Representative, you will be responsible for developing and maintaining client relationships across the Sydney metropolitan area. This is a fantastic opportunity for a motivated sales professional to join a growing business.' }
            ]
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Key responsibilities include:' }
            ]
          },
          {
            type: 'list',
            tag: 'ul',
            listType: 'bullet',
            children: [
              { type: 'listitem', children: [{ type: 'text', text: 'Identifying and pursuing new business opportunities' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Managing existing client accounts and building long-term relationships' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Preparing quotes and proposals for facade and window packages' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Collaborating with technical teams to deliver tailored solutions' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Attending site meetings and industry events' }] }
            ]
          }
        ]
      }
    },
    role_requirements: {
      root: {
        type: 'root',
        children: [
          {
            type: 'list',
            tag: 'ul',
            listType: 'bullet',
            children: [
              { type: 'listitem', children: [{ type: 'text', text: 'Proven sales experience in the facade, window, or construction industry' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Strong communication and negotiation skills' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Ability to read and interpret architectural drawings' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Valid driver\'s license and own vehicle' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Self-motivated with a results-driven approach' }] }
            ]
          }
        ]
      }
    }
  },
  {
    id: '2',
    title: 'Factory Manager - Windows',
    slug: 'factory-manager-windows-sydney',
    summary: 'Lead the manufacturing operations for a premier window fabrication facility in Sydney, overseeing production, quality, and team management.',
    city: 'Sydney NSW',
    employment_type: 'permanent-full-time',
    sector: 'facade-manufacturing-supply',
    salary: '$110K - $130K + Super',
    isActive: true,
    createdAt: '2026-02-03T00:00:00.000Z',
    updatedAt: '2026-02-03T00:00:00.000Z',
    company_desc: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'A leading Australian window manufacturer with state-of-the-art production facilities is seeking an experienced Factory Manager to drive operational excellence.' }
            ]
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'The company has built a strong reputation for quality aluminium and timber windows, supplying major residential and commercial projects across NSW.' }
            ]
          }
        ]
      }
    },
    role_desc: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'As Factory Manager, you will oversee all aspects of the window manufacturing operation, ensuring production targets are met while maintaining the highest quality standards.' }
            ]
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Key responsibilities include:' }
            ]
          },
          {
            type: 'list',
            tag: 'ul',
            listType: 'bullet',
            children: [
              { type: 'listitem', children: [{ type: 'text', text: 'Managing daily production operations and scheduling' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Leading and developing a team of 30+ factory staff' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Implementing continuous improvement initiatives' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Ensuring WHS compliance across all operations' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Managing inventory, equipment, and maintenance schedules' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Reporting to senior management on KPIs and production metrics' }] }
            ]
          }
        ]
      }
    },
    role_requirements: {
      root: {
        type: 'root',
        children: [
          {
            type: 'list',
            tag: 'ul',
            listType: 'bullet',
            children: [
              { type: 'listitem', children: [{ type: 'text', text: '5+ years experience in manufacturing management, preferably in windows/facades' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Strong leadership and team management skills' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Knowledge of lean manufacturing principles' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Experience with ERP systems and production planning software' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Excellent problem-solving and decision-making abilities' }] }
            ]
          }
        ]
      }
    }
  },
  {
    id: '3',
    title: 'Estimator - Facade',
    slug: 'estimator-facade-sydney',
    summary: 'Join a respected facade contractor as an Estimator, preparing detailed cost estimates for commercial facade projects across Sydney.',
    city: 'Sydney NSW',
    employment_type: 'permanent-full-time',
    sector: 'facade-manufacturing-supply',
    salary: '$80K - $120K + Super',
    isActive: true,
    createdAt: '2026-02-02T00:00:00.000Z',
    updatedAt: '2026-02-02T00:00:00.000Z',
    company_desc: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Our client is a highly regarded facade contractor specialising in curtain wall, cladding, and glazing systems for commercial and high-rise projects.' }
            ]
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'With a portfolio of landmark buildings across Sydney, they offer an exciting opportunity to work on some of the most prestigious projects in the city.' }
            ]
          }
        ]
      }
    },
    role_desc: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'As a Facade Estimator, you will be responsible for preparing accurate and competitive estimates for commercial facade projects.' }
            ]
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Key responsibilities include:' }
            ]
          },
          {
            type: 'list',
            tag: 'ul',
            listType: 'bullet',
            children: [
              { type: 'listitem', children: [{ type: 'text', text: 'Reviewing tender documents and architectural drawings' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Preparing detailed quantity take-offs and cost estimates' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Liaising with suppliers to obtain competitive pricing' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Collaborating with project managers and engineers on technical solutions' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Attending pre-tender meetings and site inspections' }] }
            ]
          }
        ]
      }
    },
    role_requirements: {
      root: {
        type: 'root',
        children: [
          {
            type: 'list',
            tag: 'ul',
            listType: 'bullet',
            children: [
              { type: 'listitem', children: [{ type: 'text', text: '3+ years estimating experience in facade or glazing industry' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Strong understanding of curtain wall and cladding systems' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Proficiency in estimation software and Microsoft Excel' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Ability to read and interpret architectural and structural drawings' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Excellent attention to detail and analytical skills' }] }
            ]
          }
        ]
      }
    }
  },
  {
    id: '4',
    title: 'Remedial Diagnostic Engineer & Building Consultant',
    slug: 'remedial-diagnostic-engineer-building-consultant-sydney',
    summary: 'Provide expert diagnostic and consulting services for building defects and facade remediation projects across Sydney.',
    city: 'Sydney NSW',
    employment_type: 'permanent-full-time',
    sector: 'engineering-design-consulting',
    salary: '$120K - $160K + Super',
    isActive: true,
    createdAt: '2026-02-01T00:00:00.000Z',
    updatedAt: '2026-02-01T00:00:00.000Z',
    company_desc: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Our client is a leading building consultancy specialising in facade diagnostics, defect assessment, and remedial engineering solutions.' }
            ]
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'With a team of highly qualified engineers and consultants, they provide expert services to strata managers, developers, and building owners across NSW.' }
            ]
          }
        ]
      }
    },
    role_desc: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'As a Remedial Diagnostic Engineer & Building Consultant, you will conduct thorough building investigations and provide expert recommendations for remediation works.' }
            ]
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Key responsibilities include:' }
            ]
          },
          {
            type: 'list',
            tag: 'ul',
            listType: 'bullet',
            children: [
              { type: 'listitem', children: [{ type: 'text', text: 'Conducting facade and building envelope inspections' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Diagnosing building defects and water ingress issues' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Preparing detailed technical reports and remediation specifications' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Providing expert witness services and litigation support' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Advising clients on building compliance and maintenance strategies' }] }
            ]
          }
        ]
      }
    },
    role_requirements: {
      root: {
        type: 'root',
        children: [
          {
            type: 'list',
            tag: 'ul',
            listType: 'bullet',
            children: [
              { type: 'listitem', children: [{ type: 'text', text: 'Degree in Civil/Structural Engineering or Building Surveying' }] },
              { type: 'listitem', children: [{ type: 'text', text: '5+ years experience in building diagnostics or remedial engineering' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Strong knowledge of building codes and Australian Standards' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Excellent report writing and communication skills' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Experience with facade systems and waterproofing' }] }
            ]
          }
        ]
      }
    }
  },
  {
    id: '5',
    title: 'Project Manager - Facade & Louvre',
    slug: 'project-manager-facade-louvre-sydney',
    summary: 'Lead and manage facade and louvre installation projects for a premier contractor working on major commercial developments.',
    city: 'Sydney NSW',
    employment_type: 'permanent-full-time',
    sector: 'facade-manufacturing-supply',
    salary: '$160K - $180K per annum',
    isActive: true,
    createdAt: '2026-01-31T00:00:00.000Z',
    updatedAt: '2026-01-31T00:00:00.000Z',
    company_desc: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'A market-leading facade and louvre contractor with an outstanding reputation for delivering complex commercial projects across Australia.' }
            ]
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'The company is known for its innovative approach, strong safety culture, and commitment to employee development. Current projects include several landmark developments in the Sydney CBD.' }
            ]
          }
        ]
      }
    },
    role_desc: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'As a Senior Project Manager, you will take full ownership of major facade and louvre projects from award to completion, ensuring delivery on time, within budget, and to the highest quality standards.' }
            ]
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Key responsibilities include:' }
            ]
          },
          {
            type: 'list',
            tag: 'ul',
            listType: 'bullet',
            children: [
              { type: 'listitem', children: [{ type: 'text', text: 'Managing multiple concurrent facade/louvre projects valued at $5M-$20M+' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Leading project teams including supervisors, engineers, and subcontractors' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Developing and maintaining project schedules and budgets' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Managing client relationships and stakeholder communication' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Ensuring compliance with safety, quality, and environmental requirements' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Identifying and mitigating project risks' }] }
            ]
          }
        ]
      }
    },
    role_requirements: {
      root: {
        type: 'root',
        children: [
          {
            type: 'list',
            tag: 'ul',
            listType: 'bullet',
            children: [
              { type: 'listitem', children: [{ type: 'text', text: '7+ years project management experience in facade or construction industry' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Strong technical knowledge of facade systems and louvre products' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Proven track record of delivering large-scale commercial projects' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Excellent leadership, negotiation, and communication skills' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Relevant qualifications in construction management or engineering (preferred)' }] }
            ]
          }
        ]
      }
    }
  },
  {
    id: '6',
    title: 'Glazing Install Manager & Installers - Multiple Positions',
    slug: 'glazing-install-manager-installers-sydney',
    summary: 'Multiple opportunities for experienced glazing professionals to join a growing facade installation company in Sydney.',
    city: 'Sydney NSW',
    employment_type: 'permanent-full-time',
    sector: 'facade-manufacturing-supply',
    salary: '$130K - $150K + Super',
    isActive: true,
    createdAt: '2026-01-30T00:00:00.000Z',
    updatedAt: '2026-01-30T00:00:00.000Z',
    company_desc: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Our client is a rapidly growing facade installation company specialising in commercial glazing, curtain wall, and structural glass systems.' }
            ]
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Due to a strong pipeline of projects, they are expanding their team and seeking experienced glazing professionals at all levels.' }
            ]
          }
        ]
      }
    },
    role_desc: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'We are recruiting for multiple positions including Install Manager and Senior Glaziers to support the company\'s growing project portfolio.' }
            ]
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Install Manager responsibilities:' }
            ]
          },
          {
            type: 'list',
            tag: 'ul',
            listType: 'bullet',
            children: [
              { type: 'listitem', children: [{ type: 'text', text: 'Overseeing all on-site installation activities' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Managing installation crews and subcontractors' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Coordinating with project managers on scheduling and resources' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Ensuring quality and safety compliance' }] }
            ]
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Glazier responsibilities:' }
            ]
          },
          {
            type: 'list',
            tag: 'ul',
            listType: 'bullet',
            children: [
              { type: 'listitem', children: [{ type: 'text', text: 'Installing curtain wall, shopfronts, and structural glazing' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Reading and interpreting installation drawings' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Working safely at heights' }] }
            ]
          }
        ]
      }
    },
    role_requirements: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Install Manager requirements:' }
            ]
          },
          {
            type: 'list',
            tag: 'ul',
            listType: 'bullet',
            children: [
              { type: 'listitem', children: [{ type: 'text', text: '5+ years experience in commercial glazing installation' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Strong leadership and team coordination skills' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Solid understanding of facade systems and installation methods' }] }
            ]
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Glazier requirements:' }
            ]
          },
          {
            type: 'list',
            tag: 'ul',
            listType: 'bullet',
            children: [
              { type: 'listitem', children: [{ type: 'text', text: 'Trade qualification in glazing (Certificate III)' }] },
              { type: 'listitem', children: [{ type: 'text', text: '3+ years commercial glazing experience' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Working at heights and EWP tickets' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Valid NSW driver\'s license' }] }
            ]
          }
        ]
      }
    }
  },
  {
    id: '7',
    title: 'Drafter/Designer - Facade',
    slug: 'drafter-designer-facade-sydney',
    summary: 'Create detailed facade shop drawings and designs for a leading facade contractor working on premium commercial projects.',
    city: 'Sydney NSW',
    employment_type: 'permanent-full-time',
    sector: 'facade-manufacturing-supply',
    salary: '$130K + Super',
    isActive: true,
    createdAt: '2026-01-29T00:00:00.000Z',
    updatedAt: '2026-01-29T00:00:00.000Z',
    company_desc: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'A highly respected facade contractor with a reputation for technical excellence and innovative design solutions.' }
            ]
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'The company works on premium commercial and residential projects, and is known for pushing the boundaries of facade design and engineering.' }
            ]
          }
        ]
      }
    },
    role_desc: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'As a Facade Drafter/Designer, you will produce high-quality shop drawings and design documentation for complex facade projects.' }
            ]
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Key responsibilities include:' }
            ]
          },
          {
            type: 'list',
            tag: 'ul',
            listType: 'bullet',
            children: [
              { type: 'listitem', children: [{ type: 'text', text: 'Developing detailed shop drawings for curtain wall, cladding, and glazing systems' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Creating 3D models and design visualisations' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Coordinating with engineers, architects, and project teams' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Reviewing architectural drawings and specifications' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Producing fabrication and installation drawings' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Managing drawing revisions and documentation control' }] }
            ]
          }
        ]
      }
    },
    role_requirements: {
      root: {
        type: 'root',
        children: [
          {
            type: 'list',
            tag: 'ul',
            listType: 'bullet',
            children: [
              { type: 'listitem', children: [{ type: 'text', text: 'Diploma or degree in Architectural Drafting or related field' }] },
              { type: 'listitem', children: [{ type: 'text', text: '3+ years experience in facade/glazing shop drawing production' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Proficiency in AutoCAD and Revit' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Knowledge of curtain wall and cladding systems' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Strong attention to detail and ability to meet deadlines' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Experience with 3D modelling software (SketchUp, Rhino) is a plus' }] }
            ]
          }
        ]
      }
    }
  }
]

// Helper to format date strings
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
