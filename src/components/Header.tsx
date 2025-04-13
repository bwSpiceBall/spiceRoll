import { FC } from 'react'

interface HeaderProps {
    isMobile?: boolean;
    toggleMobileMenu?: () => void;
}

const Header: FC<HeaderProps> = ({ isMobile = false, toggleMobileMenu }) => {
    return (
        <header className="border-b border-gray-200 py-4">
            <div className="flex items-center justify-between">
                {isMobile ? (
                    <>
                        <h1 className="text-2xl font-bold text-navy">Spice Roll</h1>
                        <button 
                            onClick={toggleMobileMenu}
                            className="text-gray-600 focus:outline-none"
                            aria-label="Open menu"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </>
                ) : (
                    <h1 className="w-full text-center text-3xl font-bold text-navy">
                        Spice Roll
                    </h1>
                )}
            </div>
        </header>
    )
}

export default Header
