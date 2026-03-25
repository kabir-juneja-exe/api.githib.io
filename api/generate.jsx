import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default function handler(req) {
  try {
    const { searchParams } = new URL(req.url);

    // Get parameters from the URL
    const username = searchParams.get('username') || 'Discord User';
    const text = searchParams.get('text') || 'Quote goes here...';
    const avatar = searchParams.get('avatar') || 'https://cdn.discordapp.com/embed/avatars/0.png';

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#313338', // Discord Dark Mode BG
            padding: '40px 60px',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Avatar Section */}
          <div style={{ display: 'flex', marginRight: '40px' }}>
            <img
              src={avatar}
              alt="avatar"
              style={{
                width: '250px',
                height: '250px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Content Section */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            {/* Username */}
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '15px',
              }}
            >
              {username}
            </div>

            {/* Quote with Inverted Commas */}
            <div
              style={{
                display: 'flex',
                fontSize: '55px',
                color: '#dbdee1',
                fontStyle: 'italic',
                lineHeight: '1.2',
              }}
            >
              <span style={{ color: '#ffffff', marginRight: '8px' }}>"</span>
              {text}
              <span style={{ color: '#ffffff', marginLeft: '8px' }}>"</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
