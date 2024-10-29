import React from 'react';
import Header from './components/Header';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import About from './About';

import './index.css';
import FrontPage from './FrontPage';
import Sidebar from './components/Sidebar';


const router = createBrowserRouter([
  {
    path: "/",
    element: <FrontPage />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

const App: React.FC = () => {
  return (
   
     
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
        <RouterProvider router={router} />
        </div>
      </div>
    
  );
};

export default App;
