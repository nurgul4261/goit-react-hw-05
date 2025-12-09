import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderBottom: '2px solid #ccc',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
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
          style={({ isActive }) => ({
            color: isActive ? 'blue' : 'black',
          })}
          to="/"
        >
          HomePage
        </NavLink>

        <NavLink 
          style={({ isActive }) => ({
            color: isActive ? 'blue' : 'black',
          })}
          to="/MoviesPage"
        >
          MoviesPage
        </NavLink>

        <NavLink 
          style={({ isActive }) => ({
            color: isActive ? 'blue' : 'black',
          })}
          to="/MovieDetailsPage"
        >
          MovieDetailsPage
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;