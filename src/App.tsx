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
        <div className="ml-5 mt-5 flex flex-1">
            <Sidebar />
            <div className="flex w-full justify-center">
                <div className="flex h-screen flex-col">
                    <Header />
                    <Routes>
                        {router.map(({ path, element }) => (
                            <Route key={path} path={path} element={element} />
                        ))}
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default App
