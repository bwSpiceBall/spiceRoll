import { FC } from 'react';

interface HeaderProps {
    isMobile?: boolean;
    toggleMobileMenu?: () => void;
}

const Header: FC<HeaderProps> = ({ isMobile = false, toggleMobileMenu }) => {
    return (
        <header className="border-b border-dark-400 py-4">
            <div className="flex items-center justify-between">
                {isMobile ? (
                    <>
                        <h1 className="text-2xl font-bold text-primary">Spice Roll</h1>
                        <button 
                            onClick={toggleMobileMenu}
                            className="text-light focus:outline-none hover:text-primary transition-colors"
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
                    <div className="flex w-full items-center justify-start pl-4">
                        <h1 className="text-3xl font-bold text-primary">
                            Spice Roll
                        </h1>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header
