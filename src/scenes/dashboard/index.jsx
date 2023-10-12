import { useState, useEffect } from 'react';
import { Box, Typography } from "@mui/material"
import { useTheme } from "@mui/material"
import { tokens } from "../../theme"
import Header from "../../components/Header"
import BarChart from "../../components/BarChart"
import Scatterplot from "../../components/Scatterplot"
import PieChart from "../../components/PieChart"
import TotalFunded from "../../components/TotalFunded"
import Ratio from "../../components/Ratio"
import Form from "../../components/Form"
import Settings from "../../components/Settings"
//import Verify from "../../components/Login/Verify"
import LoginModal from "../../components/Login/LoginModal"



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

                <Box display="flex" margin="auto" justifyContent="center">
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
                </Box>
            )}
            <Box m="20px">
                <Box display="flex" textTransform="uppercase" justifyContent="space-between" alignItems="center">
                    <Header title={(title.length === 0 || title === "Dashboard") ? "DASHBOARD" : `${title}`} />


                </Box>

                {/* GRID & CHARTS */}



                <Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"

                    gap="20px">

                    {/*ROW 1 */}


                    {(title.length === 0 || title === "Utility" || title === "Dashboard") && (
                        <Box onClick={() => { togglePanel("Utility") }} gridColumn={title === "Utility" ? "span 12" : "span 8"} gridRow="span 2" display="flex" height={title === "Utility" ? "90vh" : "60vh"} margin="0 0" backgroundColor={colors.primary[600]} sx={{ cursor: "pointer" }}>
                            <BarChart
                                title={title}
                                toggleCharts={toggleCharts}
                            />
                        </Box>
                    )}


                    {(title.length === 0 || title === "Allocation" || title === "Dashboard") && (
                        <Box onClick={() => { togglePanel("Allocation") }} gridColumn={title === "Allocation" ? "span 12" : "span 4"} gridRow="span 2" display="flex" flexDirection="column" height={title === "Allocation" ? "90vh" : "60vh"} p="1rem" margin="0 0" backgroundColor={colors.primary[600]} sx={{ cursor: "pointer" }}>
                            <Typography variant="h6" display="flex" justifyContent="center" alignText="center">Avg. Allocations</Typography>
                            <PieChart
                                title={title}
                                toggleCharts={toggleCharts}
                            />
                        </Box>

                    )}

                    {(title.length === 0 || title === "PPR" || title === "Dashboard") && (
                        <Box onClick={() => { togglePanel("PPR") }} gridColumn={title === "PPR" ? "span 12" : "span 6"} display="flex" height={title === "PPR" ? "90vh" : "40vh"} margin="0 0" backgroundColor={colors.primary[600]} sx={{ cursor: "pointer" }}>
                            <Ratio
                                title={title}
                                toggleCharts={toggleCharts}
                            />
                        </Box>
                    )}

                    {(title.length === 0 || title === "Price" || title === "Dashboard") && (

                        <Box onClick={() => { togglePanel("Price") }} gridColumn={title === "Price" ? "span 12" : "span 6"} gridRow="span 2" display="flex" height={title === "Price" ? "90vh" : "40vh"} margin="0 0" backgroundColor={colors.primary[600]} sx={{ cursor: "pointer" }}>
                            <Scatterplot
                                title={title}
                                toggleCharts={toggleCharts}
                            />
                        </Box>
                    )}

                    {(title.length === 0 || title === "Investment" || title === "Dashboard") && (

                        <Box onClick={() => { togglePanel("Investment") }} gridColumn="span 12" gridRow="span 2" display="flex" height={title === "Investment" ? "90vh" : "60vh"} margin="0 0" p="1rem" backgroundColor={colors.primary[600]} sx={{ cursor: "pointer" }}>
                            <TotalFunded
                                title={title}
                                toggleCharts={toggleCharts}
                            />
                        </Box>
                    )}


                    {title === "Your Tokenomics" && (
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





                </Box>









            </Box>
        </>
    )
}

export default Dashboard;