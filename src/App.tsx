import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import Characters from "./pages/Characters";
import CharacterDetails from "./pages/CharacterDetails";
import LocationDetails from "./pages/LocationDetails";
import EpisodeDetails from "./pages/EpisodeDetails";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthRedirect from "./components/AuthRedirect";
import { ROUTES } from "constants/routes";

const queryClient = new QueryClient();

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      {" "}
      <Router>
        <Routes>
          <Route path="/" element={<AuthRedirect />} />
          <Route path={`/${ROUTES.LOGIN}`} element={<Login />} />
          <Route path={`/${ROUTES.SIGNUP}`} element={<Signup />} />
          <Route
            path={`/${ROUTES.CHARACTERS}`}
            element={
              <PrivateRoute>
                <Characters />
              </PrivateRoute>
            }
          />
          <Route
            path={`/${ROUTES.CHARACTERS}/:id`}
            element={
              <PrivateRoute>
                <CharacterDetails />
              </PrivateRoute>
            }
          />
          <Route
            path={`/${ROUTES.LOCATION}/:id`}
            element={
              <PrivateRoute>
                <LocationDetails />
              </PrivateRoute>
            }
          />
          <Route
            path={`/${ROUTES.EPISODE}/:id`}
            element={
              <PrivateRoute>
                <EpisodeDetails />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>{" "}
  </AuthProvider>
);

export default App;
