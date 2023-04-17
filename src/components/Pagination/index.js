import { FiChevronsLeft, FiChevronsRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import styles from './Pagination.module.css';

const Pagination = ({ page, numberPages, limit }) => {
    const navigate = useNavigate()

    return (
        <div className={styles.pagination}>
            <section className={styles.section}>
                <div
                    onClick={() => {
                        navigate(`?page=${1}&limit=${limit}`)
                    }}
                    className={styles.arrow}>
                    <FiChevronsLeft />
                </div>
                <div onClick={() => { navigate(`?page=${Number(page) === 1 ? page : page - 1}&limit=${limit}`) }} className={styles.arrow}>
                    <FiChevronLeft />
                </div>
                <div className={styles.pages}>
                    {Number(numberPages) >= 1 ?
                    Array.from({
                            length: (numberPages <= 3 ? numberPages : 3)
                        },
                        (_, i) => (Number(page) === 1 ? Number(page) : Number(page) === numberPages ? Number(page) - 2 | 1 : Number(page) - 1) + i).map(
                        (element) => (
                            <div onClick={() => navigate(`?page=${element}&limit=${limit}`) }
                                key={Number(element)}
                                className={Number(page) === Number(element) ? `${styles.page} ${styles.current_page}` : `${styles.page}`}>
                                {element}
                            </div>
                        ),
                    ) : <></>
                }
                </div>
                <div onClick={() => { navigate(`?page=${Number(page) + 1 > numberPages ? page : Number(page) + 1}&limit=${limit}`) }} className={styles.arrow}>
                    <FiChevronRight />
                </div>
                <div
                    onClick={() => {
                        navigate(`?page=${numberPages || 1}&limit=${limit}`)
                    }}
                    className={styles.arrow}>
                    <FiChevronsRight />
                </div>
            </section>
        </div>
    );
}

export default Pagination;