import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux-store/reduxStore";

import MovieList from "../MovieList/MovieList";
import IonIcon from "@reacticons/ionicons";

import movieItemType from "../../types/types";
import styles from './Films.module.scss';

const FilmsByRequest: React.FC<{title: string, search: {s: string, y: string} | null}> = props => {
    const [resultCount, setResultCount] = useState<number>(0);
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState<movieItemType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('no');

    const searchState =  useSelector((state: RootState) => state.search);

    const year = props.search ? props.search.y : searchState.year;
    const s = props.search ? props.search.s : searchState.title;
    
    useEffect(() => {
        if (s !== '') {//user сразу открыл страницу с найденными фильмами без поиска?
            setError('no');
            if (page === 1)
                setIsLoading(true);
                
            const url = `https://www.omdbapi.com/?s=${s}&apikey=496ba178${year !== 'no' ? `&y=${year}`: ''}&page=${page}`;
            const fetchMovies = async(url: string) => {
                try {
                    const response = await fetch(url);
            
                    if(!response.ok) {
                        throw new Error('Something went wrong!');
                    }
                    const responseData = await response.json();
        
                    if(responseData.response === 'False') 
                        throw new Error(responseData.Error);
        
                    if(responseData.Search) {
                        setMovies(prev => {
                            if (page === 1) {
                                return responseData.Search;
                            }
                            const newState = [...prev];
                            responseData.Search.forEach((element: movieItemType) => {
                                newState.push(element);
                            });
                            return newState;
                        });
                        if (page === 1) 
                            setResultCount(+responseData.totalResults - 10);
                        else    
                            setResultCount(prev => prev - 10)
                    }
                    if(responseData.Error) {
                        setError(responseData.Error);
                        setResultCount(0);
                        
                    }
                } catch(error) {
                    setError('Something went wrong!');
                }
                setIsLoading(false);
            }
            fetchMovies(url);
        } else {
            setError('You havent searching yet');
            setIsLoading(false);
        }
        
        
    }, [page, year, s])

    const showMoreHandler = () => {
        if (resultCount > 0)
            setPage(prev => prev + 1);
    }

    const hideHandler = () => {
        setPage(1);
    }
    
    return (
        <>
            <MovieList movies={movies} isLoading={isLoading} title={props.title} error={error}/>
            {(resultCount > 0 || page > 1) && <>
                <button className={styles.control_button} onClick={showMoreHandler} disabled={ !(resultCount > 0) }><IonIcon name='chevron-down'  /></button>
                <button className={styles.control_button} onClick={hideHandler} disabled={ !(page > 1) }><IonIcon name='chevron-up' /></button>
            </>
            }
        </>
    );
}

export default FilmsByRequest


