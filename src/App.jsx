import { NavLink, Outlet } from "react-router";

function App() {
  const navStyle = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "normal",
    fontSize: "20px",
    color: "#000",
    textDecoration: "none",
    margin: "0 10px",
  });
  return (
    <div className="main">
      <nav className="navbar">
        <NavLink to="/" style={navStyle}>
          Cube Lab
        </NavLink>
        <NavLink to="/gravity-cube" style={navStyle}>
          Gravity Cube
        </NavLink>

        <NavLink to="/camera-views" style={navStyle}>
          Types of Views
        </NavLink>
        <NavLink to="/eid-wish" style={navStyle}>
          Eid Wishing
        </NavLink>
      </nav>

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
