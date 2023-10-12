import { useTheme } from "@mui/material";
import { Box, Typography } from "@mui/material"
import { useState } from 'react';
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { tokens } from "../theme";
import { icoData as data } from "../data/ico_data";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"

const Scatterplot = ({ title, toggleCharts }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [inBusiness, setInBusiness] = useState(false);
    const [year, setYear] = useState("")
    const [byYear, setByYear] = useState(false)
    const [byNetwork, setByNetwork] = useState("")

    let newData = [
        {
            id: "Ethereum",
            data: [

            ]
        },
        {
            id: "Binance",
            data: [

            ]
        },
        {
            id: "Polygon",
            data: [

            ]
        },
        {
            id: "Solana",
            data: [

            ]
        },
        {
            id: "Cardano",
            data: [

            ]
        },
        {
            id: "Arbitrum",
            data: [

            ]
        },
        {
            id: "Cosmos",
            data: [

            ]
        },
        {
            id: "Algorand",
            data: [

            ]
        },
        {
            id: "Other",
            data: [

            ]
        }
    ]

    const sortData = () => {


        data.forEach(x => {
            if (x.Network === "Ethereum") {
                newData.forEach(y => {
                    if (x.Network === y.id) {
                        if (inBusiness) {
                            if (x.Still_in_Business === 'Y') {
                                y.data.push({
                                    x: parseFloat(Number(x.ICO_Price_USD.replace('$', '').replace(/,/g, ''))),
                                    y: parseFloat(Number(x.Market_Cap.replace('$', '').replace(/,/g, '')))
                                })
                            }
                        } else {
                            y.data.push({
                                x: parseFloat(Number(x.ICO_Price_USD.replace('$', '').replace(/,/g, ''))),
                                y: parseFloat(Number(x.Market_Cap.replace('$', '').replace(/,/g, '')))
                            })
                        }
                    }
                })
            }
            else if (x.Network === "Binance") {
                newData.forEach(y => {
                    if (x.Network === y.id) {
                        if (inBusiness) {
                            if (x.Still_in_Business === 'Y') {
                                y.data.push({
                                    x: parseFloat(Number(x.ICO_Price_USD.replace('$', '').replace(/,/g, ''))),
                                    y: parseFloat(Number(x.Market_Cap.replace('$', '').replace(/,/g, '')))
                                })
                            }
                        } else {
                            y.data.push({
                                x: parseFloat(Number(x.ICO_Price_USD.replace('$', '').replace(/,/g, ''))),
                                y: parseFloat(Number(x.Market_Cap.replace('$', '').replace(/,/g, '')))
                            })
                        }
                    }
                })
            }
            else if (x.Network === "Polygon") {
                newData.forEach(y => {
                    if (x.Network === y.id) {
                        if (inBusiness) {
                            if (x.Still_in_Business === 'Y') {
                                y.data.push({
                                    x: parseFloat(Number(x.ICO_Price_USD.replace('$', '').replace(/,/g, ''))),
                                    y: parseFloat(Number(x.Market_Cap.replace('$', '').replace(/,/g, '')))
                                })
                            }
                        } else {
                            y.data.push({
                                x: parseFloat(Number(x.ICO_Price_USD.replace('$', '').replace(/,/g, ''))),
                                y: parseFloat(Number(x.Market_Cap.replace('$', '').replace(/,/g, '')))
                            })
                        }
                    }
                })
            }
            else if (x.Network === "Cardano") {
                newData.forEach(y => {
                    if (x.Network === y.id) {
                        if (inBusiness) {
                            if (x.Still_in_Business === 'Y') {
                                y.data.push({
                                    x: parseFloat(Number(x.ICO_Price_USD.replace('$', '').replace(/,/g, ''))),
                                    y: parseFloat(Number(x.Market_Cap.replace('$', '').replace(/,/g, '')))
                                })
                            }
                        } else {
                            y.data.push({
                                x: parseFloat(Number(x.ICO_Price_USD.replace('$', '').replace(/,/g, ''))),
                                y: parseFloat(Number(x.Market_Cap.replace('$', '').replace(/,/g, '')))
                            })
                        }
                    }
                })
            }
            else if (x.Network === "Solana") {
                newData.forEach(y => {
                    if (x.Network === y.id) {
                        if (inBusiness) {
                            if (x.Still_in_Business === 'Y') {
                                y.data.push({
                                    x: parseFloat(Number(x.ICO_Price_USD.replace('$', '').replace(/,/g, ''))),
                                    y: parseFloat(Number(x.Market_Cap.replace('$', '').replace(/,/g, '')))
                                })
                            }
                        } else {
                            y.data.push({
                                x: parseFloat(Number(x.ICO_Price_USD.replace('$', '').replace(/,/g, ''))),
                                y: parseFloat(Number(x.Market_Cap.replace('$', '').replace(/,/g, '')))
                            })
                        }
                    }
                })
            }
            else if (x.Network === "Cosmos") {
                newData.forEach(y => {
                    if (x.Network === y.id) {
                        if (inBusiness) {
                            if (x.Still_in_Business === 'Y') {
                                y.data.push({
                                    x: parseFloat(Number(x.ICO_Price_USD.replace('$', '').replace(/,/g, ''))),
                                    y: parseFloat(Number(x.Market_Cap.replace('$', '').replace(/,/g, '')))
                                })
                            }
                        } else {
                            y.data.push({
                                x: parseFloat(Number(x.ICO_Price_USD.replace('$', '').replace(/,/g, ''))),
                                y: parseFloat(Number(x.Market_Cap.replace('$', '').replace(/,/g, '')))
                            })
                        }
                    }
                })
            }
            else if (x.Network === "Arbitrum") {
                newData.forEach(y => {
                    if (x.Network === y.id) {
                        if (inBusiness) {
                            if (x.Still_in_Business === 'Y') {
                                y.data.push({
                                    x: parseFloat(Number(x.ICO_Price_USD.replace('$', '').replace(/,/g, ''))),
                                    y: parseFloat(Number(x.Market_Cap.replace('$', '').replace(/,/g, '')))
                                })
                            }
                        } else {
                            y.data.push({
                                x: parseFloat(Number(x.ICO_Price_USD.replace('$', '').replace(/,/g, ''))),
                                y: parseFloat(Number(x.Market_Cap.replace('$', '').replace(/,/g, '')))
                            })
                        }
                    }
                })
            }
            else if (x.Network === "Algorand") {
                newData.forEach(y => {
                    if (x.Network === y.id) {
                        if (inBusiness) {
                            if (x.Still_in_Business === 'Y') {
                                y.data.push({
                                    x: parseFloat(Number(x.ICO_Price_USD.replace('$', '').replace(/,/g, ''))),
                                    y: parseFloat(Number(x.Market_Cap.replace('$', '').replace(/,/g, '')))
                                })
                            }
                        } else {
                            y.data.push({
                                x: parseFloat(Number(x.ICO_Price_USD.replace('$', '').replace(/,/g, ''))),
                                y: parseFloat(Number(x.Market_Cap.replace('$', '').replace(/,/g, '')))
                            })
                        }
                    }
                })
            }
            else {
                newData.forEach(y => {
                    if (y.id === "Other") {
                        if (inBusiness) {
                            if (x.Still_in_Business === 'Y') {
                                y.data.push({
                                    x: parseFloat(Number(x.ICO_Price_USD.replace('$', '').replace(/,/g, ''))),
                                    y: parseFloat(Number(x.Market_Cap.replace('$', '').replace(/,/g, '')))
                                })
                            }
                        } else {
                            y.data.push({
                                x: parseFloat(Number(x.ICO_Price_USD.replace('$', '').replace(/,/g, ''))),
                                y: parseFloat(Number(x.Market_Cap.replace('$', '').replace(/,/g, '')))
                            })
                        }
                    }
                })
            }
        })


        if (byNetwork.length > 0) {
            let filteredData = [];
            newData.forEach(x => {
                if (x.id.toLowerCase() === byNetwork) {
                    filteredData.push(x)
                }
            })
            return filteredData;
        }
        else {

            console.log(newData)
            return newData
        }
    }

    // sortData();


    return (
        <Box width="100%" position="relative">
            {title === "Price" && (
                <div onClick={() => { toggleCharts("Dashboard") }} style={{ display: "flex", top: "0", right: "0", zIndex: "2", alignItem: "start", position: "absolute", justifyContent: "end", padding: "1rem", cursor: "pointer" }}>

                <DeleteOutlinedIcon />
            </div>
            )}
            
            <ResponsiveScatterPlot
                data={sortData()}
                theme={{
                    axis: {
                        domain: {
                            line: {
                                stroke: colors.grey[100],
                            },
                        },
                        legend: {
                            text: {
                                fill: colors.grey[100],
                            },
                        },
                        ticks: {
                            line: {
                                stroke: colors.grey[100],
                                strokeWidth: 1,
                            },
                            text: {
                                fill: colors.grey[100],
                            },
                        },
                    },
                    legends: {
                        text: {
                            fill: colors.grey[100],
                        },
                    },
                }}
                margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
                xScale={{ type: 'linear', min: 0, max: 'auto' }}
                xFormat=">-.2f"
                yScale={{ type: 'linear', min: 0, max: 'auto' }}
                yFormat=">-.2f"
                colors={{ scheme: 'accent' }}
                blendMode="normal"
                enableGridX={false}
                enableGridY={false}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'ICO Price',
                    legendPosition: 'middle',
                    legendOffset: 46
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Market Cap',
                    legendPosition: 'middle',
                    legendOffset: -75
                }}
                isInteractive={false}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 130,
                        translateY: 0,
                        itemWidth: 100,
                        itemHeight: 12,
                        itemsSpacing: 5,
                        itemDirection: 'left-to-right',
                        symbolSize: 12,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
            {title === "Price" && (
                <Box justifyContent="start" textAlign="start" width="50%" marginTop="1rem">
                    <Typography variant="h3">Filter By Network</Typography>
                    <select
                        required
                        onChange={e => { setByNetwork(e.target.value); console.log(e.target.value) }}
                        style={{ width: "75%", backgroundColor: `${colors.primary[500]}`, color: `${colors.primary[100]}`, padding: "5px 8px", borderRadius: "8px" }}>
                        <option value="">All</option>
                        <option value="ethereum">Ethereum</option>
                        <option value="binance">Binance</option>
                        <option value="polygon">Polygon</option>
                        <option value="cardano">Cardano</option>
                        <option value="arbitrum">Arbitrum</option>
                        <option value="solana">Solana</option>
                        <option value="cosmos">Cosmos</option>
                        <option value="algorand">Algorand</option>
                        <option value="other">Other</option>
                    </select>
                </Box>

            )}
        </Box>
    )
}



export default Scatterplot;