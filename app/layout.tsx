import Navigation from '@/components/layout/Navigation';
import '../styles/globals.css';
import UserLinks from '@/components/UserLinks.component';
import { baseurl, sitename } from '@/app.config';

// const defaultUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(baseurl),
  title: `${sitename}A simple learning project utilizing supabase and nextjs.`,
  description: 'Learning how to integrate supabase with nextjs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='flex flex-col flex-1 min-h-screen'>
        <Navigation>
          <UserLinks />
        </Navigation>
        {children}
      </body>
    </html>
  );
}
