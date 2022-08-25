import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MainLayout from './layout/MainLayout'

function App() {
   return <>
               <Routes>
                    <Route path='/' element={<MainLayout/>} >
                         <Route index element={<HomePage/>} />                     
                    </Route>
               </Routes>
         </>
}

export default App
