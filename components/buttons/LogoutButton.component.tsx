'use client';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export type LogoutButtonProps = {};

const LogoutButton = (props: LogoutButtonProps) => {
  const router = useRouter();
  const handleLogoutClick = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <button type='button' onClick={handleLogoutClick} className='btn btn-ghost'>
      Logout
    </button>
  );
};

export default LogoutButton;
