import movieItemType from "../../../types/types";
import styles from './MovieItem.module.scss';

const MovieItem: React.FC<{movie: movieItemType, showDetails: (id: string) => void}> = props => {
    const clickHandler = () => {
        props.showDetails(props.movie.imdbID);
    }
    return <div className={styles.movie_container} onClick={clickHandler}>
        <img src={props.movie.Poster} alt={props.movie.Title}/>
    </div>
}
export default MovieItem