import style from './SearchBar.module.css'
import {toast} from 'react-hot-toast'
import Paginate from "../Paginate/Paginate.tsx";

interface SearchBarProps {
    onSubmit: (query: string) => void;
    page: number;
    setPage: (page:number) => void;
    isSuccess: boolean;
    totalPages: number
}
const SearchBar = ({onSubmit, page, setPage, isSuccess, totalPages}: SearchBarProps) => {
    const handleSubmit = (formData: FormData) => {
        const query = formData.get("query") as string;
        if (!query) {
            toast.error('Please enter your search query.');
            return
        }
        onSubmit(query)
    }
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
                    {isSuccess && totalPages>1 && (
                        <Paginate page={page} setPage={setPage} totalPages={totalPages}/>
                    )}
                    <form className={style.form}
                          action={handleSubmit}
                    >
                        <input
                            className={style.input}
                            type="text"
                            name="query"
                            autoComplete="off"
                            placeholder="Search movies..."
                            autoFocus
                        />
                        <button className={style.button}
                                type="submit"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </header>

        </>
    );
};
export default SearchBar