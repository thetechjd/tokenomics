import { useTheme } from "@mui/material";
import { useState } from 'react';
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { icoData as data } from "../data/ico_data";
import { Box, Typography } from "@mui/material"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"


const BarChart = ({ title, toggleCharts }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [inBusiness, setInBusiness] = useState(false);
    const [year, setYear] = useState("")
    const [byYear, setByYear] = useState(false)
    const [byNetwork, setByNetwork] = useState("")



    const sortData = () => {
        let newData = [];

        if (byNetwork.length > 0) {
            console.log(byNetwork)
            newData = [
                {
                    class: "AI",
                    [byNetwork]: 0
                },
                {
                    class: "Launchpad",
                    [byNetwork]: 0
                },
                {
                    class: "GameFi",
                    [byNetwork]: 0
                },
                {
                    class: "Metaverse",
                    [byNetwork]: 0
                },
                {
                    class: "DeFi",
                    [byNetwork]: 0
                },
            ]
        } else {
            newData = [
                {
                    class: "AI",

                    ethereum: 0,
                    binance: 0,
                    polygon: 0,
                    cardano: 0,
                    arbitrum: 0,
                    algorand: 0,
                    cosmos: 0,
                    solana: 0,
                    other: 0

                },
                {
                    class: "Launchpad",

                    ethereum: 0,
                    binance: 0,
                    polygon: 0,
                    cardano: 0,
                    arbitrum: 0,
                    algorand: 0,
                    cosmos: 0,
                    solana: 0,
                    other: 0

                },
                {
                    class: "GameFi",

                    ethereum: 0,
                    binance: 0,
                    polygon: 0,
                    cardano: 0,
                    arbitrum: 0,
                    algorand: 0,
                    cosmos: 0,
                    solana: 0,
                    other: 0

                },
                {
                    class: "Metaverse",

                    ethereum: 0,
                    binance: 0,
                    polygon: 0,
                    cardano: 0,
                    arbitrum: 0,
                    algorand: 0,
                    cosmos: 0,
                    solana: 0,
                    other: 0

                },
                {
                    class: "DeFi",

                    ethereum: 0,
                    binance: 0,
                    polygon: 0,
                    cardano: 0,
                    arbitrum: 0,
                    algorand: 0,
                    cosmos: 0,
                    solana: 0,
                    other: 0

                },

            ]
        }




        let byYearArray = [];
        if (byYear) {
            data.forEach(z => {
                if (z.Year_Launched === year) byYearArray.push(z)
            })

        } else {

            const check = data.forEach(x => {

                if (byNetwork.length > 0) {
                    if (x.Network.toLowerCase() === byNetwork) {
                        newData.forEach(y => {
                            if (x.Class === y.class) {
                                if (inBusiness) {
                                    if (x.Still_in_Business === 'Y') {
                                        y[byNetwork]++;
                                        console.log(y[byNetwork])
                                    }
                                } else {
                                    y[byNetwork]++;
                                }
                            }
                        })
                    }

                } else {

                    if (x.Network === "Ethereum") {
                        newData.forEach(y => {
                            if (x.Class === y.class) {
                                if (inBusiness) {
                                    if (x.Still_in_Business === 'Y') {
                                        y.ethereum++;
                                    }
                                } else {
                                    y.ethereum++;
                                }
                            }
                        })
                    }
                    else if (x.Network === "Binance") {
                        newData.forEach(y => {
                            if (x.Class === y.class) {
                                if (inBusiness) {
                                    if (x.Still_in_Business === 'Y') {
                                        y.binance++;
                                    }
                                } else {
                                    y.binance++;
                                }

                            }
                        })
                    }
                    else if (x.Network === "Polygon") {
                        newData.forEach(y => {
                            if (x.Class === y.class) {
                                if (inBusiness) {
                                    if (x.Still_in_Business === 'Y') {
                                        y.polygon++;
                                    }
                                } else {
                                    y.polygon++;
                                }

                            }
                        })
                    }
                    else if (x.Network === "Arbitrum") {
                        newData.forEach(y => {
                            if (x.Class === y.class) {
                                if (inBusiness) {
                                    if (x.Still_in_Business === 'Y') {
                                        y.arbitrum++;
                                    }
                                } else {
                                    y.arbitrum++;
                                }

                            }
                        })
                    }
                    else if (x.Network === "Cardano") {
                        newData.forEach(y => {
                            if (x.Class === y.class) {
                                if (inBusiness) {
                                    if (x.Still_in_Business === 'Y') {
                                        y.cardano++;
                                    }
                                } else {
                                    y.cardano++;
                                }

                            }
                        })
                    }
                    else if (x.Network === "Solana") {
                        newData.forEach(y => {
                            if (x.Class === y.class) {
                                if (inBusiness) {
                                    if (x.Still_in_Business === 'Y') {
                                        y.solana++;
                                    }
                                } else {
                                    y.solana++;
                                }

                            }
                        })
                    }
                    else if (x.Network === "Algorand") {
                        newData.forEach(y => {
                            if (x.Class === y.class) {
                                if (inBusiness) {
                                    if (x.Still_in_Business === 'Y') {
                                        y.solana++;
                                    }
                                } else {
                                    y.solana++;
                                }

                            }
                        })
                    }
                    else if (x.Network === "Cosmos") {
                        newData.forEach(y => {
                            if (x.Class === y.class) {
                                if (inBusiness) {
                                    if (x.Still_in_Business === 'Y') {
                                        y.cosmos++;
                                    }
                                } else {
                                    y.cosmos++;
                                }

                            }
                        })
                    }
                    else if (x.Network === "Other") {
                        newData.forEach(y => {
                            if (x.Class === y.class) {
                                if (inBusiness) {
                                    if (x.Still_in_Business === 'Y') {
                                        y.other++;
                                    }
                                } else {
                                    y.other++;
                                }

                            }
                        })
                    }
                }
            })
        }
        console.log(newData)
        return newData

    }








    return (

        <Box width="100%" position="relative">
            {title === "Utility" && (
                <div onClick={() => { toggleCharts("Dashboard") }} style={{ display: "flex", top: "0", right: "0", zIndex: "2", alignItem: "start", position: "absolute", justifyContent: "end", padding: "1rem", cursor: "pointer" }}>

                    <DeleteOutlinedIcon />
                </div>
            )}

            <ResponsiveBar
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
                keys={[
                    'solana',
                    'polygon',
                    'other',
                    'ethereum',
                    'cosmos',
                    'cardano',
                    'binance',
                    'arbitrum',
                    'algorand',
                ]}
                indexBy="class"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'blues' }}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#38bcb2',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#eed312',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                fill={[
                    {
                        match: {
                            id: 'fries'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'sandwich'
                        },
                        id: 'lines'
                    }
                ]}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            '1.6'
                        ]
                    ]
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Utility',
                    legendPosition: 'middle',
                    legendOffset: 32,

                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                enableLabel={false}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
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
                isInteractive={false}
                role="application"
                ariaLabel="Nivo bar chart demo"
                barAriaLabel={e => e.network + ": " + e.formattedValue + " in country: " + e.indexValue}
            />
            {title === "Utility" && (
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

export default BarChart;