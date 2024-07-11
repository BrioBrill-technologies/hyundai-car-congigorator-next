import { Html } from "@react-three/drei"

function LoaderScreen() {
    return (
        // style the loader to be full screen and black
        <Html center>
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
                <img src="/logo.png" alt="Loader" className="w-12 h-12" />
            </div>
        </Html>
    )
}

export default LoaderScreen