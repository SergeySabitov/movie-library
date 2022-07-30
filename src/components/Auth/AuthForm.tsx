import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import  { authActions } from "../redux-store/authSlice";
import classes from './AuthForm.module.scss';



export const API_KAY: string = 'AIzaSyBKbbiHm0m2xiTYsJiPCnaFfDrb_6aPUug';


const AuthForm: React.FC = () => {
    const dispatch = useDispatch();
    
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(false);

    const userEmail = useRef<HTMLInputElement | null>(null);
    const userPassw = useRef<HTMLInputElement | null>(null);
    const userNickname = useRef<HTMLInputElement | null>(null);


    const switchAuthModeHandler = () => {
        setIsLogin(prev => !prev);
        setHttpError(false);
    }

    
    const submitHandler = (event: React.FormEvent) =>{
        event.preventDefault();
    
        const enteredUserEmail = userEmail.current!.value;
        const enteredUserPassw = userPassw.current!.value;
    
        setIsLoading(true);
        let url;
        let body ={
            email: enteredUserEmail,
            password: enteredUserPassw,
            returnSecureToken: true
        };
        if (isLogin) {
          url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KAY}`;
        } else {
          url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KAY}`
        }

        const authRequest = async(url: string, body:  {[index: string]: string | boolean}) => {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
        
                if(!response.ok) {
                    throw new Error('Something went wrong!');
                }
                const responseData = await response.json();
        
                if (!isLogin) {// update user Display name
                    const enteredUserNickname = userNickname.current!.value;
                    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KAY}`, {
                        method: 'POST',
                        body: JSON.stringify({
                            idToken: responseData.idToken,
                            displayName: enteredUserNickname,
                            returnSecureToken: true
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
            
                    if(!response.ok) {
                        throw new Error('Something went wrong! Try again');
                    }
                    const updatedUserData = await response.json();
                    
                    dispatch(authActions.loginHandler({token: updatedUserData.idToken, userNickname: enteredUserNickname, userEmail: enteredUserEmail, isFirstTime: true}));
                } else {// get user display name
                    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KAY}`, {
                        method: 'POST',
                        body: JSON.stringify({
                            idToken: responseData.idToken,
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
            
                    if(!response.ok) {
                        throw new Error('Something went wrong! Try again');
                    }
                    const updatedUserData = await response.json();
                    
                    dispatch(authActions.loginHandler({token: responseData.idToken, userNickname: updatedUserData.users[0].displayName, userEmail: enteredUserEmail, isFirstTime: false}));   
                }  
                setHttpError(false);
            } catch(error) {
                let erMessage = 'error';
                if (error instanceof Error) erMessage = error.message;
                setHttpError(true);
            }
        }

        authRequest(url, body);
        
        setIsLoading(false);
    }

    const focusHandler = () => {
        if(httpError) {
            setHttpError(false);
        }
    }
        
    const httpErrorClass = httpError ? classes.error_input_animation : '';
    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input placeholder="test@test.com" type='email' id='email' required ref={userEmail} className={httpErrorClass} onFocus={focusHandler}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input  type='password' id='password' minLength={6} required ref={userPassw} className={httpErrorClass} onFocus={focusHandler}/>
                </div>
                {!isLogin && <div className={classes.control}>
                    <label htmlFor='nickname'>Your NickName</label>
                    <input placeholder="e. g., batman or frodo" type='text' id='nickname' minLength={3} required ref={userNickname} className={httpErrorClass} onFocus={focusHandler}/>
                </div>}
                <div className={classes.actions}>
                {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
                {isLoading && <p>Loading...</p>}
                <button
                    type='button'
                    className={classes.toggle}
                    onClick={switchAuthModeHandler}
                >
                    {isLogin ? 'Create new account' : 'Login with existing account'}
                </button>
                </div>
            </form>
            {httpError && <p className={classes.error}>Something went wrong! Check entered data and try again</p>}
        </section>
    );

}
export default AuthForm;