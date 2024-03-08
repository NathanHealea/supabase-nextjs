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

  let errors: Array<string> = [];

  const { data: dataProfile, error: errorProfile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session?.user.id);

  if (errorProfile) {
    errors.push(errorProfile.message);
  }

  const { data: dataAvatar, error: errorAvatar } = await supabase.storage
    .from('avatars')
    .download(`${session?.user.id}/public/avatar.png`);

  if (errorAvatar) {
    errors.push(errorAvatar.message);
  }

  if (errors.length > 0) {
    console.error(errors);
    redirect('/404');
  }

  if (dataProfile == null || dataProfile.length != 1) {
    console.log(`ERROR: Profile data was not retrieved. ${dataProfile}`);
  }

  if (dataAvatar == null || dataAvatar.length != 1) {
    console.log(`ERROR: Profile avatar was not retrieved. ${dataAvatar}`);
  }

  let profile = dataProfile[0];
  let avatar = (dataAvatar && new File([dataAvatar], 'avatar.png')) || null;
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
                avatar: avatar,
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
