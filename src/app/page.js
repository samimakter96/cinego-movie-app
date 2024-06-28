import Results from "@/components/Results";

const API_KEY = process.env.API_KEY;

const Home = async ({ searchParams }) => {
  const genre = searchParams.genre || "fetchTrending";

  const response = await fetch(
    `https://api.themoviedb.org/3${
      genre === "fetchTopRated" ? `/movie/top_rated` : `/trending/all/week`
    }?api_key=${API_KEY}&language=en-US&page=1`,
    { next: { revalidate: 10000 } }
  );

  if (!response.ok) {
    console.error("Failed to fetch data, status:", response.status);
    throw new Error("Failed to fetch data");
  }

  let data;
  try {
    data = await response.json();
  } catch (error) {
    console.error("Error parsing JSON:", error);
    throw new Error("Failed to parse JSON");
  }

  const results = data.results;

  return (
    <div>
      <Results results={results} />
    </div>
  );
};

export default Home;
