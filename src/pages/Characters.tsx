import { useState, useRef, useCallback } from "react";
import { useCharacters } from "../hooks/useCharacters";
import CharacterCard from "../components/CharacterCard";
import Loader from "../components/Loader";

const Characters = () => {
  const [search, setSearch] = useState("");
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useCharacters(search);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: any) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    refetch(); // refetch when search input changes
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Characters</h1>
      <input
        type="text"
        placeholder="Search characters..."
        value={search}
        onChange={handleSearch}
        className="mb-4 p-2 border rounded w-full md:w-1/3"
      />

      {/* Loader */}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data?.pages.map((page, pageIndex) =>
              page.results.map((character: any, charIndex: number) => {
                const isLast =
                  pageIndex === data.pages.length - 1 &&
                  charIndex === page.results.length - 1;
                return (
                  <div key={character.id} ref={isLast ? lastElementRef : null}>
                    <CharacterCard character={character} />
                  </div>
                );
              })
            )}
          </div>

          {isFetchingNextPage && (
            <p className="text-center mt-4">Loading more...</p>
          )}
        </>
      )}
    </div>
  );
};

export default Characters;
