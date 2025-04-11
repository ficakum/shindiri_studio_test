import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api/rickAndMortyApi";
import Loader from "../components/Loader";
import CharacterCard from "../components/CharacterCard";
import { Box, Typography, Paper } from "@mui/material";
import { ROUTES } from "constants/routes";
import { LOCATION_LINK } from "constants/rickAndMortyApi";

const LocationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [location, setLocation] = useState<any>(null);
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocationDetails = async () => {
      try {
        const res = await api.get(`/${LOCATION_LINK}/${id}`);
        setLocation(res.data);

        const characterPromises = res.data.residents.map(
          (characterUrl: string) => api.get(characterUrl)
        );
        const characterData = await Promise.all(characterPromises);
        setCharacters(characterData.map((character) => character.data));
      } catch (error) {
        console.error("Error fetching location details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationDetails();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Location Details
      </Typography>

      <Box mb={4}>
        <Typography variant="h6" fontWeight="bold">
          Location Name:
        </Typography>
        <Typography>{location.name}</Typography>

        <Typography variant="h6" fontWeight="bold" mt={2}>
          Location Type:
        </Typography>
        <Typography>{location.type}</Typography>

        <Typography variant="h6" fontWeight="bold" mt={2}>
          Dimension:
        </Typography>
        <Typography>{location.dimension}</Typography>
      </Box>

      <Box>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Residents:
        </Typography>
        {characters.length === 0 ? (
          <Typography>No characters found at this location.</Typography>
        ) : (
          <Box display="flex" flexWrap="wrap" gap={3}>
            {characters.map((character: any) => (
              <Box
                key={character.id}
                width={{ xs: "100%", sm: "48%", md: "23%" }}>
                <Link to={`/${ROUTES.CHARACTERS}/${character.id}`}>
                  <Paper elevation={3} sx={{ padding: 2 }}>
                    <CharacterCard character={character} />
                  </Paper>
                </Link>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default LocationDetails;
