// layout for car trim
export default function Layout({ children, params }) {
    let { car, trim } = params
    return (
        <div className='flex flex-col gap-2 mx-auto w-full h-screen overflow-y-scroll'>
            <h1 className='text-3xl text-center'>{car === 'IONIQ5' ? 'IONIQ 5' : 'IONIQ 6'}</h1>
            <p className='text-center text-lg'>{trim}</p>
            {children}
        </div>
    )
}