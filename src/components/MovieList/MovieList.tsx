import { useState } from "react";
import movieItemType from "../../types/types";
import MovieDetails from "./MovieItem/MovieDetails/MovieDetails";
import MovieItem from "./MovieItem/MovieItem";

import styles from './MovieList.module.scss'

const MovieList:React.FC<{movies: movieItemType[], title: string | JSX.Element, isLoading: boolean, error: string }> = (props) => {
    const [showDetails, setShowDetails] = useState<{show: boolean, id:  string}>({show: false, id: ''});


    const showDetailsHandler = (id: string) => {
        setShowDetails({show: true, id: id});
    }

    const backClickHandler = () => {
        setShowDetails({show: false, id: ''});
    }

    let content = <p className={styles.not_found}>No films yet</p>;

    if (props.movies.length > 0) {
        content = <ul className={styles.list}>
            {props.movies.map((item) => {
            return <li key={item.imdbID} className={styles.list__item}><MovieItem movie={item} showDetails={showDetailsHandler}/></li>
        })}
        </ul>
    }
    
    if (props.error !== 'no') {
        if (props.error === "Too many results.") {
            content=<p className={styles.not_found}>{props.error} Please be more specific!</p>;
        } else
            content=<p className={styles.not_found}>{props.error}</p>;
    }

    let title;

    if (typeof props.title !== 'string') { // кастомный title с предоставленным оформлением (сердечки)
        title = props.title
    } else {
        title = <p className={styles.title}>{props.title}</p>
    }

    return (
        <>
        {showDetails.show && <MovieDetails movieId={showDetails.id} backClick={backClickHandler}/>}
        <section>
            <div className={styles.title_container}>
            {title}
            </div>
            {!props.isLoading && 
                <div className={styles.list_container}>
                    {content}
                </div>
            }   
            {props.isLoading && <p className={styles.loading}>Loading...</p>}
        </section>
        </>
    );
}

export default MovieList;