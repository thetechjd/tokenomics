import React from 'react';





const HidePassword = ({togglePw, show}) => {
    return (
        <span style={{display: "flex", width: "20%", backgroundColor: "#020617", borderRadius: "0px 10px 10px 0px", justifyContent: "center", alignItems: "center"}} >
        <img onClick={togglePw} style={{width: "20px"}} src={show ? '/src/assets/eye_closed.png': '/src/assets/eye_open.png'}/>
     </span>
    )
}

export default HidePassword;