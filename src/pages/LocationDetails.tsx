import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api/rickAndMortyApi";
import Loader from "../components/Loader";
import CharacterCard from "../components/CharacterCard";

const LocationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [location, setLocation] = useState<any>(null);
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocationDetails = async () => {
      try {
        // Fetch location details
        const res = await api.get(`/location/${id}`);
        setLocation(res.data);

        // Fetch characters for the location
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Location Details</h1>
      <div className="mb-6">
        <p className="text-lg font-semibold">Location Name:</p>
        <p>{location.name}</p>

        <p className="text-lg font-semibold mt-2">Location Type:</p>
        <p>{location.type}</p>

        <p className="text-lg font-semibold mt-2">Dimension:</p>
        <p>{location.dimension}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Residents:</h2>
        {characters.length === 0 ? (
          <p>No characters found at this location.</p>
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

export default LocationDetails;
