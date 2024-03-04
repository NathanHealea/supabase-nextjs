import Navigation from '@/components/layout/Navigation';
import '../styles/globals.css';
import UserLinks from '@/components/UserLinks.component';
import { baseurl, sitename } from '@/app.config';
import { ToastContextProvider } from '@/contexts/toastContext/toastContext';
import { ReactNode } from 'react';

// const defaultUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(baseurl),
  title: `${sitename}A simple learning project utilizing supabase and nextjs.`,
  description: 'Learning how to integrate supabase with nextjs',
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props;
  return (
    <html lang='en'>
      <body className='flex flex-col flex-1 min-h-screen'>
        <ToastContextProvider>
          <Navigation>
            <UserLinks />
          </Navigation>
          {children}
        </ToastContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
