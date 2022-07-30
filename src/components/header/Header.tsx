import { useSelector } from "react-redux";
import { RootState } from "../redux-store/reduxStore";
import { Link } from "react-router-dom";
import styles from './Header.module.scss';
import IonIcon from "@reacticons/ionicons";
import { useState } from "react";
import Menu from "./Menu/Menu";


const Header: React.FC = () =>{
    const authState = useSelector((state: RootState) => state.auth);
    const [toggleMenu, setToggleMenu] = useState(false);

    const menuClasses =`${styles.menuContainer} ${toggleMenu ? styles.show: styles.hide}`;
    return (<div className={styles.header}>
        <div className={styles.header__container}>
            <ul className={styles.list}>
                <li>logo</li>
                <li>
                    {authState.isAuth ? authState.userNickname : <Link to='/auth' >sign in</Link>}
                    <IonIcon name='menu' className={styles.menuIcon} onClick={() => setToggleMenu(prev => !prev)}/>
                </li>
            </ul>
            
        </div>
        <div className={menuClasses}>
                <Menu hideMenu={() => { setToggleMenu(false)}}/>
        </div>
        
    </div>
    );
}
export default Header;