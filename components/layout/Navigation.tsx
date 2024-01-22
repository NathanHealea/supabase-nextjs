import { sitename } from '@/app.config';
import Link from 'next/link';

export type NavigationProps = {
  children?: React.ReactNode;
};

const Navigation = (props: NavigationProps) => {
  const { children } = props;

  return (
    <nav className='navbar'>
      <div className='flex'>
        <Link href='/' className='btn btn-ghost text-xl'>
          {sitename}
        </Link>
      </div>
      <div className='flex-1' />

      {children}
    </nav>
  );
};

export default Navigation;
