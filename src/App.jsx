
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/public/Home";
import Blog from "./pages/public/Blog";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/dashboard/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";


function App() {

  return (

    <BrowserRouter>
      <Routes>
        {/*----------------------------------------
      ROUTES PUBLIQUES                         
      -----------------------------------------*/
        }
        <Route path="/" element={<Home />} />

        <Route path="/blog" element={<Blog />} />

        {/*-------------------------------------
  AUTHENTIFICATION
  --------------------------------------
  
*/}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/*
     --------------------------------------------
        ROUTES PROTEGEES
    -------------------------------------------      
    */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />

        </Route>

      </Routes >
    </BrowserRouter >
  )
}

export default App
