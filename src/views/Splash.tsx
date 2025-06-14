import logo from '@/assets/images/logo.png';

export default function Main() {
    return (
        <div className='flex h-full flex-col items-center justify-center'>
            <img src={logo} alt='logo' className='size-42 rounded-4xl bg-zinc-200' />
            <div className='mt-2 font-[calligraphy] text-4xl font-bold'>{__APP_NAME__}</div>
            <div className='text-[10px]'>v{__APP_VERSION__}</div>
        </div>
    );
}
