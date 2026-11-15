type Profile = {
  nickname: string;
  role: string;
  specialization: string;
  location: string;
  summary: string;
  availability: string;
  email: string;
  resume: { viewUrl: `https://${string}`; downloadUrl: `https://${string}` };
  socialLinks: {
    platform: 'linkedin' | 'twitter' | 'github';
    label: string;
    username: string;
    href: `https://${string}`;
  }[];
};

export const profile = {
  nickname: 'G',
  role: 'Software Engineer',
  specialization: 'Full Stack Developer',
  location: 'San Fernando, Pampanga, Philippines',
  summary:
    'I build web applications that connect thoughtful user experiences with reliable backend systems.',
  availability:
    'I’m open to part-time remote work and web projects.',
  email: 'gbgabiola@gmail.com',
  resume: {
    viewUrl:
      'https://drive.google.com/file/d/1hTHzS47SGcKx9G50nIK1U4YjYjQBdCYf/view',
    downloadUrl:
      'https://drive.google.com/uc?export=download&id=1hTHzS47SGcKx9G50nIK1U4YjYjQBdCYf',
  },
  socialLinks: [
    {
      platform: 'linkedin',
      label: 'LinkedIn',
      username: 'gbgabiola',
      href: 'https://www.linkedin.com/in/gbgabiola/',
    },
    {
      platform: 'twitter',
      label: 'Twitter',
      username: '@gbgabiola',
      href: 'https://twitter.com/gbgabiola',
    },
    {
      platform: 'github',
      label: 'GitHub',
      username: 'gbgabiola',
      href: 'https://github.com/gbgabiola',
    },
  ],
} satisfies Profile;
