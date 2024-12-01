import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import FrontPage from './components/Pages/FrontPage'
import About from './components/Pages/About'
import Blog from './components/Pages/Blog'
import BlogPost from './components/Pages/BlogPost'

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
    return (
        <div className="max-w-8xl mx-auto grid min-h-screen grid-cols-12 gap-4 px-4 sm:px-6 md:px-8">
            <div className="fixed col-span-2 ml-5 mt-5 h-full">
                <Sidebar />
            </div>
            <div className="col-span-10 col-start-3 flex flex-col items-center">
                <Header />
                <Routes>
                    {router.map(({ path, element }) => (
                        <Route key={path} path={path} element={element} />
                    ))}
                </Routes>
            </div>
        </div>
    )
}

export default App
