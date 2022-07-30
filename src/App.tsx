import React, { useEffect, Suspense } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from './components/redux-store/reduxStore';

import { Route, Routes, Navigate} from 'react-router-dom';

import styles from './App.module.scss';

import Welcome from './components/pages/WelcomePage';
import AuthFormPage from './components/pages/AuthFormPage';

import { userFilmsActions } from './components/redux-store/userFilmsSlice';
// import DefaultMoviesPage from './components/pages/DefaultMoviesPage';
// import FoundMoviesPage from './components/pages/FoundMoviesPage';

import Header from './components/header/Header';
// import UserProfile from './components/UserProfile/UserProfile';

const DefaultMoviesPage = React.lazy(() => import('./components/pages/DefaultMoviesPage'));
const UserProfile = React.lazy(() => import('./components/UserProfile/UserProfile'));
const FoundMoviesPage = React.lazy(() => import('./components/pages/FoundMoviesPage'));




function App() {
  const authState = useSelector((state: RootState)=> state.auth);
  const dispatch = useDispatch();

  const fetchingUserMovies = async(jsonName: string) => {
    try {
      const url = `https://auth-form-lesson-default-rtdb.firebaseio.com/${jsonName}.json`;
      const response = await fetch(url);

      if(!response.ok) {
          throw new Error('Something went wrong!');
      }
      const responseData = await response.json();

     
      if (responseData) {
        dispatch(userFilmsActions.addSeveralFilms(responseData.userFilms))
      }
      
    } catch(error) {

    }
  }

  useEffect(() => {
    if (authState.isAuth && !authState.isFirstTime) {
      const jsonName = authState.userEmail!.split('@')[0].replace(/[^a-zа-яё0-9]/gi, '') +
       '_' +
        authState.userNickname!.replace(/[^a-zа-яё0-9]/gi, '');
      fetchingUserMovies(jsonName);
    }
  }, [authState]) // user вошел - грузим его фильмы


  return (
    <div className={styles.global}>
      <Header />
      <main>
        <Suspense fallback={<div className={styles.animation_container}><div className={styles.lds_ring}><div></div><div></div><div></div><div></div></div></div>}>
          <Routes>
            <Route path='/' element={<Welcome />}/>
            <Route path='/movies' element={<DefaultMoviesPage />} />
            {authState.isAuth && <Route path='/profile' element={<UserProfile />}/>}
            <Route path="*" element={<Navigate to='/'/>} />
            <Route path='/auth' element={
            !authState.isAuth ? <AuthFormPage /> : <Navigate to='/profile'/>} /> 
            <Route path='/found-movies' element={<FoundMoviesPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
