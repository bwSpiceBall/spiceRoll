import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import About from './components/Pages/About'
import Blog from './components/Pages/Blog'
import BlogPost from './components/Pages/BlogPost'
import FrontPage from './components/Pages/FrontPage'
import Sidebar from './components/Sidebar'

const router = [
    {
        path: '/',
        element: <FrontPage />,
    },
    {
        path: '/about',
        element: <About />,
    },
    {
        path: '/blog',
        element: <Blog />,
    },
    {
        path: '/blog/:documentId',
        element: <BlogPost />,
    },
]

const App = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Header with hamburger menu */}
            <div className="lg:hidden">
                <Header isMobile={true} toggleMobileMenu={toggleMobileMenu} />
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-white lg:hidden">
                    <div className="flex justify-end p-4">
                        <button 
                            onClick={toggleMobileMenu}
                            className="text-gray-600 focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="px-4">
                        <Sidebar isMobile={true} closeMobileMenu={() => setIsMobileMenuOpen(false)} />
                    </div>
                </div>
            )}

            {/* Desktop Layout */}
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col lg:flex-row">
                    {/* Desktop Sidebar */}
                    <div className="hidden w-64 flex-shrink-0 lg:block">
                        <div className="sticky top-0 h-screen py-6">
                            <Sidebar />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 overflow-hidden">
                        {/* Desktop Header */}
                        <div className="hidden lg:block">
                            <Header />
                        </div>

                        {/* Content */}
                        <main className="max-w-4xl px-4 py-6 sm:px-6 md:px-8">
                            <Routes>
                                {router.map(({ path, element }) => (
                                    <Route key={path} path={path} element={element} />
                                ))}
                            </Routes>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
