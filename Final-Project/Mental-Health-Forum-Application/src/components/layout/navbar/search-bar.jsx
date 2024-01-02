import { useState } from "react";
import { Search } from "lucide-react";
import { Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export default function SearchNavbar() {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  // console.log(searchResults)

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!query.trim()) return;
    try {
      navigate(`/search/${query}/${1}`)
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <label htmlFor="forum-search" className="mb-2 text-sm font-medium sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Search className="text-dark-navy" size={16} />
        </div>
        <input
          type="search"
          id="forum-search"
          placeholder="Search forums"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          className="block w-80 p-1 ps-10 text-sm border border-blue-600 rounded-2xl bg-white focus:ring-1 focus:ring-blue-600 placeholder-gray-400 text-custom-gray"
        />
        <button type="submit" className="absolute top-0 end-0 px-3  text-sm font-medium h-full bg-dark-navy md:bg-light-navy rounded-e-2xl border border-none hover:opacity-80 focus:ring-2 focus:outline-none focus:ring-blue-300 ">
          {loading ? (
            <Spinner className="flex" size="sm" />
          ) : (
            <>
              <Search size={16} />
              <span className="sr-only">Search</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
