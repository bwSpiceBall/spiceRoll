import { FaHome, FaLaptopCode, FaNewspaper } from 'react-icons/fa'

const Sidebar = () => {
    return (
        <nav className="flex flex-col justify-start rounded-lg bg-light-gray p-5 shadow-lg">
            <ul className="space-y-2">
                <li className="relative pt-1">
                    <a
                        href="/"
                        className="group m-1 flex justify-center rounded p-1 text-center transition hover:bg-green hover:text-light-gray"
                    >
                        <FaHome />
                        <span className="absolute left-12 top-0 m-2 flex h-9 w-32 origin-left scale-0 flex-col justify-center rounded bg-navy p-2 text-gray-300 shadow-md transition-all duration-100 group-hover:scale-100">
                            Home
                        </span>
                    </a>
                </li>
                <li className="relative pt-1">
                    <a
                        href="about"
                        className="group m-1 flex justify-center rounded p-1 text-center transition hover:bg-green hover:text-light-gray"
                    >
                        <FaLaptopCode />
                        <span className="absolute left-12 top-0 m-2 flex h-9 w-32 origin-left scale-0 flex-col justify-center rounded bg-navy p-2 text-gray-300 shadow-md transition-all duration-100 group-hover:scale-100">
                            About Me
                        </span>
                    </a>
                </li>
                <li className="relative pt-1">
                    <a
                        href="blog"
                        className="group m-1 flex justify-center rounded p-1 text-center transition hover:bg-green hover:text-light-gray"
                    >
                        <FaNewspaper />
                        <span className="absolute left-12 top-0 m-2 flex h-9 w-32 origin-left scale-0 flex-col justify-center rounded bg-navy p-2 text-gray-300 shadow-md transition-all duration-100 group-hover:scale-100">
                            Blog
                        </span>
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
