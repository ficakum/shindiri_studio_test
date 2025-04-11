import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import { ROUTES } from "constants/routes";

const CharacterCard = ({ character }: { character: any }) => (
  <Card sx={{ maxWidth: 300, borderRadius: 3, boxShadow: 3 }}>
    <CardActionArea
      component={Link}
      to={`/${ROUTES.CHARACTERS}/${character.id}`}>
      <CardMedia
        component="img"
        height="300"
        image={character.image}
        alt={character.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {character.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status: {character.status}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default CharacterCard;
