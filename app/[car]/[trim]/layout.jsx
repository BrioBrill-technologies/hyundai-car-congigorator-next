// layout for car trim
export default function Layout({ children, params }) {
    let { car, trim } = params
    return (
        <div className='flex flex-col gap-2 mx-auto w-full h-screen overflow-y-scroll'>
            <h1 className='text-3xl text-center'>{car === 'IONIQ5' ? 'IONIQ 5' : 'IONIQ 6'}</h1>
            <p className='text-center text-lg'>{trim === 'D100PlatinumEdition' ? 'D100 Platinum Edition' : trim}</p>
            <div className="fixed inset-0 z-50 flex flex-col gap-2 items-center justify-center bg-white fade-out-load">
                <img src='/logo.png' alt='logo' className='w-2/12 mt-2 mx-auto' />
                <p>Loading</p>
                <div className="flex flex-row gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#003068] animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-[#003068] animate-bounce [animation-delay:-.3s]"></div>
                    <div className="w-2 h-2 rounded-full bg-[#003068] animate-bounce [animation-delay:-.5s]"></div>
                </div>
            </div>
            {children}
        </div>
    )
}