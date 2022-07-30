import IonIcon from "@reacticons/ionicons";
import { useSelector } from "react-redux";
import MovieList from "../MovieList/MovieList";
import { RootState } from "../redux-store/reduxStore";
import Search from "../Searching/Search";
import styles from './UserProfile.module.scss';

const UserProfile = () => {
    const authState = useSelector((state: RootState) => state.auth);

    const loadedMovies = useSelector((state: RootState) => state.user)
    const isNotEmpty = loadedMovies.length;

    const love = loadedMovies.filter(item => item.like).map(item => {
        return item.details;
    });

    const guiltyPleasure = loadedMovies.filter(item => item.guiltyLike).map(item => {
        return item.details;
    });

    const all = loadedMovies.map(item => {
        return item.details;
    });


    return (
        <>
        <h2 className={styles.user_profile_title}>{authState.userNickname}'s films</h2>
        {!isNotEmpty && <img src='https://media.makeameme.org/created/lets-explore-your-332aaedf0e.jpg' alt='empty' className={styles.empty}/>}
        {isNotEmpty && <>
            <MovieList movies={love.reverse()} 
                title={<div className={styles.title}>
                    <IonIcon name='heart' 
                        className={`${styles.filled} ${styles.like}`} /><span className={styles.title_text}>Love</span>
                    </div>} 
                isLoading={false} error='no'/>
            <MovieList movies={guiltyPleasure.reverse()} 
                title={<div className={styles.title}>
                    <IonIcon name='heart' 
                        className={`${styles.filled} ${styles.dark_like}`} /><span className={styles.title_text}>Guilty pleasure</span>
                    </div>} 
                isLoading={false} error='no'/>
            <MovieList movies={all.reverse()} 
                title={`All ${authState.userNickname}'s films (${all.length})`} 
                isLoading={false} error='no'/>
            </>}
        
        </>
    )
}

export default UserProfile;