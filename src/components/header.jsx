import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../hooks/app-slice";
import { YOUTUBE_SEARCH_API, YOUTUBE_LOGO } from "../utils/constants";
import { cacheResults } from "../hooks/search-slice";
import { Menu, Search, User } from "lucide-react"; // Importing Lucide icons

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    if (!searchQuery) return;
    console.log("Fetching suggestions for", searchQuery);
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);

    dispatch(cacheResults({ [searchQuery]: json[1] }));
  };

  const handleSearch = async () => {
    if (!searchQuery) return;
    console.log("Fetching search results for", searchQuery);
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();

    // Assuming the search results are in json.items
    setSuggestions(json.items || []);

    // Optionally, you can cache the search results as well
    dispatch(cacheResults({ [searchQuery]: json.items || [] }));
  };

  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1">
        {/* Menu Icon */}
        <Menu
          onClick={() => dispatch(toggleMenu())}
          className="h-8 w-8 cursor-pointer"
        />

        {/* YouTube Logo */}
        <a href="/">
          <img className="h-8 mx-2" alt="youtube-logo" src={YOUTUBE_LOGO} />
        </a>
      </div>

      {/* Search Bar */}
      <div className="col-span-10 px-10">
        <div className="flex">
          <input
            className="px-5 w-1/2 border border-gray-400 p-2 rounded-l-full"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button
            className="border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100 flex items-center"
            onClick={handleSearch}
          >
            <Search className="h-5 w-5" />
          </button>
        </div>

        {/* Search Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="fixed bg-white py-2 px-2 w-[37rem] shadow-lg rounded-lg border border-gray-100">
            <ul>
              {suggestions.map((s) => (
                <li
                  key={s}
                  className="py-2 px-3 shadow-sm hover:bg-gray-100 flex items-center"
                >
                  <Search className="h-4 w-4 mr-2" /> {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* User Icon */}
      <div className="col-span-1 flex items-center">
        <User className="h-8 w-8" />
      </div>
    </div>
  );
};

export default Header;
