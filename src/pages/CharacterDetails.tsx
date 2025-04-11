import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { api } from "../api/rickAndMortyApi";
import Loader from "../components/Loader";

import {
  Box,
  Typography,
  Avatar,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { ROUTES } from "constants/routes";
import { CHARACTER_LINK, LOCATION_LINK } from "constants/rickAndMortyApi";

const CharacterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<any>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const res = await api.get(`/${CHARACTER_LINK}/${id}`);
        setCharacter(res.data);

        const episodesPromises = res.data.episode.map((ep: string) =>
          api.get(ep)
        );
        const episodesData = await Promise.all(episodesPromises);
        setEpisodes(episodesData.map((ep) => ep.data));

        const locationUrl = res.data.location.url;
        if (locationUrl) {
          const locationId = locationUrl.split("/").pop();
          const locationRes = await api.get(`/${LOCATION_LINK}/${locationId}`);
          setLocation(locationRes.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Character Details
      </Typography>

      <Paper elevation={3} sx={{ display: "flex", p: 3, gap: 3 }}>
        <Avatar
          src={character.image}
          alt={character.name}
          sx={{ width: 128, height: 128 }}
        />
        <Box>
          <Typography variant="h5" fontWeight="bold">
            {character.name}
          </Typography>
          <Typography>Status: {character.status}</Typography>
          <Typography>Species: {character.species}</Typography>
          <Typography>Gender: {character.gender}</Typography>

          <Box mt={2}>
            <Typography fontWeight="bold">Location:</Typography>
            {location ? (
              <Link
                component={RouterLink}
                to={`/${ROUTES.LOCATION}/${location.id}`}
                color="primary">
                {location.name}
              </Link>
            ) : (
              <Typography>Loading location...</Typography>
            )}
          </Box>

          <Box mt={2}>
            <Typography fontWeight="bold">Episodes:</Typography>
            <List dense>
              {episodes.map((episode) => (
                <ListItem
                  key={episode.id}
                  sx={{ pl: 0 }}
                  disableGutters
                  divider>
                  <ListItemText
                    primary={
                      <Link
                        component={RouterLink}
                        to={`/${ROUTES.EPISODE}/${episode.id}`}
                        color="primary">
                        {episode.name} (Season {episode.season}, Episode{" "}
                        {episode.number})
                      </Link>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default CharacterDetails;
