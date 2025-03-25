import React from 'react';
import Navbar from './components/Navbar'
// import Manager from './components/Manager'
import Footer from './components/Footer'
import NoteManager from './components/NoteManager';

function App() {
  

  return (
    <>
    <Navbar/>
    <div>
    {/* <Manager/> */}
    <NoteManager/>
    </div>
    <Footer/>
    </>
  )
}

export default App
