import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import About from './components/pages/About'
import FrontPage from './components/pages/FrontPage'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Blog from './components/pages/Blog'

const router = createBrowserRouter([
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
])

const App = () => {
    return (
        <div className="m-5 flex flex-1">
            <Sidebar />
            <div className="flex w-full justify-center">
                <div className="flex h-screen flex-col">
                    <Header />
                    <RouterProvider router={router} />
                </div>
            </div>
        </div>
    )
}

export default App
