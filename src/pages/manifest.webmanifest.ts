export function GET() {
  return new Response(
    JSON.stringify({
      name: 'G Portfolio',
      short_name: 'G',
      start_url: '/',
      display: 'minimal-ui',
      background_color: '#171b21',
      theme_color: '#171b21',
      icons: [{ src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' }],
    }),
  );
}
