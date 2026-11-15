import type { MetadataRoute } from 'next';
import { profile } from '@/content/profile';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} Portfolio`,
    short_name: profile.name,
    start_url: '/',
    display: 'minimal-ui',
    background_color: '#171b21',
    theme_color: '#171b21',
    icons: [{ src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' }],
  };
}
