import { ImageResponse } from '@vercel/og';
import qs from 'qs';

export const config = {
  runtime: 'edge',
};

export default function handler(req) {
  const { searchParams } = new URL(req.url);
  const query = qs.parse(searchParams.toString());

  // Set the image dimensions (classic embed size)
  const width = 1200;
  const height = 630;

  // Define dynamic content or defaults
  const avatarUrl = query.avatar || 'https://i.pravatar.cc/300?u=kabir_demo'; // Default image if missing
  const usernameText = query.username || 'Discord User';
  const quoteText = query.text || 'You should definitely update this dynamic quote in the URL parameters.';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row', // Horizontal layout: avatar | quote
          width: '100%',
          height: '100%',
          backgroundColor: '#313338', // Classic Discord dark background
          padding: '60px 80px',
          fontFamily: 'sans-serif',
          color: '#f2f3f5', // Main text color
        }}
      >
        {/* Author Avatar Column */}
        <div
          style={{
            display: 'flex',
            marginRight: '60px',
          }}
        >
          <img
            src={avatarUrl}
            alt="Author Avatar"
            style={{
              width: '280px', // Extra large avatar like the bot
              height: '280px',
              borderRadius: '50%',
              border: '10px solid #2b2d31', // Subtle inset look
              objectFit: 'cover', // Ensures the image isn't stretched
            }}
          />
        </div>

        {/* Content Column (Author + Quote) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1, // Takes up remaining horizontal space
          }}
        >
          {/* Author Name */}
          <div
            style={{
              fontSize: 50,
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '30px',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            {usernameText}
          </div>

          {/* Quote Text (Always in quotes) */}
          <div
            style={{
              display: 'flex',
              fontSize: 60,
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#dbdee1', // Slightly softer text color
              lineHeight: 1.3,
              // Adding the inverted commas directly in the structure
              position: 'relative', 
            }}
          >
            <span style={{color: '#f2f3f5', marginRight: '10px'}}>"</span>
            <span>{quoteText}</span>
            <span style={{color: '#f2f3f5', marginLeft: '10px'}}>"</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

