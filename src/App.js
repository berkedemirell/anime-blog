
// import './App.css';

import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom';
import {Home} from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Single } from './pages/Single';
import { Write } from './pages/Write';
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer';
import {Members} from './pages/Members';
import {Profile} from "./pages/Profile";
import './style.scss'


const Layout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    
    </>
    
  );
};


const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children: [
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/post/:id',
        element:<Single/>
      },
      {
        path:'/write',
        element:<Write/>
      },
      {
        path:'/user/:id',
        element:<Profile/>
      },
      {
        path:'/members',
        element:<Members/>
      }
    ]
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/register",
    element:<Register/>
  },

])

function App() {
  return (
    <div className="App">
      <div className='container'>

      <RouterProvider router={router}/>
    </div>
      </div>
  );
}

export default App;
