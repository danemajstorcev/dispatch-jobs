export type JobType = "Full-time" | "Part-time" | "Contract" | "Freelance";
export type ExperienceLevel =
  | "Entry Level"
  | "Mid Level"
  | "Senior"
  | "Lead"
  | "Manager";
export type WorkMode = "Remote" | "On-site" | "Hybrid";

export interface Job {
  id: string;
  slug: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  state: string;
  workMode: WorkMode;
  type: JobType;
  experience: ExperienceLevel;
  salaryMin: number;
  salaryMax: number;
  category: string;
  tags: string[];
  postedAt: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  featured: boolean;
  urgent: boolean;
}

export interface JobFilters {
  search: string;
  workMode: WorkMode | "";
  experience: ExperienceLevel | "";
  salaryMin: number;
  category: string;
}
