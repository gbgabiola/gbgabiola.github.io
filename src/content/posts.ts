export const blogTags = {
  cloudflare: 'Cloudflare',
  'command-line': 'Command line',
  deployment: 'Deployment',
  git: 'Git',
  github: 'GitHub',
  nestjs: 'NestJS',
  networking: 'Networking',
  nextjs: 'Next.js',
  payments: 'Payments',
  windows: 'Windows',
} as const;

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: readonly (keyof typeof blogTags)[];
};

export const posts: readonly Post[] = [
  {
    slug: 'ensuring-persistent-ssh-agent-windows-git-bash',
    title: "Ensuring Persistent SSH-Agent on Windows with Git Bash",
    date: '2026-10-10',
    summary: "Set up Git Bash to start an SSH agent and load your key for Git operations on Windows.",
    tags: ['git', 'windows'],
  },
  {
    slug: 'fix-github-deployments-showing-github-pages-inactive',
    title: "Fix: GitHub Deployments Showing \"github-pages inactive\"",
    date: '2026-10-17',
    summary: "Switch GitHub Pages to the Actions deployment source and trigger a fresh deployment.",
    tags: ['github', 'deployment'],
  },
  {
    slug: 'how-to-merge-one-git-repository-into-another-with-full-commit-history',
    title: "How to Merge One Git Repository Into Another (With Full Commit History)",
    date: '2026-10-24',
    summary: "Compare git-filter-repo and Git subtree for combining repositories while preserving their commits.",
    tags: ['git'],
  },
  {
    slug: 'how-to-connect-to-paymongo-in-a-nestjs-and-nextjs-monorepo',
    title: "How to Connect PayMongo in a NestJS and Next.js Monorepo",
    date: '2026-10-31',
    summary: "Connect a Next.js checkout to a NestJS backend that creates PayMongo payment intents and handles webhooks.",
    tags: ['nextjs', 'nestjs', 'payments'],
  },
  {
    slug: 'saying-goodbye-to-port-forwarding-an-introduction-to-cloudflare-tunnel',
    title: "Saying Goodbye to Port Forwarding: An Introduction to Cloudflare Tunnel",
    date: '2026-11-07',
    summary: "Learn how Cloudflare Tunnel exposes a local service and when to choose a quick or named tunnel.",
    tags: ['cloudflare', 'networking', 'deployment'],
  },
  {
    slug: 'how-to-force-kill-any-process-running-on-a-specific-port',
    title: "How to Force Kill Any Process Running on a Specific Port",
    date: '2026-11-14',
    summary: "Find the process using a port and stop it, with a graceful shutdown step before using SIGKILL.",
    tags: ['command-line'],
  },
  {
    slug: 'building-a-system-aware-theme-switch-in-nextjs',
    title: 'Building a System-Aware Theme Switch in Next.js',
    date: '2026-11-21',
    summary: 'Build a sun and moon theme switch with next-themes, system defaults, saved choices, and accessible styling.',
    tags: ['nextjs'],
  },
  {
    slug: 'managing-dotfiles-for-ubuntu-and-wsl',
    title: 'Managing Dotfiles for Ubuntu and WSL',
    date: '2026-11-28',
    summary: 'Set up shared shell and Git configuration with symlinks, local overrides, backups, and a restore workflow.',
    tags: ['command-line', 'git', 'windows'],
  },
];

const dateFormatter = new Intl.DateTimeFormat('en', {
  dateStyle: 'long',
  timeZone: 'UTC',
});

export function formatPostDate(date: string) {
  return dateFormatter.format(new Date(date));
}
