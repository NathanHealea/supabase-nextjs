import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import ProfileForm from './components/ProfileForm';
import { redirect } from 'next/navigation';

export interface ProfilePageProps {}

const ProfilePage = async (props: ProfilePageProps) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    console.error('Session was not found');
    redirect('/login');
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session?.user.id);

  if (error) {
    console.error(error);
    redirect('/404');
  }

  if (data.length != 1) {
    console.log(`ERROR: data was not retrieved. ${data.length}`);
  }

  const profile = data[0];

  return (
    <main className='flex flex-col flex-1 gap-8 items-center'>
      <header className='hero py-16'>
        <div className='hero-content text-center'>
          <div className='max-w-md'>
            <h1 className='text-5xl font-bold'>Edit Profile</h1>
          </div>
        </div>
      </header>

      <section className='flex  justify-center  w-full'>
        <div className='card w-full max-w-lg shadow-2xl bg-base-100'>
          <div className='card-body'>
            <ProfileForm
              initialData={{
                displayName: profile.display_name,
                firstName: profile.first_name,
                lastName: profile.last_name,
                dateOfBirth: profile.date_of_birth,
              }}
              userId={session.user.id}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
