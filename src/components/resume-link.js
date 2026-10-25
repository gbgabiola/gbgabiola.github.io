import { profile } from '../data/profile';

export default function ResumeLink() {
  return (
    <a href={profile.resume.downloadUrl} className="button">
      Download resume
    </a>
  );
}
