import ProtectedRoute from '@/components/ProtectedRoute.component';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export type DashboardPageProps = {};

const DashboardPage = async (props: DashboardPageProps) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    console.log('Session does not exists');
    redirect('/login');
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id);

  if (error) {
    console.log(error);
    redirect('/404');
  }

  if (data.length != 1) {
    console.error('data was not retrieved');
  }

  const profile = data[0];

  return (
    <main className='flex flex-1 justify-center items-center'>
      <header className='hero '>
        <div className='hero-content flex-col lg:flex-row-reverse gap-x-8'>
          <div className='text-center lg:text-left'>
            <h1 className='text-5xl font-bold'>
              Welcome {profile.display_name || session.user.email}!
            </h1>
            <p className='py-6 leading-7'>
              You have successfully registered and/or logged in to an account on{' '}
              <b>Supabase - NextJS</b>.
            </p>
            <p className='leading-7'>
              Your participation in providing data and testing my learning
              project means a great deal. Thank you for you time and efforts.{' '}
              <span className='text-2xl'>🙇🏼</span>
            </p>
          </div>
          <div className='shrink-0 w-full max-w-sm flex flex-col justify-center gap-4'>
            <div className='card shadow-2xl bg-base-100'>
              <div className='card-body rounded overflow-hidden'>
                <Image
                  src='/purple-llama.jpg'
                  alt='purple llama'
                  className=' rounded-lg'
                  width={1024}
                  height={1024}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    </main>
  );
};

export default DashboardPage;
