import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import RegisterButton from './buttons/RegisterButton.component';
import LoginButton from './buttons/LoginButton.component';
import LogoutButton from './buttons/LogoutButton.component';

export type UserLinksProps = {};

const UserLinks = async (props: UserLinksProps) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return <LogoutButton />;
  }

  return (
    <>
      <RegisterButton />
      <LoginButton />
    </>
  );
};

export default UserLinks;
