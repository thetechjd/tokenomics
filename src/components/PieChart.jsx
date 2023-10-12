import { useTheme } from "@mui/material";
import { useState } from 'react';
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { icoData as data } from "../data/ico_data";
import { Box, Typography } from "@mui/material"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"

const PieChart = ({title, toggleCharts}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [inBusiness, setInBusiness] = useState(false);
    const [year, setYear] = useState("")
    const [byYear, setByYear] = useState(false)
    const [byUtility, setByUtility] = useState("")
    const [network, setNetwork] = useState("");

    const sortData = () => {
        let counter = 0;
        const dataLength = data.length;
        

        if(byUtility.length > 0) {
            data.forEach(item => {
                if(item.Class.toLowerCase() === byUtility){
                    counter++;
                }
            })
        }
       

        if(network.length === 0){
            
            let newData = [
                {
                    id: "private",
                    label: "Private",
                    value: 0 
                },
                {
                    id: "public",
                    label: "Public",
                    value: 0 
                },
                {
                    id: "team",
                    label: "Team",
                    value: 0 
                },
                {
                    id: "partners",
                    label: "Partnerships & Advisors",
                    value: 0 
                },
                {
                    id: "ecosystem",
                    label: "Ecosystem",
                    value: 0 
                },
                {
                    id: "company",
                    label: "Company, Treasury & Development",
                    value: 0 
                },
                {
                    id: "marketing",
                    label: "Marketing & Airdrops",
                    value: 0 
                },
                {
                    id: "staking",
                    label: "Staking & Rewards",
                    value: 0 
                },
                {
                    id: "liquidity",
                    label: "Liquidity",
                    value: 0 
                },
            ]


            data.forEach(x => {
                newData.forEach(y => {
                    if(byUtility.length > 0){
                        

                        if(x.Class.toLowerCase() === byUtility){
                            if(y.id === "public"){
                                y.value += x.Public / counter
                            } else if (y.id === "private"){
                                y.value += x.Private / counter
                            } else if (y.id === "team"){
                                y.value += x.Team / counter
                            
                            } else if (y.id === "partners"){
                                y.value += x.Partnerships_Advisors / counter
                            
                            } else if (y.id === "ecosystem"){
                                y.value += x.Ecosystem / counter
                            
                            } else if (y.id === "company"){
                                y.value += x.Company_Treasury_Development / counter
                            
                            } else if (y.id === "marketing"){
                                y.value += x.Marketing_Airdrop / counter
                            
                            } else if (y.id === "staking"){
                                y.value += x.Staking_Rewards / counter
                            
                            } else if (y.id === "liquidity"){
                                y.value += x.Liquidity / counter
                            }

                        }
                    } else {

                        if(y.id === "public"){
                            y.value += x.Public / dataLength
                        } else if (y.id === "private"){
                            y.value += x.Private / dataLength
                        } else if (y.id === "team"){
                            y.value += x.Team / dataLength
                        
                        } else if (y.id === "partners"){
                            y.value += x.Partnerships_Advisors / dataLength
                        
                        } else if (y.id === "ecosystem"){
                            y.value += x.Ecosystem / dataLength
                        
                        } else if (y.id === "company"){
                            y.value += x.Company_Treasury_Development / dataLength
                        
                        } else if (y.id === "marketing"){
                            y.value += x.Marketing_Airdrop / dataLength
                        
                        } else if (y.id === "staking"){
                            y.value += x.Staking_Rewards / dataLength
                        
                        } else if (y.id === "liquidity"){
                            y.value += x.Liquidity / dataLength
                        }
                        


                    }
                    
                   
                   
                })
            })
            return newData;
        }
    }

    return(
        <div style={{position: "relative", height: "inherit"}}>
            {title === "Allocation" && (
                <div onClick={() => { toggleCharts("Dashboard") }} style={{ display: "flex", top: "0", right: "0", zIndex: "2", alignItem: "start", position: "absolute", justifyContent: "end", padding: "1rem", cursor: "pointer" }}>

                <DeleteOutlinedIcon />
            </div>
            )}
        <ResponsivePie
        data={sortData()}
        
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        arcLabel={e=>Number(e.value).toFixed(2)+"%"}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'paired' }}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={colors.primary[100]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        isInteractive={false}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        legends={[
            
        ]}
    />
     {title === "Allocation" && (
                <Box justifyContent="start" textAlign="start" width="50%" marginTop="1rem">
                    <Typography variant="h3">Filter By Utility</Typography>
                    <select
                        required
                        onChange={e => { setByUtility(e.target.value); console.log(e.target.value) }}
                        style={{ width: "75%", backgroundColor: `${colors.primary[500]}`, color: `${colors.primary[100]}`, padding: "5px 8px", borderRadius: "8px" }}>
                        <option value="">Any</option>
                        <option value="ai">AI</option>
                        <option value="defi">DEFI</option>
                        <option value="gamefi">GAMEFI</option>
                        <option value="launchpad">LAUNCHPAD</option>
                        <option value="metaverse">METAVERSE</option>
                       
                    </select>
                </Box>

            )}
    </div>

    )
}

export default PieChart;