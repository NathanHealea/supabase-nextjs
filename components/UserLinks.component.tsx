import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import RegisterButton from './buttons/RegisterButton.component';
import LoginButton from './buttons/LoginButton.component';
import LogoutButton from './buttons/LogoutButton.component';
import Link from 'next/link';

export type UserLinksProps = {};

const UserLinks = async (props: UserLinksProps) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return (
      <div className='flex flex-row gap-4'>
        <Link href='/dashboard' className='btn btn-ghost'>
          Dashboard
        </Link>
        <Link href='/profile' className='btn btn-ghost'>
          Profile
        </Link>
        <LogoutButton />
      </div>
    );
  }

  return (
    <div className='flex flex-row gap-4'>
      <RegisterButton />
      <LoginButton />
    </div>
  );
};

export default UserLinks;
