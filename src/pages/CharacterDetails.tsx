import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api/rickAndMortyApi";
import Loader from "../components/Loader";

const CharacterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<any>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const res = await api.get(`/character/${id}`);
        setCharacter(res.data);

        // Fetch episodes
        const episodesPromises = res.data.episode.map((ep: string) =>
          api.get(ep)
        );
        const episodesData = await Promise.all(episodesPromises);
        setEpisodes(episodesData.map((ep) => ep.data));

        // Fetch location
        const locationRes = await api.get(
          `/location/${res.data.location.url.split("/").pop()}`
        );
        setLocation(locationRes.data);
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Character Details</h1>
      <div className="flex">
        <img
          src={character.image}
          alt={character.name}
          className="rounded-full w-48 h-48 object-cover mr-6"
        />
        <div>
          <h2 className="text-xl font-semibold">{character.name}</h2>
          <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
          <p>Gender: {character.gender}</p>

          <div className="mt-4">
            <p className="font-semibold">Location:</p>
            {location ? (
              <Link to={`/location/${location.id}`} className="text-blue-500">
                {location.name}
              </Link>
            ) : (
              <p>Loading location...</p>
            )}
          </div>

          <div className="mt-4">
            <p className="font-semibold">Episodes:</p>
            <ul>
              {episodes.map((episode) => (
                <li key={episode.id}>
                  <Link to={`/episode/${episode.id}`} className="text-blue-500">
                    {episode.name} (Season {episode.season}, Episode{" "}
                    {episode.number})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
