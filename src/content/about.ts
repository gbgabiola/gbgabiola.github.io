export type Experience = {
  company: string;
  info: string;
  description: string;
};

type SkillGroup = { title: string; items: string[] };

export const experiences: Experience[] = [
  {
    company:
      'Samsung Electronic Philippines Corporation - Server System Design (CL2-2)',
    info: 'February 2025 - Present (Hybrid - Taguig City, Philippines)',
    description:
      'Built shared npm packages so frontend teams could use common tooling. Automated Kubernetes deployments with GitHub Actions and Azure workflows, and documented and tested backend APIs with Swagger and automated tests.',
  },
  {
    company: 'Vertere Global Solutions, Inc. - Programmer Analyst II',
    info: 'January 2024 - February 2025 (Hybrid - Makati City, Philippines)',
    description:
      'Updated frontend and backend systems for policy processing and other digital workflows used by financial agents. The work included improving application performance.',
  },
  {
    company: 'Freelance Full Stack Developer',
    info: 'Present (Remote / Part-time)',
    description:
      'Build web applications part-time, from the user interface through the backend.',
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend development',
    items: [
      'JavaScript',
      'React',
      'HTML and CSS',
      'Responsive web design',
      'Sass',
      'Emotion and Styled Components',
    ],
  },
  {
    title: 'Backend and integration',
    items: [
      'Node.js',
      'API documentation with Swagger',
      'npm package development',
    ],
  },
  {
    title: 'Delivery and collaboration',
    items: [
      'Git and GitHub',
      'GitHub Actions',
      'Azure deployment workflows',
      'Kubernetes',
    ],
  },
  {
    title: 'Testing and application state',
    items: [
      'Jest',
      'React Testing Library',
      'Redux',
      'React Context and Hooks',
    ],
  },
];

export const interests = [
  'Reading technical documentation and exploring new development tools.',
  'Sharing technical knowledge with learners and career shifters.',
  'Exploring opportunities to contribute to open source and collaborate with other developers.',
  'Traveling and finding inspiration beyond the screen.',
];
