import { useState } from 'react'

import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Archive from './components/Archive'
import About from './components/About'
import Footer from './components/Footer'

export default function App() {

  const [page, setPage] = useState('Home');

  function handlePageChange(page: string) {
    setPage(page);
  }

  return (
    <>
      <div className="min-h-screen relative z-10 text-charcoal">
        <Navbar pageChangeCallback={handlePageChange} />

        {page === 'Home' && <Dashboard />}
        {page === 'Archive' && <Archive />}
        {page === 'About' && <About />}

        <Footer />
      </div>
    </>
  )
}

