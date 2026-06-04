import Navbar from './components/Navbar'
import ContentContainer from './components/ContentContainer'

export default function App() {
  return (
    <>
      <Navbar />

      <div className="grid grid-rows-3 grid-cols-1 gap-6 p-6">
        <ContentContainer className=""/>
      </div>
      
    </>
  )
}

