import React from 'react';
import Navbar from './components/Navbar'
// import Manager from './components/Manager'
import Footer from './components/Footer'
import NoteManager from './components/NoteManager';
import Navbar2 from './components/Navbar2';

function App() {
  

  return (
    <>
    {/* <Navbar/> */}
    <Navbar2/>
    <div>
    {/* <Manager/> */}
    <NoteManager/>
    </div>
    <Footer/>
    </>
  )
}

export default App
