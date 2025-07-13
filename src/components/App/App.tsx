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
import style from './App.module.css';
import Paginate from "../Paginate/Paginate.tsx";

const App = () => {
    const [activeMovie, setActiveMovie] = useState<Movie | null>(null)
    const [query, setQuery] = useState<string>('')
    const [page, setPage] = useState<number>(1)
    const {data, isLoading, isSuccess, isError, isFetching, error} = useQuery({
        queryKey: ['movies', page, query],
        queryFn: () => fetchMovies(query, page),
        enabled: !!query,
        placeholderData: keepPreviousData
    })


    const handleSubmit = (query: string) => {
        setQuery(query);
        setPage(1);
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
            toast.error('No movies found for your request.');
        }
    }, [isSuccess, data, query]);


    return (

            <>
            <header className={style.header}>
                <div className={style.container}>
                    <a
                    className={style.link}
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by TMDB
                </a>
                    {isSuccess && data?.total_pages>1 && (
                        <Paginate page={page} setPage={onClickPage} totalPages={data?.total_pages}/>
                    )}
                    <SearchBar
                        onSubmit={handleSubmit}
                    />
                </div>
            </header>

            {(isLoading || isFetching) && <Loader/>}

            {isError && (
                <ErrorMessage error={error.message}/>
            )}

            {isSuccess && data && data.results.length > 0 && (
                <>
                    <MovieGrid
                            movies={data.results}
                            onSelect={onSelect}
                        />

                        {activeMovie && (
                            <MovieModal
                                movie={activeMovie}
                                onClose={onClose}
                            />
                        )}
                    </>
                )}

                <Toaster />
            </>
    );
};
export default App