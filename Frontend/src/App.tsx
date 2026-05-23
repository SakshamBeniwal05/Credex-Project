import type { FC } from 'react'
import { Outlet } from "react-router-dom"
import Navbar from './components/page_component/Major_Component/Navbar'

const App: FC = () => {
  return (
    <div className="p-5">
      <Navbar/>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default App