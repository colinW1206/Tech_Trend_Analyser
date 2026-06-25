import { useState } from 'react'

import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Archive from './components/Archive'
import About from './components/About'
import Footer from './components/Footer'

export default function App() {

  const [page, setPage] = useState('Home');

  function handlePageChange(page) {
    setPage(page);
  }

  return (
    <div className="min-h-screen bg-slate-400">
      <Navbar pageChangeCallback = {handlePageChange}/>

      {page === 'Home' && <Dashboard />}
      {page === 'Archive' && <Archive />}
      {page === 'About' && <About />}

      <Footer />
    </div>
  )
}

