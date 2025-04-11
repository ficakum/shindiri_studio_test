import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api/rickAndMortyApi";
import Loader from "../components/Loader";
import CharacterCard from "../components/CharacterCard";
import { Box, Typography, Paper } from "@mui/material";
import { ROUTES } from "constants/routes";
import { EPISODE_LINK } from "constants/rickAndMortyApi";

const EpisodeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [episode, setEpisode] = useState<any>(null);
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpisodeDetails = async () => {
      try {
        const res = await api.get(`/${EPISODE_LINK}/${id}`);
        setEpisode(res.data);

        const characterPromises = res.data.characters.map(
          (characterUrl: string) => api.get(characterUrl)
        );
        const characterData = await Promise.all(characterPromises);
        setCharacters(characterData.map((character) => character.data));
      } catch (error) {
        console.error("Error fetching episode details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodeDetails();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Episode Details
      </Typography>

      <Box mb={4}>
        <Typography variant="h6" fontWeight="bold">
          Episode Name:
        </Typography>
        <Typography>{episode.name}</Typography>

        <Typography variant="h6" fontWeight="bold" mt={2}>
          Season:
        </Typography>
        <Typography>{episode.episode.split(" ")[0]}</Typography>

        <Typography variant="h6" fontWeight="bold" mt={2}>
          Episode Number:
        </Typography>
        <Typography>{episode.episode.split(" ")[1]}</Typography>
      </Box>

      <Box>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Characters in this episode:
        </Typography>
        {characters.length === 0 ? (
          <Typography>No characters found in this episode.</Typography>
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

export default EpisodeDetails;
