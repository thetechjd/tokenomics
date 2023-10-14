import { useState, useEffect } from 'react';
import { Box, Typography } from "@mui/material"
import { useTheme } from "@mui/material"
import { tokens } from "../../theme"
import Header from "../../components/Header"
import BarChart from "../../components/BarChart"
import Scatterplot from "../../components/Scatterplot"
import PieChart from "../../components/PieChart"
import TotalFunded from "../../components/TotalFunded/TotalFunded"
import Ratio from "../../components/Ratio"
import Form from "../../components/Form/Form"
import Settings from "../../components/Settings"
//import Verify from "../../components/Login/Verify"
import Bumper from "../globals/Bumper"
import LoginModal from "../../components/Login/LoginModal"
import "./index.css"



const Dashboard = ({
    toggleCharts,
    title,
    showVerificationWall,
    verificationWall,
    showLoginModal,
    loginModal,
    toggleVariant,
    variant,
    setReset,
    reset,
    email,
    password,
    setEmail,
    setPassword,
    pwCheck,
    handlePassword,
    handlePwCheck,
    loginMessage,
    signIn,
    signUp,
    resetPassword,
    user
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    //const [chartView, setChartView] = useState("")



    useEffect(() => {
        console.log(title);
    }, [title]);


    const togglePanel = (card) => {
        if (title === card) {
            return;
        } else {
            toggleCharts(card)
        }

    }






    return (
        <>

            {loginModal && (

                <div className="loginModal" >
                    <LoginModal
                        loginModal={loginModal}
                        showLoginModal={showLoginModal}
                        toggleVariant={toggleVariant}
                        variant={variant}
                        setReset={setReset}
                        reset={reset}
                        email={email}
                        password={password}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        handlePassword={handlePassword}
                        handlePwCheck={handlePwCheck}
                        pwCheck={pwCheck}
                        loginMessage={loginMessage}
                        signIn={signIn}
                        signUp={signUp}
                        resetPassword={resetPassword}



                    />
                </div>
            )}
            <div className="dashboard-container">
                <Box display="flex" textTransform="uppercase" justifyContent="space-between" alignItems="center">
                    <Header title={(title.length === 0 || title === "Dashboard") ? "DASHBOARD" : `${title}`} />


                </Box>

                {/* GRID & CHARTS */}



                <div
                    className='dashboard'>

                    {/*ROW 1 */}

                    {title !== "Tokenomics Builder" && (
                        <Bumper 
                        toggleCharts={toggleCharts}/>

                    )}
                   

                    {(title.length === 0 || title === "Utility" || title === "Dashboard") && (
                        <div className={`bar ${title === "Utility" ? "bar-alone" : ""}`} onClick={() => { togglePanel("Utility") }}  style={{display:"flex", height: title === "Utility" ? "90vh" : "60vh", margin: "0 0", backgroundColor: colors.primary[600], cursor: "pointer"  }} >
                            <BarChart
                                title={title}
                                toggleCharts={toggleCharts}
                            />
                        </div>
                    )}


                    {(title.length === 0 || title === "Allocation" || title === "Dashboard") && (
                        <div className={`pie ${title === "Allocation" ? "pie-alone" : ""}`} onClick={() => { togglePanel("Allocation") }} style={{display:"flex", flexDirection:"column", height: title === "Allocation" ? "90vh" : "60vh", padding:"1rem", margin:"0 0", backgroundColor: colors.primary[600], cursor: "pointer" }}>
                            <Typography variant="h6" display="flex" justifyContent="center" alignText="center">Avg. Allocations</Typography>
                            <PieChart
                                title={title}
                                toggleCharts={toggleCharts}
                            />
                        </div>

                    )}

                    {(title.length === 0 || title === "PPR" || title === "Dashboard") && (
                        <div className={`ppr ${title === "PPR" ? "ppr-alone" : ""}`} onClick={() => { togglePanel("PPR") }} style={{display:"flex", height: title === "PPR" ? "90vh" : "40vh", margin:"0 0", backgroundColor: colors.primary[600], cursor: "pointer" }}>
                            <Ratio
                                title={title}
                                toggleCharts={toggleCharts}
                            />
                        </div>
                    )}

                    {(title.length === 0 || title === "Price" || title === "Dashboard") && (

                        <div className={`price ${title === "Price" ? "price-alone": ""}`} onClick={() => { togglePanel("Price") }} style={{ display:"flex", height: title === "Price" ? "90vh" : "40vh", margin:"0 0", backgroundColor: colors.primary[600], cursor: "pointer" }}>
                            <Scatterplot
                                title={title}
                                toggleCharts={toggleCharts}
                            />
                        </div>
                    )}

                    {(title.length === 0 || title === "Investment" || title === "Dashboard") && (

                        <div className={`investment ${title === "Investment" ? "investment-alone": ""}`} onClick={() => { togglePanel("Investment") }} style={{display:"flex", height: title === "Investment" ? "90vh" : "60vh", margin:"0 0", padding:"1rem", backgroundColor: colors.primary[600], cursor: "pointer" }}>
                            <TotalFunded
                                title={title}
                                toggleCharts={toggleCharts}
                            />
                        </div>
                    )}


                    {title === "Tokenomics Builder" && (
                       
                        <Form

                            toggleCharts={toggleCharts}
                            user={user}
                            email={email}


                        />
                        
                    )}

                    {title === "Settings" && (
                        <Settings
                            title={title}
                            toggleCharts={toggleCharts}

                        />
                    )}





                </div>









            </div>
        </>
    )
}

export default Dashboard;