import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';

interface NavItem { id: string; label: string; }
interface Experience { company: string; role: string; period: string; location: string; points: string[]; }
interface Project { number: string; title: string; category: string; description: string; features: string[]; stack: string[]; icon: string; featured?: boolean; github?: string; demo?: string; }
interface SkillGroup { title: string; icon: string; items: string[]; }

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroCanvas') heroCanvas?: ElementRef<HTMLCanvasElement>;
  currentYear = new Date().getFullYear();
  activeSection = 'home';
  menuOpen = false;
  emailCopied = false;
  typedText = '';
  readonly email = 'ammarhardann@gmail.com';

readonly roles = [
  'Full Stack Software Engineer',
  'Angular & .NET Developer',
  'Enterprise Systems Engineer',
  'AI Integration Enthusiast'
];

  readonly navItems: NavItem[] = [
    { id: 'home', label: 'Home' }, { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' }, { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' }, { id: 'ai', label: 'AI Journey' },
    { id: 'contact', label: 'Contact' },
  ];
  readonly projectFilters = ['All', 'Enterprise', 'Full Stack', 'AI'] as const;
  activeProjectFilter: 'All' | 'Enterprise' | 'Full Stack' | 'AI' = 'All';
  expandedExperiences = new Set<number>();
  readonly experiencePreviewCount = 4;

  get filteredProjects(): Project[] {
    if (this.activeProjectFilter === 'All') return this.projects;
    return this.projects.filter(project => {
      const category = project.category.toUpperCase();
      if (this.activeProjectFilter === 'AI') return category.includes('AI');
      if (this.activeProjectFilter === 'Enterprise') {
        return category.includes('ENTERPRISE') || category.includes('GOVERNMENT');
      }
      return category.includes('FULL STACK');
    });
  }

  setProjectFilter(filter: 'All' | 'Enterprise' | 'Full Stack' | 'AI'): void {
    this.activeProjectFilter = filter;
    // Newly shown project cards must not remain hidden by the reveal animation.
    if (this.browser) {
      requestAnimationFrame(() => this.setupReveal());
    }
  }

  isExperienceExpanded(index: number): boolean {
    return this.expandedExperiences.has(index);
  }

  toggleExperience(index: number): void {
    if (this.expandedExperiences.has(index)) {
      this.expandedExperiences.delete(index);
    } else {
      this.expandedExperiences.add(index);
    }
  }

  readonly stats = [
    { value: '5+', label: 'Years of experience' },
    { value: 'Angular', label: 'Core specialization' },
    { value: 'Qatar', label: 'Current location' },
  ];

readonly highlights = [
  {
    icon: '◈',
    title: 'Full Stack Development',
    description:
      'Angular, TypeScript, ASP.NET Core, REST APIs, Entity Framework Core, and SQL Server.'
  },
  {
    icon: '⌘',
    title: 'Enterprise Architecture',
    description:
      'Complex business workflows, reusable components, API contracts, role-based permissions, and maintainable application design.'
  },
  {
    icon: '▣',
    title: 'Government Digital Systems',
    description:
      'Document generation, approval workflows, digital signatures, case management, and enterprise administration.'
  },
  {
    icon: '✧',
    title: 'AI & Intelligent Applications',
    description:
      'Exploring Generative AI, LLM APIs, prompt engineering, RAG, embeddings, vector databases, and AI-powered application development.'
  }
];


readonly experiences: Experience[] = [
  {
    company: 'Public Prosecution',
    role: 'Software Engineer | Enterprise Applications',
    period: 'Nov 2025 — Present',
    location: 'Doha, Qatar',
    points: [
      'Engineer enterprise government applications supporting judicial operations, case management, document generation, and workflow automation.',

      'Develop scalable Angular and TypeScript applications integrated with enterprise REST APIs and backend business services.',

      'Implement complex document generation workflows, including draft creation, editing, validation, approval, and digital signature operations.',

      'Build multi-level approval experiences with role-based permissions, dynamic actions, workflow state management, and document-level authorization.',

      'Integrate document management, workflow engines, and enterprise services through structured API contracts and asynchronous operations.',

      'Implement batch document operations, digital signature workflows, and conditional business actions based on user roles and document status.',

      'Develop advanced Angular Reactive Forms with dynamic validation, conditional fields, complex business rules, and unsaved-change protection.',

      'Build administration modules for role configuration, menu management, dashboard templates, user assignments, and system settings.',

      'Handle complex API request and response transformations, data mapping, error handling, and frontend-backend synchronization.',

      'Collaborate with backend engineers to investigate integration issues, validate API contracts, troubleshoot defects, and improve system reliability.',

      'Contribute to reusable component architecture, maintainable TypeScript code, and consistent user experiences across enterprise modules.',

      'Participate in Agile delivery, debugging, code reviews, Git-based development, and integration testing.'
    ]
  },
  {
    company: 'iHorizons',
    role: 'Frontend Software Engineer',
    period: 'May 2022 — Oct 2025',
    location: 'Doha, Qatar',
    points: [
      'Developed and maintained enterprise web applications for government, media, and regional business clients.',

      'Built scalable Angular applications using TypeScript, reusable components, modular architecture, and responsive design principles.',

      'Integrated RESTful APIs and implemented asynchronous data flows, loading states, validation, and error handling.',

      'Translated business requirements and UI/UX designs into maintainable, production-ready web interfaces.',

      'Improved frontend performance through lazy loading, code optimization, and efficient component rendering.',

      'Worked on server-side rendering (SSR) and search engine optimization (SEO) to improve application discoverability and performance.',

      'Developed responsive user interfaces supporting desktop, tablet, and mobile devices.',

      'Collaborated with backend developers, UI/UX designers, QA engineers, and project stakeholders throughout the software development lifecycle.',

      'Investigated production defects, resolved integration issues, and supported application maintenance and continuous improvements.',

      'Used Git and Agile development practices to deliver features, resolve bugs, and maintain application quality.'
    ]
  },
  {
    company: 'Orange Jordan',
    role: 'Full Stack Developer',
    period: 'Nov 2021 — Apr 2022',
    location: 'Amman, Jordan',
    points: [
      'Contributed to full-stack web application development using Angular, TypeScript, C#, and .NET technologies.',

      'Worked on frontend interfaces and backend integration to deliver functional business applications.',

      'Developed reusable UI components, forms, data-driven screens, and application features.',

      'Worked with REST APIs to exchange data between Angular applications and backend services.',

      'Gained practical experience with relational databases, application data models, and SQL-based operations.',

      'Participated in debugging, testing, maintenance, and troubleshooting across application layers.',

      'Collaborated with development teams to understand requirements, implement features, and resolve technical issues.',

      'Followed software development practices involving source control, application testing, and code maintenance.'
    ]
  }
];


  readonly projects: Project[] = [
    {
      number: '01',
      title: 'Attendly',
      category: 'FEATURED · FULL STACK',
      icon: '◷',
      featured: true,
      description:
        'A modern employee attendance management application with an Angular frontend and ASP.NET Core API.',
      features: [
        'Employee directory',
        'Employee creation',
        'Attendance / timesheet workflow'
      ],
      stack: [
        'Angular',
        'TypeScript',
        'Tailwind CSS',
        'ASP.NET Core',
        'EF Core',
        'SQL Server'
      ]
    },
    {
      number: '02',
      title: 'Government Document Workflow',
      category: 'ENTERPRISE · GOVERNMENT',
      icon: '▤',
      description:
        'A confidentiality-safe overview of production work involving document generation, approvals, and digital signatures.',
      features: [
        'Approval workflows',
        'Role-based actions',
        'Document lifecycle',
        'Digital signatures'
      ],
      stack: [
        'Angular',
        'RxJS',
        'Angular Material',
        'REST APIs',
        'SCSS'
      ]
    },
    {
      number: '03',
      title: 'Enterprise Admin Portal',
      category: 'ENTERPRISE · DASHBOARD',
      icon: '▦',
      description:
        'Administration interfaces for menus, roles, dashboards, settings, and permission-based operations.',
      features: [
        'Menu management',
        'Role configuration',
        'Dashboard templates',
        'Permission-based UI'
      ],
      stack: [
        'Angular',
        'TypeScript',
        'Reactive Forms',
        'SCSS'
      ]
    },
    {
      number: '04',
      title: 'AI Knowledge Assistant',
      category: 'AI · FULL STACK · PLANNED',
      icon: '✧',
      description:
        'A planned AI-powered document assistant using Retrieval-Augmented Generation (RAG), semantic search, and LLM APIs.',
      features: [
        'PDF document processing',
        'Semantic search',
        'AI-powered Q&A',
        'Source citations'
      ],
      stack: [
        'Angular',
        'ASP.NET Core',
        'Python',
        'LLM APIs',
        'Vector Database'
      ]
    },
    {
      number: '05',
      title: 'FlowBoard',
      category: 'FULL STACK · PLANNED',
      icon: '⬡',
      description:
        'A planned collaborative project management platform with Kanban boards, task assignments, and real-time communication.',
      features: [
        'Kanban task management',
        'Drag & drop',
        'Real-time updates',
        'Role-based access'
      ],
      stack: [
        'Angular',
        'ASP.NET Core',
        'SignalR',
        'SQL Server'
      ]
    },
    {
      number: '06',
      title: 'SupportHub',
      category: 'ENTERPRISE · PLANNED',
      icon: '⌘',
      description:
        'A planned IT service management platform for managing support tickets, priorities, service-level agreements, and operational workflows.',
      features: [
        'Ticket management',
        'Priority tracking',
        'SLA monitoring',
        'Support dashboard'
      ],
      stack: [
        'Angular',
        'ASP.NET Core',
        'JWT',
        'SQL Server'
      ]
    }
  ];


readonly skillGroups: SkillGroup[] = [
  {
    title: 'Frontend Engineering',
    icon: '◈',
    items: [
      'Angular',
      'TypeScript',
      'JavaScript',
      'RxJS',
      'Angular Material',
      'Reactive Forms',
      'HTML5',
      'CSS3 / SCSS',
      'Tailwind CSS',
      'Responsive Design',
      'SSR',
      'SEO',
      'Lazy Loading'
    ]
  },
  {
    title: 'Backend & Database',
    icon: '⌘',
    items: [
      'C#',
      'ASP.NET Core',
      '.NET Web API',
      'Entity Framework Core',
      'SQL Server',
      'RESTful APIs',
      'LINQ',
      'Database Migrations',
      'API Integration',
      'Authentication Concepts'
    ]
  },
  {
    title: 'Enterprise Engineering',
    icon: '▣',
    items: [
      'Enterprise Applications',
      'Workflow Automation',
      'Document Management',
      'Digital Signatures',
      'Role-Based Access Control',
      'Business Logic',
      'API Contracts',
      'Error Handling',
      'Reusable Components',
      'Application Debugging'
    ]
  },
  {
    title: 'AI & Generative AI — Learning',
    icon: '✧',
    items: [
      'Python Fundamentals',
      'Generative AI',
      'LLM APIs',
      'Prompt Engineering',
      'RAG Architecture',
      'Embeddings',
      'Vector Databases',
      'Semantic Search',
      'AI API Integration',
      'AI Agents Concepts'
    ]
  },
  {
    title: 'Cloud & DevOps — Learning',
    icon: '☁',
    items: [
      'Azure App Service',
      'Azure Functions',
      'Azure API Management',
      'Application Monitoring',
      'CI/CD Concepts',
      'Cloud Deployment'
    ]
  },
  {
    title: 'Development Tools',
    icon: '⚙',
    items: [
      'Git',
      'GitHub',
      'Azure DevOps',
      'Postman',
      'Visual Studio',
      'VS Code',
      'Agile / Scrum',
      'Code Review',
      'Debugging',
      'Integration Testing'
    ]
  }
];


  private observer?: IntersectionObserver;
  private animationFrame?: number;
  private typingTimer?: ReturnType<typeof setTimeout>;
  private feedbackTimer?: ReturnType<typeof setTimeout>;
  private readonly browser: boolean;
  private reducedMotion = false;
  private scrollHandler = () => this.updateActiveSection();
  private resizeHandler = () => this.resizeCanvas();
  private canvasContext?: CanvasRenderingContext2D | null;
  private points: { x: number; y: number; vx: number; vy: number }[] = [];

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.browser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.browser) return;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.setupReveal();
    this.setupCanvas();
    if (this.reducedMotion) this.typedText = this.roles[0];
    else this.typeRole(0, 0, false);
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
    window.addEventListener('resize', this.resizeHandler, { passive: true });
    this.updateActiveSection();
  }

  private setupReveal(): void {
    this.observer?.disconnect();
    const elements = document.querySelectorAll<HTMLElement>('.reveal');
    if (this.reducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('visible'));
      return;
    }
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          this.observer?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -25px 0px' });
    elements.forEach(el => this.observer?.observe(el));
  }

  private typeRole(roleIndex: number, charIndex: number, deleting: boolean): void {
    const word = this.roles[roleIndex];
    this.typedText = word.slice(0, charIndex);
    let nextIndex = charIndex + (deleting ? -1 : 1);
    let nextDeleting = deleting;
    let nextRole = roleIndex;
    let delay = deleting ? 40 : 85;
    if (!deleting && charIndex >= word.length) { nextDeleting = true; nextIndex = charIndex; delay = 1700; }
    else if (deleting && charIndex <= 0) { nextDeleting = false; nextRole = (roleIndex + 1) % this.roles.length; nextIndex = 0; delay = 350; }
    this.typingTimer = setTimeout(() => this.typeRole(nextRole, nextIndex, nextDeleting), delay);
  }

  private setupCanvas(): void {
    const canvas = this.heroCanvas?.nativeElement;
    if (!canvas || this.reducedMotion) return;
    this.canvasContext = canvas.getContext('2d');
    if (!this.canvasContext) return;
    this.resizeCanvas();
    this.animateCanvas();
  }

  private resizeCanvas(): void {
    const canvas = this.heroCanvas?.nativeElement;
    if (!canvas || !this.canvasContext) return;
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * ratio);
    canvas.height = Math.round(rect.height * ratio);
    this.canvasContext.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.min(65, Math.max(20, Math.floor(rect.width / 24)));
    this.points = Array.from({ length: count }, () => ({
      x: Math.random() * rect.width, y: Math.random() * rect.height,
      vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
    }));
  }

  private animateCanvas = (): void => {
    const canvas = this.heroCanvas?.nativeElement;
    const ctx = this.canvasContext;
    if (!canvas || !ctx) return;
    const width = canvas.getBoundingClientRect().width;
    const height = canvas.getBoundingClientRect().height;
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < this.points.length; i++) {
      const p = this.points[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      ctx.fillStyle = 'rgba(103, 232, 249, .55)';
      ctx.beginPath(); ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2); ctx.fill();
      for (let j = i + 1; j < this.points.length; j++) {
        const q = this.points[j];
        const distance = Math.hypot(p.x - q.x, p.y - q.y);
        if (distance < 125) {
          ctx.strokeStyle = `rgba(89, 194, 255, ${(1 - distance / 125) * 0.13})`;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
    }
    this.animationFrame = window.requestAnimationFrame(this.animateCanvas);
  };

  scrollTo(id: string): void {
    this.menuOpen = false;
    document.getElementById(id)?.scrollIntoView({ behavior: this.reducedMotion ? 'auto' : 'smooth', block: 'start' });
  }

  toggleMenu(): void { this.menuOpen = !this.menuOpen; }

  private updateActiveSection(): void {
    const current = [...this.navItems].reverse().find(item => {
      const el = document.getElementById(item.id);
      return el && el.getBoundingClientRect().top <= 160;
    });
    this.activeSection = current?.id ?? 'home';
  }

  async copyEmail(): Promise<void> {
    if (!this.browser || !navigator.clipboard) {
      window.location.href = `mailto:${this.email}`;
      return;
    }
    try {
      await navigator.clipboard.writeText(this.email);
      this.emailCopied = true;
      if (this.feedbackTimer) clearTimeout(this.feedbackTimer);
      this.feedbackTimer = setTimeout(() => this.emailCopied = false, 2500);
    } catch {
      window.location.href = `mailto:${this.email}`;
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.browser) {
      window.removeEventListener('scroll', this.scrollHandler);
      window.removeEventListener('resize', this.resizeHandler);
      if (this.animationFrame !== undefined) cancelAnimationFrame(this.animationFrame);
    }
    if (this.typingTimer) clearTimeout(this.typingTimer);
    if (this.feedbackTimer) clearTimeout(this.feedbackTimer);
  }
}
