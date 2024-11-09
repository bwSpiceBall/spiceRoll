import { Route, Routes } from 'react-router-dom'

import About from './components/pages/About'
import FrontPage from './components/pages/FrontPage'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Blog from './components/pages/Blog'
import BlogPost from './components/pages/BlogPost'

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
        path: '/blog/:blogId',
        element: <BlogPost />,
    },
]

const App = () => {
    return (
        <div className="m-5 flex flex-1">
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
