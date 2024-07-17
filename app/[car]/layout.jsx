import Image from "next/image"

// layout for car trim
export default function Layout({ children, params }) {
    let { car } = params
    return (
        <div className='mx-auto flex size-full flex-col gap-2 overflow-y-scroll'>
            <div className="fade-out-trim-load fixed inset-0 z-50 flex flex-col items-center justify-center gap-2 bg-white">
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