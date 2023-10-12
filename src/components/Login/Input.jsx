import React, { useState } from 'react';
import HidePassword from './HidePassword'
import { Box, Typography } from "@mui/material"
import { useTheme } from "@mui/material"
import { tokens } from "../../theme"



const Input = ({
    id,
    onChange,
    value,
    label,
    type,
    error,
    show,
    togglePw

}) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);



    return (
        <Box position="relative" width="100%" >
            <Box display="flex" flexDirection="row" justifyContent="space-between">
                <input
                    onChange={onChange}
                    type={type}
                    value={value}
                    id={id}
                    error={error}
                    show={show}
                    togglePw={togglePw}
                    style={{ 
                        borderTopRightRadius: id === 'password' || id === 'pwcheck' ? "0px" : null, 
                        borderBottomRightRadius: id === 'password' || id === 'pwcheck' ? "0px" : null, 
                        borderColor: error ? "red" : null, 
                        borderWidth: error ? "2px" : null,
                        display: "block",
                        borderRadius: "10px",
                        paddingTop: "1.5rem",
                        paddingBottom: "4px",
                        paddingLeft: "1.5rem",
                        paddingRight: "1.5rem",
                        width: "100%",
                        backgroundColor: "#020617",
                        color: "white",
                        border: "none"
                     }}
                    className=''
        
        
                    placeholder=' '
                />
                <label
                style={{
                    position: "absolute",
                    color: colors.greenAccent[500],
                    cursor: "pointer",
                    transform: "translateY(-0.75rem) scale(.75)",
                    top: "1rem",
                    transformOrigin: "center"
                }}
                    


                    htmlFor={id}
                >
                    {label}

                </label>
                {(id === 'password' || id === 'pwcheck') && (
                    <HidePassword
                        togglePw={togglePw}
                        show={show}
                    />

                )}

            </Box>
        </Box>
    )
}

export default Input;