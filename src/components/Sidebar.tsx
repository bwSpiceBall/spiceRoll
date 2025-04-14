import { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
    isMobile?: boolean;
    closeMobileMenu?: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isMobile = false, closeMobileMenu }) => {
    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'About Me', href: '/about' },
        { name: 'Blog', href: '/blog' }
    ]

    const handleNavClick = () => {
        if (isMobile && closeMobileMenu) {
            closeMobileMenu()
        }
    }

    return (
        <nav 
            className={`${
                isMobile
                    ? 'py-4'
                    : 'p-5 border-r border-dark-400 shadow-md'
            }`}
            role="navigation"
        >
            <ul className={`space-y-4 ${isMobile ? 'text-lg' : ''}`}>
                {navigation.map((item) => (
                    <li key={item.name}>
                        <NavLink
                            to={item.href}
                            onClick={handleNavClick}
                            className={({ isActive }) =>
                                `block py-2 px-4 rounded-md transition-colors ${
                                    isActive
                                        ? 'text-primary font-medium bg-dark-200'
                                        : 'text-light-100 hover:text-primary hover:bg-dark-200'
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Sidebar
