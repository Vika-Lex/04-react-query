import ReactPaginate from "react-paginate";
import style from "./Paginate.module.css"

interface Props {
    page: number;
    setPage: (page:number) => void;
    totalPages:number
}


const Paginate = ({page, setPage, totalPages}: Props) => {

    return (
        <>
         <ReactPaginate pageCount={totalPages}
                        pageRangeDisplayed={5}
                        marginPagesDisplayed={1}
                        onPageChange={({ selected }) => setPage(selected + 1)}
                        forcePage={page - 1}
                        containerClassName={style.pagination}
                        activeClassName={style.active}
                        nextLabel="→"
                        previousLabel="←"
         />
        </>
    );
};
export default Paginate