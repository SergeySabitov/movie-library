import Rating from '@mui/material/Rating';
import { useEffect, useState } from 'react';
import styles from './Controls.module.scss';
import IonIcon from '@reacticons/ionicons';
import { useSelector } from 'react-redux';
import { RootState } from '../redux-store/reduxStore';
import { Link } from 'react-router-dom';
import movieItemType from '../../types/types';
import { useDispatch } from 'react-redux';
import { userFilmsActions } from '../redux-store/userFilmsSlice';

const Controls: React.FC<{movieItem: movieItemType}> = (props) => {
    const authState = useSelector((state: RootState)=> state.auth);
    const userFilms = useSelector((state: RootState) => state.user);

    const dispatch = useDispatch();

    const [like, setLike] = useState(false);
    const [guiltyLike, setGuiltyLike] = useState(false);
    const [value, setValue] = useState<null|number>(0); //rating

    const [likeAnimation, setLikeAnimation] = useState(false); //to remove animation class to end animation
    const [darkLikeAnimation, setDarkLikeAnimation] = useState(false);
    

    const setLikeHandler = () => {
        if(authState.isAuth) {
            if (!like || guiltyLike || value) {// до этого был в библиотеке?
                if (!guiltyLike && !value)  //не был
                    dispatch(userFilmsActions.addNewFilm({details: props.movieItem, rating: value, like: !like, guiltyLike: guiltyLike }))
                else  //был, внесение изменений
                    dispatch(userFilmsActions.setMovie({imdbID: props.movieItem.imdbID, rating: value, like: !like, guiltyLike: guiltyLike }))
            } else {//удаление фильма из библиотеки 
                dispatch(userFilmsActions.removeMovie({imdbID: props.movieItem.imdbID}));
            }

            if (!like) 
                setLikeAnimation(true);
            setLike(prev => !prev);
        }
    }

    const setGuiltyLikeHandler = () => {
        if(authState.isAuth) {
            if (!guiltyLike || like || value) {// до этого был в библиотеке?
                if (!like && !value)  //не был
                    dispatch(userFilmsActions.addNewFilm({details: props.movieItem, rating: value, like: like, guiltyLike: !guiltyLike }))
                else  //был, внесение изменений
                    dispatch(userFilmsActions.setMovie({imdbID: props.movieItem.imdbID, rating: value, like: like, guiltyLike: !guiltyLike }))
            } else //удаление фильма из библиотеки
                dispatch(userFilmsActions.removeMovie({imdbID: props.movieItem.imdbID}));

            if (!guiltyLike) 
                setDarkLikeAnimation(true);
            setGuiltyLike(prev => !prev);
        }
            
    }
    

    const starClickHandler = (next: number|null) => {
        if (authState.isAuth) {
            if (next || like || guiltyLike) {
                if (!like && !guiltyLike && !value)
                    dispatch(userFilmsActions.addNewFilm({details: props.movieItem, rating: next, like: like, guiltyLike: guiltyLike }));
                else 
                    dispatch(userFilmsActions.setMovie({imdbID: props.movieItem.imdbID, rating: next, like: like, guiltyLike: guiltyLike }));
            }
            else 
                dispatch(userFilmsActions.removeMovie({imdbID: props.movieItem.imdbID}));

            setValue(next);
        }
        
    }

    useEffect(() => {
        const movie = userFilms.find(item => item.details.imdbID === props.movieItem.imdbID);
        if (movie) {
            if (movie.guiltyLike) 
                setGuiltyLike(true);

            if (movie.like) 
                setLike(true);

            if (movie.rating) 
                setValue(movie.rating);
        }
    },[]);// set controls to user state

    useEffect(() => {
        if (authState.isAuth) {
            try {
                const jsonName = authState.userEmail!.split('@')[0].replace(/[^a-zа-яё0-9]/gi, '') +
                                '_' +
                                authState.userNickname!.replace(/[^a-zа-яё0-9]/gi, '');
                fetch(`https://auth-form-lesson-default-rtdb.firebaseio.com/${jsonName}.json`, {
                    method: 'PATCH',
                    body: JSON.stringify({userFilms: userFilms})
                })
            } catch {
                
            }
        }
    }, [userFilms])

    const controlClasses = styles.controls;
    const likeAnimationClass = likeAnimation ? styles.animate: '';
    const darkLikeAnimationClass = darkLikeAnimation ? styles.animate: '';

    return (<>
    <div className={controlClasses}>
        <div className={styles.rating}>
            <Rating
                name='simple-controlled'
                value={value}
                onChange={(event, newValue) => {
                    starClickHandler(newValue);
                }}
                classes={
                    {iconEmpty: styles.iconEmpty,
                    iconFilled: styles.iconFilled}
                }
                sx={{
                    fontSize: '2.5rem',
                    color: '#14A098',
                }}
                disabled={!authState.isAuth}
            />
            </div>
            <div className={styles.hearts}>
                {!like && <IonIcon name='heart-outline' className={styles.like__empty} onClick={setLikeHandler} /> }
                {like && authState.isAuth && 
                    <IonIcon name='heart' 
                        className={`${styles.filled} ${styles.like} ${likeAnimationClass}`} 
                        onAnimationEnd={() => setLikeAnimation(false)} 
                        onClick={setLikeHandler}
                    />
                }
                {!guiltyLike && <IonIcon name='heart-outline' className={styles.dark_like__empty} onClick={setGuiltyLikeHandler} />}
                {guiltyLike && authState.isAuth && 
                    <IonIcon name='heart' 
                        className={`${styles.filled} ${styles.dark_like} ${darkLikeAnimationClass}`} 
                        onAnimationEnd={() => setDarkLikeAnimation(false)} 
                        onClick={setGuiltyLikeHandler} 
                    />
                }
            </div>
      
    </div>
    {!authState.isAuth && <p className={styles.notific}><Link to='/auth'>log in</Link> and you can add movies to your library</p>}
    </>
    );
}

export default Controls;
