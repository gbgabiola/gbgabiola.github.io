import Link from 'next/link';

import { pageMetadata } from '../../lib/metadata';

export const metadata = pageMetadata('Contact');

const contacts = [
  ['mailto:gbgabiola@gmail.com', 'gbgabiola@gmail.com'],
  ['https://www.linkedin.com/in/gbgabiola/', 'LinkedIn: gbgabiola'],
  ['https://twitter.com/gbgabiola', 'Twitter: @gbgabiola'],
  ['https://github.com/gbgabiola', 'GitHub: gbgabiola'],
];

export default function ContactPage() {
  return (
    <>
      <h1>Let’s have a chat!</h1>

      <p>Get in touch with me through these contacts:</p>

      <ul className="contacts">
        {contacts.map(([href, label]) => (
          <li key={href}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>

      <p>
        I am available and currently accepting offers for part-time remote positions as a Full Stack Developer. Let me
        know if you’re interested; I will be happy to help!
      </p>

      <p>
        Know more <Link href="/about">about me</Link>.
      </p>

      <p>Thank you,</p>

      <p>
        <strong>Genesis Gabiola — Software Engineer</strong>
      </p>
    </>
  );
}
