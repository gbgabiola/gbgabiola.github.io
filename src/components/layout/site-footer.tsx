import { profile } from '@/content/profile';
import styles from './site-footer.module.css';

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <p>
        {profile.name} · {profile.role}
      </p>
      <ul aria-label="Social links">
        {profile.socialLinks.map(({ label, href }) => (
          <li key={href}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
      <p>
        Built with <a href="https://nextjs.org/">Next.js</a> and{' '}
        <a href="https://react.dev/">React</a>.
      </p>
    </footer>
  );
}
