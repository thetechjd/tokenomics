import { useTheme } from "@mui/material"
import { tokens } from "../../theme"


  const Verify = ({showVerificationWall}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    
    
    return (
        <div style={{overflowY: "hidden"}} className='bubble-wrap'>
            <div className='bubble-wrap-container'>
                

                <div style={{marginTop: "5rem", borderRadius: "10px", border: "1px solid gray", alignItems: "center" }} className='bubble-wrap-user'>
                    <p>Please check your email. A verification email has been sent to the address provided.</p>
                    <button style={{display: "flex", border: "none", backgroundColor: colors.blueAccent[500], margin: "2rem auto", textAlign: "center", justifyContent: "center", borderRadius: "10px", width: "50%", padding: "0.75rem 1rem", color: "whitesmoke", cursor: "pointer"}} onClick={() => { showVerificationWall(false)}}>SIGN IN</button>
                </div>

                <ul className="bg-bubbles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>

            </div>
        </div>
    )
}


export default Verify;