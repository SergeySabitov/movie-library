import { Rating } from "@mui/material";
import IonIcon from "@reacticons/ionicons";
import React from "react";
import styles from './WelcomePage.module.scss';
const Welcome: React.FC = () => {
    return ( <div className={styles.container}>
        <p className={styles.head_title}>Welcome!</p>
        <div className={styles.explanation}>
            <span className={styles.search_toggle}>
            <IonIcon name='search-outline' />
            </span> <span className={styles.label}>Find movies</span>
        </div>
        <div className={styles.explanation}>
            <span>
            <Rating name='simple-controlled'
                    value={5}
                    sx={{
                        fontSize: '2rem',
                        color: '#14A098',
                    }}
                    disabled={true}
            /></span> <span className={styles.label}>Rate the movies you've watched</span>
        </div>
        <div className={styles.explanation}>
            <span>
            <IonIcon name='heart' className={`${styles.filled} ${styles.like}`} /> <IonIcon name='heart' className={`${styles.filled} ${styles.darl_like}`} />
            </span>
             <span className={styles.label}>Put hearts: <div><span className={styles.accent_color}>- love heart</span></div> <div><span className={styles.black_color}>- guilty pleasure heart</span></div></span>
        </div>
        <p className={styles.head_title}>Enjoy!</p>
        </div>
    )
};

export default Welcome;