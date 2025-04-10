import { Link } from "react-router-dom";

const CharacterCard = ({ character }: { character: any }) => (
  <Link to={`/characters/${character.id}`} className="card">
    <img src={character.image} alt={character.name} />
    <h3>{character.name}</h3>
    <p>Status: {character.status}</p>
  </Link>
);

export default CharacterCard;
