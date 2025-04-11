import { useState, useRef, useCallback } from "react";
import { useCharacters } from "../hooks/useCharacters";
import CharacterCard from "../components/CharacterCard";
import Loader from "../components/Loader";
import { Box, Typography, TextField, CircularProgress } from "@mui/material";

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
    refetch();
  };

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Characters
      </Typography>

      <TextField
        label="Search characters..."
        variant="outlined"
        fullWidth
        value={search}
        onChange={handleSearch}
        sx={{ mb: 4, maxWidth: 400 }}
      />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={3}>
            {data?.pages.map((page, pageIndex) =>
              page.results.map((character: any, charIndex: number) => {
                const isLast =
                  pageIndex === data.pages.length - 1 &&
                  charIndex === page.results.length - 1;
                return (
                  <Box
                    key={character.id}
                    gridColumn="span 3"
                    ref={isLast ? lastElementRef : null}>
                    <CharacterCard character={character} />
                  </Box>
                );
              })
            )}
          </Box>

          {isFetchingNextPage && (
            <Box mt={4} display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Characters;
