// GROQ queries for Sanity CMS

/**
 * Paginated active jobs with optional keyword/city/sector/employment_type filters.
 * Returns { docs, totalDocs }
 *
 * Parameters: $keyword, $city, $sector, $employment_type, $sort, $offset, $limit
 */
export const JOBS_QUERY = `{
  "docs": *[
    _type == "job"
    && isActive == true
    && ($keyword == "" || title match $keyword + "*" || summary match $keyword + "*")
    && ($city == "" || city == $city)
    && ($sector == "" || sector == $sector)
    && ($employment_type == "" || employment_type == $employment_type)
  ] | order(
    select(
      $sort == "oldest" => _createdAt asc,
      _createdAt desc
    )
  ) [$offset...$limit] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    "slug": slug.current,
    summary,
    city,
    employment_type,
    sector,
    salary,
    company_desc,
    role_desc,
    role_requirements,
    isActive
  },
  "totalDocs": count(*[
    _type == "job"
    && isActive == true
    && ($keyword == "" || title match $keyword + "*" || summary match $keyword + "*")
    && ($city == "" || city == $city)
    && ($sector == "" || sector == $sector)
    && ($employment_type == "" || employment_type == $employment_type)
  ])
}`

/**
 * Single job by slug with full rich text fields.
 * Parameter: $slug
 */
export const JOB_BY_SLUG_QUERY = `*[
  _type == "job"
  && slug.current == $slug
  && isActive == true
][0] {
  _id,
  _createdAt,
  _updatedAt,
  title,
  "slug": slug.current,
  summary,
  city,
  employment_type,
  sector,
  salary,
  company_desc,
  role_desc,
  role_requirements,
  isActive
}`

/**
 * 3 most recent active jobs (for featured section).
 */
export const FEATURED_JOBS_QUERY = `*[
  _type == "job"
  && isActive == true
] | order(_createdAt desc) [0...3] {
  _id,
  _createdAt,
  _updatedAt,
  title,
  "slug": slug.current,
  summary,
  city,
  employment_type,
  sector,
  salary,
  company_desc,
  role_desc,
  role_requirements,
  isActive
}`

/**
 * Unique cities from active jobs.
 */
export const CITIES_QUERY = `array::unique(*[_type == "job" && isActive == true].city) | order(@ asc)`
