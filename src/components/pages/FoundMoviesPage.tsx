import Search from "../Searching/Search";
import FilmsByRequest from "../FindMoviesByRequest/FilmsByRequest";

const FoundMoviesPage: React.FC = (props) => {

    return (<>
        <FilmsByRequest title="Results" search={null} />
        <Search />
        </>
    );
}
export default FoundMoviesPage