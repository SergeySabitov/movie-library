import IonIcon from '@reacticons/ionicons';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../redux-store/reduxStore';

import { searchActions } from '../redux-store/searchingSlice';
import styles from './Search.module.scss';
const Search: React.FC = props => {
    const dispatch = useDispatch();
    const search = useSelector((state: RootState) => state.search);

    const [clickAnimation, setClickAnimation] = useState(false); // toggle search animation
    const [toggleSearch, setToggleSearch] = useState(false);
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredYear, setEnteredYear] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();



    const submitHandler = (event: React.FormEvent) =>{
        event.preventDefault();
        
        dispatch(searchActions.find({title: enteredTitle, year: enteredYear.length > 0 ? enteredYear : 'none'}));

        setToggleSearch(false);
        if (location.pathname !== '/found-movies')
            navigate('/found-movies');
        
    }

    const titleChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setEnteredTitle(event.currentTarget.value);

    }
    const yearChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setEnteredYear(event.currentTarget.value);

    }

    useEffect(() => {
        setEnteredTitle(search.title);
        setEnteredYear(search.year);
    },[search]);

    useEffect(() => {
        if (enteredTitle.trim().length > 1 ) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [enteredTitle, enteredYear])

    const buttonClasses = `${styles.search_toggle} ${clickAnimation ? styles.animate: ''}`;
    return (
        <>
            <button className={buttonClasses} 
                    onAnimationEnd={() => { setClickAnimation(false); }} 
                    onClick={() => { setClickAnimation(true); setToggleSearch(true)}}>
                        <IonIcon name='search-outline' />
            </button>
            {toggleSearch && <>
            <div className={styles.back} onClick={() => setToggleSearch(false)}></div>
                <div className={styles.modal} onClick={() => {}}>
                    <form onSubmit={submitHandler} className={styles.form}>
                        <div className={styles.inputs}>
                            <div>
                                <label htmlFor='title'>Title</label>
                                <input type="text" 
                                    id='title' 
                                    minLength={2} 
                                    value={enteredTitle} 
                                    onChange={titleChangeHandler}
                                />
                            </div>
                            <div>
                                <label htmlFor='year'>Year</label>
                                <input type='number' 
                                    id='year' 
                                    min='1900' 
                                    max={`${new Date().getFullYear()}`} 
                                    value={enteredYear} 
                                    onChange={yearChangeHandler}
                                />
                            </div>
                        </div>
                        <button  className={styles.search_button} disabled={isButtonDisabled}>
                            Find
                        </button>
                    </form>
                </div>
                </>
            }
        </>
    );
}
export default Search;