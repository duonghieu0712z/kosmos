import { Splash } from '@/views';

export default function App() {
    return (
        <div
            className='h-screen overflow-hidden'
            onContextMenu={(e) => {
                if (import.meta.env.PROD) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }}
        >
            <Splash />
        </div>
    );
}
