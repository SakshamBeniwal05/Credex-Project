import type { FC } from 'react'
import { Outlet } from "react-router-dom"

const App: FC = () => {
  return (
    <div className="p-5">
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default App