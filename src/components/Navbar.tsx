import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="nav-item">Home</Link>
      {user ? (
        <>
          <Link to="/buy" className="nav-item">Buy</Link>
          <Link to="/rewards" className="nav-item">Rewards</Link>
          <Link to="/learn" className="nav-item">Learn</Link>
          <Link to="/ads" className="nav-item">Earn</Link>
          <Link to="/profile" className="nav-item">Profile</Link>
        </>
      ) : (
        <Link to="/profile" className="nav-item">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
