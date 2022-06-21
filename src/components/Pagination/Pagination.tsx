import ReactPaginate from 'react-paginate';
import style from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number,
  onChangePage: any,
}

export const Pagination:React.FC<PaginationProps> = ({ onChangePage, currentPage }) => {
  return (
    <ReactPaginate
      className={style.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel="<"
    />
  );
};
