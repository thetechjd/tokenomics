import { useState, useContext } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar"
import 'react-pro-sidebar/dist/css/styles.css'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { WalletContext } from '../../context/WalletContext'
import { Link } from "react-router-dom"
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";


const Item = ({ title, to, icon, selected, setSelected, changeView }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


  
    return (
        <MenuItem
            active={selected === title}
            style={{ color: colors.grey[100] }}
            onClick={() => {
                setSelected(title);
                changeView(title);

                
            }}
            icon={icon}
        >
            <Typography>{title}</Typography>
        </MenuItem>
    )


}



const SideBar = ({ toggleCharts }) => {
    const { walletAddress, setWalletAddress } = useContext(WalletContext);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");


    const changeView = (title) => { 
        console.log(title)
        toggleCharts(title)
    }

    const disconnect = () => {
        setWalletAddress("")
    }

    return (
        <div class='sidebar'>
        <Box

        
            sx={{
                "& .pro-sidebar": {
                    height: "100vw !important",
                    //left: "-5vw !important",
                    width: "10vw !important",
                    minWidth: "240px !important",
                    //background: `#6870fa !important`,
                },

                "& .pro-siderbar-inner": {
                    // background: `#6870fa !important`,

                },
                "& .pro-sidebar-layout": {
                    overflowY: "hidden !important",
                    background: `${colors.primary[800]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important"
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important"
                },
                "& .pro-inner-item.hover": {
                    color: "#868dfb !important"
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important"
                }
            }}
        >
            <ProSidebar

                collapsed={isCollapsed}>

                <Menu iconShape="square">
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],

                        }}
                    >
                        {!isCollapsed && (

                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h3">
                                    ASCENDANT
                                </Typography>
                                <IconButton>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {/* USER */}
                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    src={"/assets/user.png"}
                                    style={{ cursor: "pointer", borderRadius: "50%" }}

                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ m: "10px 0 0 0" }}></Typography>

                            </Box>
                        </Box>
                    )}

                    {/* MENU ITEMS */}

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Dashboard"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            changeView={changeView}
                        />
                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}>
                            Account
                        </Typography>
                        <Item
                            title="Settings"
                            icon={<SettingsOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            changeView={changeView}
                        
                        />
{/*}
                        <Item
                            title={walletAddress.length > 0 ? (
                                <Box onClick={disconnect}>
                                    {String(walletAddress).substring(0, 6)}
                                    {"....."}
                                    {String(walletAddress).substring(39)}
                                </Box>
                            ) : (
                                <>
                                    Wallet
                                </>
                            )}
                            icon={<AccountBalanceWalletOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            
                            />*/}


                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}>
                            Charts
                        </Typography>
                        <Item
                            title="Tokenomics Builder"
                            icon={<AssessmentOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            changeView={changeView}
                        />
                        <Item
                            title="Utility"
                            icon={<BuildOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            changeView={changeView}
                        />
                        <Item
                            title="Allocation"
                            icon={<PieChartOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            changeView={changeView}
                        />
                        <Item
                            title="PPR"
                            icon={<TimelineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            changeView={changeView}
                        />
                        <Item
                            title="Price"
                            icon={<MonetizationOnOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            changeView={changeView}
                        />
                        <Item
                            title="Investment"
                            icon={<AccountBalanceOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            changeView={changeView}
                        />
                    </Box>

                </Menu>
            </ProSidebar>

        </Box>
        </div>
    )
}

export default SideBar;