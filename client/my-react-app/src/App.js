import SignupForm from './SignUpForm'
import Navbar from './navbar/Navbar'
import Footer from './footer/Footer'
import LoginForm from './LogInForm'
import './App.css'

function App() {
  return (
    <div className="main">
      < LogInForm />
      < SignUpForm />
      < Navbar />
      < Footer />
    </div>
  )
}

export default App;