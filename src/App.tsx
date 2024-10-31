import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import About from './About'
import FrontPage from './FrontPage'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Blog from './components/Blog'

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
        <div className="flex flex-1 m-5">
            <Sidebar />
            <div className="flex justify-center w-full">
                <div className="flex flex-col h-screen">
                    <Header />
                    <RouterProvider router={router} />
                </div>
            </div>
        </div>
    )
}

export default App
