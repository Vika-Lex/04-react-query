import style from './SearchBar.module.css'
import {toast} from 'react-hot-toast'

interface SearchBarProps {
    onSubmit: (query: string) => void;
}
const SearchBar = ({onSubmit}: SearchBarProps) => {
    const handleSubmit = (formData: FormData) => {
        const query = formData.get("query") as string;
        if (!query) {
            toast.error('Please enter your search query.');
            return
        }
        onSubmit(query)
    }
    return (
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
    );
};
export default SearchBar