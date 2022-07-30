import { useEffect, useState } from 'react';
import Controls from '../../../controls/Controls';

import styles from './MovieDetails.module.scss';

export type movieDetailsType = {
    Title: string,
    Poster: string,
    Released: string,
    Plot: string,
    Runtime: string,
    Director: string,
    Genre: string,
    imdbID: string
}
const MovieDetails: React.FC<{movieId: string, backClick: () => void}> = props => {
    const [error, setError] = useState('');

    const [movieDetails, setMovieDetails] = useState<null | movieDetailsType>(null);
    const backClickHandler = () => {
        props.backClick()
    }
    
    useEffect(() => {
        const fetchMovieDetails = async(url: string) => {
            try {
                const response = await fetch(url);
    
                if(!response.ok) {
                    throw new Error('Something went wrong!');
                }
                const responseData = await response.json();

                if(responseData.response === 'False') 
                    throw new Error(responseData.Error);

                
                setMovieDetails(responseData);
            } catch(error) {
                setError('failed to fetch movie details(')
            }
        }
        const url = `http://www.omdbapi.com/?i=${props.movieId}&apikey=496ba178`;
        fetchMovieDetails(url);
    }, [])

    
    return ( <div>
        <div className={styles.back} onClick={backClickHandler}>
        </div>
        <div className={styles.modal} onClick={() => {}}>
            {error === '' && <>
            <div className={styles.content}>
                <div className={styles.description}>
                    {movieDetails && <>
                    <img src={movieDetails.Poster} alt={movieDetails.Title}/>
                    <div className={styles.info}>
                        <h3>{movieDetails.Title}</h3>
                        <p className={styles.directors}>DIRECTED BY</p>
                        <div>{movieDetails.Director}</div>
                        <div className={styles.data_and_time}>
                        <p>{movieDetails.Released}</p> <p>{movieDetails.Runtime}</p>
                        </div>
                    </div>
                    </>}
                    {!movieDetails && <div className={styles.poster_loading}></div>}
                    
                </div>
                <p className={styles.sinopsis}>
                    {movieDetails && movieDetails.Plot}
                </p>
            </div>
            {movieDetails &&
            <Controls movieItem={{Title: movieDetails.Title, Poster: movieDetails.Poster, imdbID: movieDetails.imdbID}}/>
            }
            </>
        }

        {error !== '' && <p className={styles.error}>{error}</p>}
        </div>

    </div>
    );
}

export default MovieDetails;