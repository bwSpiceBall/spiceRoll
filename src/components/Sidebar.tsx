import { FaHome, FaLaptopCode, FaNewspaper } from 'react-icons/fa'

const Sidebar = () => {
    return (
        <nav className="flex flex-col justify-start rounded-lg bg-light-gray p-5 shadow-lg">
            <ul className="space-y-2">
                <li className="pt-1">
                    <a
                        href="/"
                        className="m-1 flex justify-center rounded p-1 transition hover:bg-green hover:text-light-gray"
                    >
                        <FaHome />
                    </a>
                </li>
                <li className="pt-1">
                    <a
                        href="about"
                        className="m-1 flex justify-center rounded p-1 text-center transition hover:bg-green hover:text-light-gray"
                    >
                        <FaLaptopCode />
                    </a>
                </li>
                <li className="pt-1">
                    <a
                        href="blog"
                        className="m-1 flex justify-center rounded p-1 text-center transition hover:bg-green hover:text-light-gray"
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
