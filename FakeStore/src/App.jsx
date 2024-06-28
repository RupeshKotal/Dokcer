import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import * as bootstrap from "bootstrap";
import { Fakestore } from './components/Fakestore'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Fakestore></Fakestore>
    </>
  )
}

export default App
