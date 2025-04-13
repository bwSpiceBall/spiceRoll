import { FC } from 'react'
import { NavLink } from 'react-router-dom'

interface SidebarProps {
    isMobile?: boolean;
    closeMobileMenu?: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isMobile = false, closeMobileMenu }) => {
    // Navigation items array to keep code DRY
    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About Me' },
        { path: '/blog', label: 'Blog' }
    ];
    
    const handleClick = () => {
        if (isMobile && closeMobileMenu) {
            closeMobileMenu();
        }
    };

    return (
        <nav className={`${isMobile ? 'py-4' : 'p-5 shadow-lg rounded-lg bg-white'}`}>
            <ul className={`space-y-3 ${isMobile ? 'text-lg' : ''}`}>
                {navItems.map(item => (
                    <li key={item.path} className="relative">
                        <NavLink
                            to={item.path}
                            onClick={handleClick}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-2.5 rounded-md transition-all duration-200 ${
                                    isActive
                                        ? 'bg-navy text-white font-medium'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Sidebar
