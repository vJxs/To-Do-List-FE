import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import AddTask from './components/AddTask'
import ViewAllTask from './components/ViewAllTask'
import UpdateTask from './components/UpdateTask'
import Login from './components/Login'
import NavBar from './components/NavBar'
// import ViewPrivateTask from './components/Private'

function App() {
  return (
    <>
      <NavBar />
      <h1 className='text-teal-300 bg-violet-100 text-center text-6xl'>Welcome to your Tasks</h1>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/viewAll' element={<ViewAllTask />} />
        <Route path='/view' />
        <Route path='/add' element={<AddTask />} />
        <Route path='/update/:id' element={<UpdateTask />} />
        {/* <Route path='/private' element={<ViewPrivateTask />} /> */}
      </Routes>
    </>
  )
}

export default App
