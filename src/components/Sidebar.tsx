import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="p-5 pl-7 pr-7 shadow-lg">
            <ul className="space-y-2">
                <li className="relative pt-1">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `group m-1 flex justify-center rounded p-1 text-center transition ${
                                isActive
                                    ? 'bg-navy text-light-gray'
                                    : 'text-navy'
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
                            `group m-1 flex justify-center rounded p-1 text-center transition ${
                                isActive
                                    ? 'bg-navy text-light-gray'
                                    : 'text-navy'
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
                            `group m-1 flex justify-center rounded p-1 text-center transition ${
                                isActive
                                    ? 'bg-navy text-light-gray'
                                    : 'text-navy'
                            }`
                        }
                    >
                        Blog
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
