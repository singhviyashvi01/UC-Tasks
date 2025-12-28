import React from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import { Route, Routes } from 'react-router-dom'
import Landing from './components/Landing'
import Feed from './components/Feed'
import Discover from './components/Discover'
import Profile from './components/Profile'
import ProtectedRoute from './components/ProtectedRoute'






const App = () => {


  return (
    <div className='h-screen w-screen flex items-center justify-center wave-bg wave'>
<Routes>
  <Route path='/' element={<Landing/>}/>
  <Route path='/signup' element={<Signup/>}/> 
  <Route path='/login' element={<Login/>}/>
  <Route path="/feed" element={
    <ProtectedRoute>
      <Feed/>
    </ProtectedRoute>
  }
/>
<Route
  path="/discover"
  element={
    <ProtectedRoute>
      <Discover/>
    </ProtectedRoute>
  }
/>
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile/>
    </ProtectedRoute>
  }
/>
</Routes>








  



    
      </div>
  )
}

export default App