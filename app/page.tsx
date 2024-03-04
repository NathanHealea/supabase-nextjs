import Link from 'next/link';

const Index = () => {
  return (
    <main className='flex flex-1 justify-center items-center'>
      <header className='hero min-h-screen bg-base-200'>
        <div className='hero-content text-center'>
          <div className='max-w-md'>
            <h1 className='text-5xl font-bold'>Hello there</h1>
            <p className='py-6'>
              Welcome to <b>Supabase - NextJS</b> a simple learning project
              utilizing{' '}
              <Link
                href='https://supabase.com/'
                target='__blank'
                className='underline underline-offset-4 decoration-primary'
              >
                Supabase
              </Link>{' '}
              &amp;{' '}
              <Link
                href='https://nextjs.org/'
                target='__blank'
                className='underline underline-offset-4 decoration-primary'
              >
                NextJS
              </Link>
            </p>
            <div className='flex flex-col justify-center items-center xl:flex-row gap-4'>
              <Link
                href='/register'
                className='btn btn-primary btn-outline w-full xl:w-1/2'
              >
                Register
              </Link>
              <Link href='/login' className='btn btn-primary w-full xl:w-1/2'>
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>
    </main>
  );
};

export default Index;
