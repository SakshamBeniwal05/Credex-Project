import { Outlet } from "react-router-dom"

const App = () => {
  return (
    <div className="p-5">
      <div id="Navbar" className="text-4xl font-medium">Logo</div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default App