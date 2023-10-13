import { useState, useCallback } from 'react'
import { ColorModeContext, useMode } from './theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Routes, Route } from "react-router-dom"
import TopBar from './scenes/globals/TopBar'
import SideBar from './scenes/globals/SideBar'
import Verify from './components/Login/Verify'
import { WalletContext } from "./context/WalletContext"
import { ProviderContext } from "./context/ProviderContext"
import { UserContext } from "./context/UserContext"
import { LoginContext } from "./context/LoginContext"
import Dashboard from './scenes/dashboard'

import './App.css'

import { getFirestore } from "firebase/firestore";
//import { ref, getStorage, uploadBytes } from "firebase/storage";
import { doc, updateDoc, addDoc, deleteDoc, getDoc, getDocs, collection, query, where } from "firebase/firestore";
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth';


import firebaseConfig from "./utils/firebaseConfig";


console.log(firebaseConfig)



const app = initializeApp(firebaseConfig)

const auth = getAuth()







function App() {
  const [theme, colorMode] = useMode();
  const [title, setTitle] = useState('');
  const [walletAddress, setWalletAddress] = useState("")
  const [provider, setProvider] = useState();
  const [userInfo, setUserInfo] = useState([])

  const [user, setUser] = useState(false)
  const [login, setLogin] = useState(false)
  const [loginMessage, setLoginMessage] = useState('');
  const [loginModal, setLoginModal] = useState(false);

  const [verificationWall, setVerificationWall] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [variant, setVariant] = useState('login')
  const [reset, setReset] = useState(false);
  const [pwCheck, setPwCheck] = useState('')


  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
  }, [])



  const toggleCharts = (title) => {
    console.log(title)

    setTitle(title)

  }

  const showVerificationWall = (bool) => {
    setVerificationWall(bool)
  }

  const showLoginModal = (bool) => {
    setLoginModal(bool)
  }

  const handlePassword = (value) => {
    setLoginMessage('')
    if (value.length < 8) {
      setLoginMessage('Password must be at least 8 characters.')
    }
    setPassword(value);



  }

  const handlePwCheck = (check) => {
    setLoginMessage('')
    if (password !== check) {
      setLoginMessage('Passwords don\'t match!')
    }
    setPwCheck(check)

  }


  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {




        // Signed in 
        const user = userCredential.user;
        console.log(user);
        sendEmailVerification(user);
        setUser(user);
        setUser({ emailVerified: false })
        showLoginModal(false)
        showVerificationWall(true)


      })
      .catch ((error) => {
        setLoginMessage('Error signing up. Do you already have an account?')
      })
  }


  const signIn = () => {
    setLoginMessage('')
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        if(userCredential.user.emailVerified === false){
          setLoginMessage('Error signing in. Did you verify your account?')
        } else {

        setUser(user);
        showLoginModal(false)
        
        console.log(user);
        }

        

       


      })
      .catch((error) => {
        
        setLoginMessage('Error signing in. Did you verify your account?')
       
        const errorCode = error.code;
        const errorMessage = error.message;
      });

  }

  const logOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      
      setEmail("")
      setPassword("")
      
      console.log("You are logged out");
    

    }).catch((error) => {
      // An error happened.
    });
  }

  const resetPassword = () => {
    setTimeout(() => {
      setLoginMessage('')
    }, 5000
    )

    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent
        setLoginMessage('A reset email has been sent to your email address!')
      })
      .catch((error) => {
        // An error occurred while sending the password reset email
        console.log(error)
      });
  }






  return (

    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <WalletContext.Provider value={{ walletAddress, setWalletAddress }}>
          <ProviderContext.Provider value={{ provider, setProvider }}>

            <UserContext.Provider value={{ user, setUser }}>
              <LoginContext.Provider value={{ login, setLogin }}>
              {verificationWall ? (
                <Verify

                    showVerificationWall={showVerificationWall}

                />
            ): (
              <div className="app">
               
              <SideBar toggleCharts={toggleCharts} />
              <main className="content">
                <TopBar
                  loginModal={loginModal}
                  showLoginModal={showLoginModal}
                  signUp={signUp}
                  signIn={signIn}
                  email={email}
                  logOut={logOut}
                  user={user}
                />
                <Routes>
                  <Route path="/"
                    element={
                      <Dashboard
                        title={title}
                        toggleCharts={toggleCharts}
                        loginModal={loginModal}
                        showLoginModal={showLoginModal}
                        verificationWall={verificationWall}
                        showVerificationWall={showVerificationWall}
                        toggleVariant={toggleVariant}
                        variant={variant}
                        reset={reset}
                        setReset={setReset}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        pwCheck={pwCheck}
                        handlePassword={handlePassword}
                        handlePwCheck={handlePwCheck}
                        loginMessage={loginMessage}
                        resetPassword={resetPassword}
                        signUp={signUp}
                        signIn={signIn}
                        user={user}
                      />} />
                 
                </Routes>
              </main>

            </div>

            )}
             
               
              </LoginContext.Provider>
            </UserContext.Provider>
          </ProviderContext.Provider>
        </WalletContext.Provider>
      </ThemeProvider>

    </ColorModeContext.Provider>

  )
}

export default App
