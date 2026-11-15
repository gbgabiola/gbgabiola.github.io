import { ImageResponse } from 'next/og';
import { profile } from '@/content/profile';

export const alt = `${profile.nickname} · ${profile.role} portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 22,
      padding: 80,
      width: '100%',
      height: '100%',
      backgroundColor: '#171b21',
      color: '#f3f5f7',
    }}>
      <div style={{ display: 'flex', color: '#5fe2d1', fontSize: 72 }}>
        {profile.nickname}
      </div>
      <div style={{ display: 'flex', fontSize: 66 }}>{profile.role}</div>
      <div style={{ display: 'flex', color: '#b1bbc8', fontSize: 34 }}>
        {profile.specialization}
      </div>
    </div>,
    size,
  );
}
