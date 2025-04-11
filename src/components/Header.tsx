import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { auth } from "../firebase/config";
import { ROUTES } from "constants/routes";
import { ACCESS_TOKEN_KEY } from "constants/auth";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      navigate(`/${ROUTES.LOGIN}`);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#20232a" }}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          maxWidth: 800,
          width: "100%",
          mx: "auto",
        }}>
        <Typography
          variant="h6"
          component={Link}
          to={`/${ROUTES.CHARACTERS}`}
          sx={{
            textDecoration: "none",
            color: "#61dafb",
            fontWeight: "bold",
            fontSize: "1.25rem",
          }}>
          Characters
        </Typography>
        <Box>
          <Button
            variant="outlined"
            onClick={handleLogout}
            sx={{
              color: "#fff",
              borderColor: "#fff",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
