import { Html } from "@react-three/drei"

function LoaderScreen() {
    return (
        // style the loader to be full screen and black
        <Html center>
            <img src="/logo.png" alt="Loader" className="w-12 h-12" />
        </Html>
    )
}

export default LoaderScreen