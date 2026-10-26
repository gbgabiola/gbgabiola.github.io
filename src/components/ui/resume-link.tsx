import { profile } from '@/content/profile';
import styles from './button.module.css';

export default function ResumeLink() {
  return (
    <a href={profile.resume.downloadUrl} className={styles.secondary}>
      Download resume
    </a>
  );
}
