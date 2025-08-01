export interface Founder {
  _id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  _id: string;
  category: string;
  services: ServiceItem[];
  createdAt: Date;
  updatedAt: Date;
  features?: string[];
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  features?: string[];
}

export interface Partner {
  _id: string;
  name: string;
  logo: string;
  website: string;
  createdAt: Date;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  liveDemoLink?: string;
  githubLink?: string;
  image: string;
  screenshots?: string[];
  tags: string[];
  features?: string[];
  technologies?: string[];
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  bannerImage: string;
  features: string[];
  screenshots: string[];
  githubLink?: string;
  liveLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  coverImage: string;
  excerpt: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  submittedAt: Date;
}