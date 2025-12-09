import { NavLink } from 'react-router-dom';

const createNavLinkStyle = ({ isActive }) => ({
  color: isActive ? 'blue' : 'black',
});

const Header = () => {
  return (
    <header 
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderBottom: '2px solid #ccc',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
        textDecoration: 'none',
      }}
    >
      <h1>LOGO</h1>
      <nav
        style={{
          display: 'flex',
          gap: '20px',
          marginLeft: '40px',
          flexDirection: 'row',
          fontSize: '18px',
          fontWeight: '500',
          color: '#666',
        }}
      >
        <NavLink
          style={createNavLinkStyle}
          to="/"
        >
          HomePage
        </NavLink>

        <NavLink 
          style={createNavLinkStyle}
          to="/MoviesPage"
        >
          MoviesPage
        </NavLink>

        <NavLink 
          style={createNavLinkStyle}
          to="/MovieDetailsPage"
        >
          MovieDetailsPage
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;