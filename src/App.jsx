import { useState } from 'react'
import Authenticate from './components/Authenticate'
import SignUpForm from './components/SignUpForm'
import './App.css'

//Added CSS Styling
export default function App() {
  const [token, setToken] = useState(null);
  return (
    <div className="container">
      <div className="card">
      <SignUpForm token={token} setToken={setToken} />
      </div>

      <div className="card">
      <Authenticate token={token} setToken={setToken} />
      </div>
    </div>
  );
}
