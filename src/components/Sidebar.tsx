import { FaHome, FaLaptopCode, FaNewspaper } from 'react-icons/fa'

const Sidebar = () => {
    return (
        <nav className="flex flex-col justify-start p-5 rounded-lg bg-light-gray shadow-lg">
            <ul className="space-y-2">
                <li className="pt-1">
                    <a
                        href="/"
                        className="flex justify-center hover:bg-green hover:text-light-gray transition rounded m-1 p-1"
                    >
                        <FaHome />
                    </a>
                </li>
                <li className="pt-1">
                    <a
                        href="about"
                        className="flex justify-center hover:bg-green hover:text-light-gray transition rounded m-1 p-1  text-center"
                    >
                        <FaLaptopCode />
                    </a>
                </li>
                <li className="pt-1">
                    <a
                        href="blog"
                        className="flex justify-center hover:bg-green hover:text-light-gray transition rounded m-1 p-1 text-center"
                    >
                        <FaNewspaper />
                    </a>
                </li>
                {/* <li className="pt-1">
                    <a
                        href="contact"
                        className="block hover:bg-green hover:text-light-gray transition rounded m-1 p-1  text-center"
                    >
                        Projects?
                    </a>
                </li> */}
            </ul>
        </nav>
    )
}

export default Sidebar
