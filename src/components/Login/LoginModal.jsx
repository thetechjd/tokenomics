import { useRef, useEffect, useContext, useState } from 'react';
import Input from './Input'
import { Box, Typography } from "@mui/material"
//import HidePassword from './HidePassword'
import { useTheme } from "@mui/material"
import { tokens } from "../../theme"


export default function LoginModal({
    signIn,
    signUp,
    showLoginModal,
    setReset,
    variant,
    toggleVariant,
    email,
    setEmail,
    password,
    pwCheck,
    setPassword,
    handlePassword,
    handlePwCheck,
    loginMessage,
    resetPassword,
    reset
}) {
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [show, setShow] = useState(false)



    const wrapperRef = useRef(null);


    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                showLoginModal(false);
                setReset(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    const togglePw = () => {
        setShow(!show)
      }
    





    return (
        <>
            {/*<div className='absolute bg-black w-full bg-transparent z-0'>*/}

            <Box position="absolute" display="flex" alignItems="center" width="100%" justifyContent="center">
                <div ref={wrapperRef} style={{zIndex:"3", position: "relative", backgroundColor: "black", justifyContent: "center", alignItems:"center", padding: "2.5rem 4rem", width: "50%"}} >
                    <div onClick={() => { showLoginModal(false); setReset(false) }} style={{display: "flex", right: "0", justifyContent: "end", cursor: "pointer"}} >
                        <p className='text-white'>X</p>
                    </div>
                    <p style={{fontSize: "24px", color: "whitesmoke" }}>
                        {variant === 'login' ? 'SIGN IN' : 'REGISTER'}
                    </p>
                    <div style={{display: "flex", flexDirection: "column", gap:"16px" }} >
                        {variant === 'register' ? (
                            <>




                                <Input
                                    label="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    id='email'
                                    type='email'
                                    value={email}

                                />
                                
                                    <Input
                                        style={{ border: loginMessage ? "#fff" : null }}
                                        label="Password"
                                        onChange={(e) => handlePassword(e.target.value)}
                                        id='password'
                                        type={show ? 'text' : 'password'}
                                        value={password}
                                        error={loginMessage ? true : false}
                                        show={show}
                                        togglePw={togglePw}



                                    />
                                    
                                   

                               

                                <p style={{fontSize: "12px", color: colors.redAccent[500]}}>{loginMessage}</p>
                               
                                    <Input
                                        label="Re-Type Password"
                                        onChange={(e) => handlePwCheck(e.target.value)}
                                        id='pwcheck'
                                        type={show ? 'text' : 'password'}
                                        value={pwCheck}
                                        error={loginMessage ? true : false}
                                        show={show}
                                        togglePw={togglePw}


                                    />

                                    

                              

                            </>
                        ) : (
                            <>



                                <Input
                                    label="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    id='email'
                                    type='email'
                                    value={email}

                                />
                                <p style={{fontSize: "12px", color: colors.redAccent[500]}}>{loginMessage}</p>

                                {!reset && (
                                   
                                        <Input
                                            label="Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            id='password'
                                            type={show ? 'text' : 'password'}
                                            value={password}
                                            show={show}
                                            togglePw={togglePw}
                                        />

                                       

                                   
                                )}




                            </>
                        )}
                    </div>

                    {reset ? (
                        <>
                            <button onClick={resetPassword} style={{backgroundColor: colors.redAccent[600], padding: "0.75rem 1rem", color: "whitesmoke", border: "none", borderRadius: "10px", marginTop: "2.5rem", cursor: "pointer"}} >
                                Reset Password
                            </button>

                            {loginMessage && (
                                <p style={{color: colors.redAccent[500]}}>{loginMessage}</p>
                            )}
                        </>

                    ) : (
                        <button onClick={variant === 'login' ? signIn : signUp} style={{backgroundColor: colors.blueAccent[500], border: "none", padding: "0.75rem 1rem", width: "100%", color: "whitesmoke", marginTop: "2.5rem", cursor: "pointer"}} >

                            {variant === 'login' ? 'Login' : 'Sign up'}
                        </button>
                    )}


                    <p style={{color: "whitesmoke"}}>
                        {variant === 'register' ? 'Already have an account?' : 'Don\'t have and account yet?'}

                        <span onClick={toggleVariant} style={{marginLeft: "4px", textDecoration: "underline", cursor: "pointer", color: "whitesmoke"}} >
                            {variant === 'register' ? 'Sign in' : 'Create an account'}
                        </span>
                    </p>
                    <p style={{color: "whitesmoke"}}>
                        {!reset && (
                            <span onClick={setReset} style={{marginLeft: "4px", textDecoration: "underline", cursor: "pointer", color: "whitesmoke"}}>
                                Reset Password
                            </span>
                        )}

                    </p>
                </div>
            </Box>

            {/*}</div>*/}
        </>

    )
}