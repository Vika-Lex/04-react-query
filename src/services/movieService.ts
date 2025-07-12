import type {Movie} from "../types/movie.ts";
import axios from "axios";
import {BASE_URL, routes} from "../constants.ts";

interface MoviesResponseProps {
    results: Movie[];
    total_pages: number
}

export const fetchMovies = async (query: string, page: number): Promise<MoviesResponseProps> => {

    const params = new URLSearchParams({
        query: query,
        page: page.toString()

    })
    const response = await axios.get<MoviesResponseProps>(`${BASE_URL}${routes.searchMovie}?${params.toString()}`, {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
            },


        }
    );
    return response.data;

}


