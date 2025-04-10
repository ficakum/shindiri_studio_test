import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api/rickAndMortyApi";
import Loader from "../components/Loader";
import CharacterCard from "../components/CharacterCard";

const EpisodeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [episode, setEpisode] = useState<any>(null);
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpisodeDetails = async () => {
      try {
        // Fetch episode details
        const res = await api.get(`/episode/${id}`);
        setEpisode(res.data);

        // Fetch characters for the episode
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Episode Details</h1>
      <div className="mb-6">
        <p className="text-lg font-semibold">Episode Name:</p>
        <p>{episode.name}</p>

        <p className="text-lg font-semibold mt-2">Season:</p>
        <p>{episode.episode.split(" ")[0]}</p>

        <p className="text-lg font-semibold mt-2">Episode Number:</p>
        <p>{episode.episode.split(" ")[1]}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">
          Characters in this episode:
        </h2>
        {characters.length === 0 ? (
          <p>No characters found in this episode.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {characters.map((character: any) => (
              <div key={character.id}>
                <Link to={`/characters/${character.id}`}>
                  <CharacterCard character={character} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EpisodeDetails;
