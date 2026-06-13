import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

interface Metric {
  value: string;
  label: string;
  detail: string;
}

interface Service {
  icon: string;
  title: string;
  description: string;
}

interface Experience {
  period: string;
  company: string;
  location: string;
  role: string;
  points: string[];
}

interface Project {
  title: string;
  category: string;
  description: string;
  impact: string;
  stack: string[];
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent {
  currentYear = new Date().getFullYear();
  activeSection = 'home';

  navItems = [
    { id: 'home', label: 'Home' },
    { id: 'expertise', label: 'Expertise' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'stack', label: 'Stack' },
    { id: 'contact', label: 'Contact' },
  ];

  metrics: Metric[] = [
    { value: '4+', label: 'Years', detail: 'Frontend engineering experience' },
    { value: '20+', label: 'Modules', detail: 'Enterprise frontend modules delivered' },
    { value: '3', label: 'Organizations', detail: 'Qatar & Jordan professional experience' },
    { value: '1000s', label: 'Users', detail: 'Government and enterprise users served' },
  ];

  services: Service[] = [
    {
      icon: '🏛️',
      title: 'Government Digital Platforms',
      description: 'Building secure, scalable systems for document management, approvals, case flows, and government operations.',
    },
    {
      icon: '🧩',
      title: 'Angular Architecture',
      description: 'Designing reusable components, clean module structure, reactive forms, RxJS flows, and maintainable UI systems.',
    },
    {
      icon: '⚡',
      title: 'Performance & UX',
      description: 'Optimizing load speed, lazy loading, SSR, SEO, responsive layouts, and smooth user interaction.',
    },
    {
      icon: '🔗',
      title: 'Enterprise API Integration',
      description: 'Integrating REST APIs, authentication, authorization, workflow states, and complex business rules.',
    },
  ];

  experiences: Experience[] = [
    {
      period: 'Nov 2025 — Present',
      company: 'Public Prosecution',
      location: 'Doha, Qatar',
      role: 'Mid-Level Frontend Software Engineer',
      points: [
        'Developing large-scale government digital platforms for critical business operations.',
        'Implementing document generation, approval workflows, digital signatures, and case management modules.',
        'Building reusable Angular components and contributing to frontend architecture decisions.',
      ],
    },
    {
      period: 'May 2022 — Oct 2025',
      company: 'iHorizons',
      location: 'Doha, Qatar',
      role: 'Frontend Developer',
      points: [
        'Delivered enterprise web applications for regional media and government clients.',
        'Built responsive Angular interfaces integrated with REST APIs and business workflows.',
        'Improved SEO, SSR, load speed, and frontend performance across production systems.',
      ],
    },
    {
      period: 'Oct 2021 — Apr 2022',
      company: 'Orange Jordan',
      location: 'Amman, Jordan',
      role: 'Full Stack Developer',
      points: [
        'Developed full-stack applications using Angular, TypeScript, and .NET.',
        'Participated in SDLC including development, testing, deployment, and support.',
        'Collaborated with cross-functional teams to deliver maintainable solutions.',
      ],
    },
  ];

  projects: Project[] = [
    {
      title: 'Government Document Workflow Platform',
      category: 'Government System',
      description: 'A workflow-driven platform for document generation, approvals, digital signatures, and role-based actions.',
      impact: 'Improved document lifecycle visibility and approval efficiency.',
      stack: ['Angular', 'TypeScript', 'RxJS', 'REST APIs', 'SCSS'],
    },
    {
      title: 'Case Management Frontend',
      category: 'Enterprise Application',
      description: 'Complex modules for cases, related parties, documents, actions, inboxes, and permission-based flows.',
      impact: 'Delivered structured UI for business-critical government operations.',
      stack: ['Angular', 'Reactive Forms', 'Angular Material', 'API Integration'],
    },
    {
      title: 'Enterprise Administration Portal',
      category: 'Internal System',
      description: 'Admin experience for profiles, permissions, menus, dashboards, settings, and operational management.',
      impact: 'Enhanced internal system usability and maintainability.',
      stack: ['Angular', 'TypeScript', 'SCSS', 'Reusable Components'],
    },
  ];

  skills = [
    'Angular', 'TypeScript', 'JavaScript', 'RxJS', 'React', 'HTML5', 'SCSS',
    'Tailwind CSS', 'REST APIs', 'SSR', 'SEO', 'Lazy Loading', 'Git',
    'CI/CD', 'Agile/Scrum', 'Code Review', 'Debugging'
  ];

  scrollTo(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const sections = this.navItems.map(item => item.id);
    let current: string | undefined;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const el = document.getElementById(section);

      if (el && el.getBoundingClientRect().top <= 120) {
        current = section;
        break;
      }
    }

    if (current) {
      this.activeSection = current;
    }
  }
}
