import logo from '@/assets/images/logo.png';

export default function SplashScreen() {
    return (
        <div
            className='flex h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100'
            onContextMenu={(e) => {
                if (import.meta.env.PROD) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }}
        >
            <img src={logo} alt='logo' className='size-42 rounded-4xl' />

            <div className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text font-[calligraphy] text-4xl font-bold text-transparent'>
                {__APP_NAME__}
            </div>

            <div className='relative flex size-20 items-center justify-center perspective-midrange'>
                <div className='animate-rotate1 absolute size-full rounded-full border-b-4 border-[#5c5edc]' />
                <div className='animate-rotate2 absolute size-full rounded-full border-r-4 border-[#9147ff]' />
                <div className='animate-rotate3 absolute size-full rounded-full border-t-4 border-[#3b82f6]' />
            </div>
        </div>
    );
}
