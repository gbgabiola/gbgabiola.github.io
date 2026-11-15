import { site } from '@/config/site';
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
        {`Portfolio v${site.version}`}
      </p>
    </footer>
  );
}
