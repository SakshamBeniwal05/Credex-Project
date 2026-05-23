import type { FC } from 'react'
import { Outlet } from "react-router-dom"

const App: FC = () => {
  return (
    <div className="p-5">
      <div>
        <div
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: `
                                    linear-gradient(to right, #d1d5db 1px, transparent 1px),
                                    linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
                                `,
            backgroundSize: "32px 32px",
          }}
        />
        <Outlet />
      </div>
    </div>
  )
}

export default App