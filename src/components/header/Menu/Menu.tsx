import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../redux-store/authSlice";
import { RootState } from "../../redux-store/reduxStore";
import { userFilmsActions } from "../../redux-store/userFilmsSlice";
import styles from './Menu.module.scss';

const Menu: React.FC<{hideMenu: () => void}> = props => {
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOutHandler = () => {
        props.hideMenu();
        dispatch(userFilmsActions.removeAll());
        dispatch(authActions.logoutHandler());
        navigate('/');
    }
    return (
        <nav>
        <ul className={styles.menu} >
            <li><Link to='/movies' onClick={() => {props.hideMenu()}}>Movies</Link></li>
            {isAuth && <>
                <li><Link to='/profile' onClick={() => {props.hideMenu()}}>My movies</Link></li>
                <li onClick={logOutHandler} className={styles.logout}>Log out</li>
            </>}
        </ul>
        </nav>
    );
}

export default Menu;