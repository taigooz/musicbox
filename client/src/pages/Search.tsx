import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    function handleSearch() {
        if (!search) return;

        // Redirect to the search results page with the search term as a query parameter
        navigate(`/search?q=${encodeURIComponent(search)}`);
    }


    return (
        <div>
            <h1>Search Albums</h1>

            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search album..."
            />

            <button onClick={handleSearch}>
                Search
            </button>
        </div>
    );
}