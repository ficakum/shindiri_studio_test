import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import Characters from "./pages/Characters";
import CharacterDetails from "./pages/CharacterDetails";
import LocationDetails from "./pages/LocationDetails";
import EpisodeDetails from "./pages/EpisodeDetails";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import QueryClient and QueryClientProvider
import AuthRedirect from "./components/AuthRedirect";

// Create a client for react-query
const queryClient = new QueryClient();

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      {" "}
      {/* Wrap the entire app in QueryClientProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<AuthRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/characters"
            element={
              <PrivateRoute>
                <Characters />
              </PrivateRoute>
            }
          />
          <Route
            path="/characters/:id"
            element={
              <PrivateRoute>
                <CharacterDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/location/:id"
            element={
              <PrivateRoute>
                <LocationDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/episode/:id"
            element={
              <PrivateRoute>
                <EpisodeDetails />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>{" "}
    {/* End of QueryClientProvider */}
  </AuthProvider>
);

export default App;
