import { FiMenu } from "react-icons/fi";

export default function Navbar() {

    return (
        <nav className="w-full p-4">
            <div className="w-full h-full flex flex-row items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Home</h1>
                <div className="h-full flex flex-row items-center justify-end gap-4">
                    <FiMenu color={"#878787"} size={24} />
                    <button className="text-white">Login</button>
                </div>
            </div>
        </nav>
    )
}