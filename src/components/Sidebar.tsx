import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <nav className="flex justify-start rounded-lg bg-light-gray p-5 shadow-lg">
            <ul className="space-y-2">
                <li className="relative pt-1">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `group m-1 flex justify-center rounded p-1 text-center transition hover:bg-navy hover:text-light-gray ${
                                isActive ? 'bg-navy text-light-gray' : ''
                            }`
                        }
                    >
                        Home
                    </NavLink>
                </li>
                <li className="relative pt-1">
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            `group m-1 flex justify-center rounded p-1 text-center transition hover:bg-navy hover:text-light-gray ${
                                isActive ? 'bg-navy text-light-gray' : ''
                            }`
                        }
                    >
                        About Me
                    </NavLink>
                </li>
                <li className="relative pt-1">
                    <NavLink
                        to="/blog"
                        className={({ isActive }) =>
                            `group m-1 flex justify-center rounded p-1 text-center transition hover:bg-navy hover:text-light-gray ${
                                isActive ? 'bg-navy text-light-gray' : ''
                            }`
                        }
                    >
                        Blog
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Sidebar
