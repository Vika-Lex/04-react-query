import SearchBar from "../SearchBar/SearchBar.tsx";
import {useEffect, useState} from "react";
import type {Movie} from "../../types/movie.ts";
import Loader from "../Loader/Loader.tsx";
import MovieGrid from "../MovieGrid/MovieGrid.tsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";
import {fetchMovies} from "../../services/movieService.ts";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {toast, Toaster} from "react-hot-toast";
import MovieModal from "../MovieModal/MovieModal.tsx";

const App = () => {
    const [activeMovie, setActiveMovie] = useState<Movie | null>(null)
    const [query, setQuery] = useState<string>('')
    const [page, setPage] = useState<number>(1)
    const {data, isLoading, isSuccess, isError, error} = useQuery({
        queryKey: ['movies', page, query],
        queryFn: () => fetchMovies(query, page),
        enabled: !!query,
        placeholderData: keepPreviousData
    })


    const handleSubmit = (query: string) => {
        setQuery(query);
    }

    const onSelect = (movie: Movie) => {
        setActiveMovie(movie)
    }

    const onClose = () => {
        setActiveMovie(null)
    }

    const onClickPage = (page: number) => {
        setPage(page)
    }

    useEffect(() => {
        if (isSuccess && data?.results.length === 0 && query) {
            toast.error('No movies found for your request.')
        }
    }, [isSuccess, data, query]);


    if (isError) {
        return (
            <>
                <SearchBar onSubmit={handleSubmit}
                           page={page}
                           setPage={onClickPage}
                           totalPages={data?.total_pages ?? 0}
                           isSuccess={isSuccess}
                />
                <ErrorMessage error={error.message}/>
            </>)
    }

    return (
        <>
            <SearchBar onSubmit={handleSubmit}
                       page={page}
                       setPage={onClickPage}
                       totalPages={data?.total_pages ?? 0}
                       isSuccess={isSuccess}
            />
            {isLoading ? (<Loader/>) : (
                <>
                    <MovieGrid movies={data?.results ?? []}
                               onSelect={onSelect}
                    />
                    {activeMovie && (
                        <MovieModal movie={activeMovie}
                                    onClose={onClose}
                        />
                    )}
                    <Toaster/>
                </>
            )}
        </>
    );
};
export default App