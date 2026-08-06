import { useState } from "react";

export default function Search() {

    const [term, setTerm] = useState("");

    function handleSearch() {
        console.log(term);
    }


    return (
        <div>
            <h1>Search Albums</h1>

            <input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search album..."
            />

            <button onClick={handleSearch}>
                Search
            </button>
        </div>
    );
}