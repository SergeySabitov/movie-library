
import movieItemType from "../../types/types";
import MovieList from "../MovieList/MovieList";
import Search from "../Searching/Search";
import FilmsByRequest from "../FindMoviesByRequest/FilmsByRequest";

const MY_RECOMMENDATION: movieItemType[] = [
    {imdbID: 'tt1856101', Poster: 'https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_SX300.jpg', Title: 'Blade Runner 2049'},
    {imdbID: 'tt0190590', Poster: 'https://m.media-amazon.com/images/M/MV5BMjZkOTdmMWItOTkyNy00MDdjLTlhNTQtYzU3MzdhZjA0ZDEyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg', Title: 'O Brother, Where Art Thou?'},
    {imdbID: "tt5198068", Poster: "https://m.media-amazon.com/images/M/MV5BNTA4MWQ4NGUtOGQ0MS00M2QyLWE5MDItZWM2YzA0ZDgxZTA2XkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_SX300.jpg", Title: 'Wolfwalkers'},
    {imdbID: "tt1631867", Poster: "https://m.media-amazon.com/images/M/MV5BMTc5OTk4MTM3M15BMl5BanBnXkFtZTgwODcxNjg3MDE@._V1_SX300.jpg", Title: 'Edge of Tomorrow'}
]

const DefaultMoviesPage: React.FC = () => {
    return (<>
        <MovieList movies={MY_RECOMMENDATION} title='Personal recommendations' isLoading={false} error='no' />
        <FilmsByRequest title='Star Wars colleciton' search={{s:"star wars", y: 'no'}} />
        <FilmsByRequest title='X-men collection' search={{s:"x men", y: 'no'}} />
        <FilmsByRequest title='Harry Potter collection' search={{s:'Harry Potter', y: 'no'}} />
        <Search />
    </>
    );

}

export default DefaultMoviesPage;