import { Box, Typography } from "@mui/material"
import { useTheme } from "@mui/material"
import {useState} from "react"
import { tokens } from "../../theme"
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined"
import AdbOutlinedIcon from "@mui/icons-material/AdbOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import WorkOutlinedIcon from "@mui/icons-material/WorkOutlined";

const Bumper = ({ toggleCharts }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [navOpen, setNavOpen] = useState(false)


    const handleNav = () => {
        if(navOpen) {
            setNavOpen(false)
        } else {
            setNavOpen(true)
            console.log('nav is open')
        }
    }

    return (
        <div className='bumper'>
            <div className="hambuger-menu-container">
                <div onClick={handleNav} className={`hamburger-menu ${navOpen ? "hamburger-menu--open nav--open": ""}`}>
                    <div className="hamburger-menu-line hamburger-menu-line-first"></div>
                    <div className="hamburger-menu-line hamburger-menu-line-second"></div>
                    <div className="hamburger-menu-line hamburger-menu-line-last"></div>
                   
                   
                    <nav  className={`nav ${navOpen ? "nav--open": ""}`}>
                        <nav onClick={() => {toggleCharts("Tokenomics Builder")}} className="nav-item">
                            <div className="nav-item-icon">
                                <AssessmentOutlinedIcon />
                            </div>
                            <span className="nav-item-text">Tokenomics Builder</span>
                        </nav>
                        <nav className="nav-item">
                        <a href="https://cryptocadet.app" target="_blank"><div className="nav-item-icon">
                                <AdbOutlinedIcon />
                            </div></a>
                            <span className="nav-item-text">CryptoCadet</span>
                        </nav>
                        <nav className="nav-item">
                        <a href="https://cryptocadet.app" target="_blank"><div className="nav-item-icon">
                                <SchoolOutlinedIcon />
                            </div></a>
                            <span className="nav-item-text">Academy</span>
                        </nav>
                        <nav className="nav-item">
                        <a href="https://ascendant.finance" target="_blank"><div className="nav-item-icon">
                                <WorkOutlinedIcon />
                            </div></a>
                            <span className="nav-item-text">Professional Services</span>
                        </nav>
                    </nav>
                </div>
            </div>

           {/*} <button style={{ backgroundColor: colors.blueAccent[500] }} onClick={() => { toggleCharts("Tokenomics Builder") }}>TOKENOMICS BUILDER</button>*/}
        </div>
    )

}

export default Bumper;