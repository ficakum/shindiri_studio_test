import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config"; // Pretpostavljam da si već inicijalizovao Firebase

const Header = () => {
  const navigate = useNavigate();

  // Logout funkcija
  const handleLogout = async () => {
    try {
      // Odjavljivanje sa Firebase-a
      await signOut(auth);
      // Uklanjanje tokena iz localStorage-a
      localStorage.removeItem("token");
      // Preusmeravanje na login stranicu
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <Link to="/characters" style={styles.link}>
          Characters
        </Link>
        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>
      </nav>
    </header>
  );
};

// Stilovi za Header
const styles = {
  header: {
    backgroundColor: "#20232a",
    padding: "1rem",
    color: "#fff",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "800px",
    margin: "0 auto",
  },
  link: {
    color: "#61dafb",
    textDecoration: "none",
    fontSize: "18px",
  },
  logout: {
    background: "transparent",
    border: "1px solid #fff",
    padding: "6px 12px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Header;
