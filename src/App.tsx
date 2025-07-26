import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Buy from './pages/Buy';
import Rewards from './pages/Rewards';
import Learn from './pages/Learn';
import Profile from './pages/Profile';
import Ads from './pages/Ads';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router basename="/oink-v2">
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/ads" element={<Ads />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
