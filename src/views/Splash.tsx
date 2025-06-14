import logo from '@/assets/images/logo.png';

export default function Main() {
    return (
        <div className='flex h-full flex-col items-center justify-center'>
            <img src={logo} alt='logo' className='size-42 rounded-4xl bg-zinc-200' />
            <div className='mt-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text font-[calligraphy] text-4xl font-bold text-transparent'>
                {__APP_NAME__}
            </div>
            <div className='text-[10px]'>v{__APP_VERSION__}</div>
        </div>
    );
}
