import Image from "next/image"

// layout for car trim
export default function Layout({ children, params }) {
    let { car, trim } = params
    return (
        <div className='mx-auto flex h-screen w-full flex-col gap-2 overflow-y-scroll'>
            <h1 className='text-center text-3xl'>{car === 'IONIQ5' ? 'IONIQ 5' : 'IONIQ 6'}</h1>
            <p className='text-center text-lg'>{trim === 'D100PlatinumEdition' ? 'D100 Platinum Edition' : trim}</p>
            <div className="fade-out-load fixed inset-0 z-50 flex flex-col items-center justify-center gap-2 bg-white">
                <Image
                    src='/logo.png'
                    alt='logo'
                    width={75}
                    height={75}
                    className='mx-auto mt-2'
                />
                <p>Loading</p>
                <div className="flex flex-row gap-2">
                    <div className="size-2 animate-bounce rounded-full bg-[#003068]"></div>
                    <div className="size-2 animate-bounce rounded-full bg-[#003068] [animation-delay:-.3s]"></div>
                    <div className="size-2 animate-bounce rounded-full bg-[#003068] [animation-delay:-.5s]"></div>
                </div>
            </div>
            {children}
        </div>
    )
}