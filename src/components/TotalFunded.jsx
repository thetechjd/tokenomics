import { useTheme } from "@mui/material";
import { useState } from 'react';
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { icoData as data } from "../data/ico_data";
import { Box, Typography } from "@mui/material"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"


const TotalFunded = ({ title, toggleCharts }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [inBusiness, setInBusiness] = useState(false);
    const [year, setYear] = useState("")
    const [byYear, setByYear] = useState(false)
    const [byUtility, setByUtility] = useState("")



    const sortData = () => {
        let newData = [
            {
                network: "Ethereum",
                Ethereum: 0
            },
            {
                network: "Binance",
                Binance: 0
            },
            {
                network: "Polygon",
                Polygon: 0
            },
            {
                network: "Solana",
                Solana: 0
            },
            {
                network: "Cardano",
                Cardano: 0
            },
            {
                network: "Arbitrum",
                Arbitrum: 0
            },
            {
                network: "Cosmos",
                Cosmos: 0
            },
            {
                network: "Algorand",
                Algorand: 0
            },
            {
                network: "Other",
                Other: 0
            },
        ]
        data.forEach(x => {
            newData.forEach(y => {
                if (byUtility.length > 0) {


                    if (x.Class.toLowerCase() === byUtility) {
                        if (x.Network === y.network) {
                            y[`${y.network}`] += parseFloat(Number(x.Amount_Received.replace('$', '').replace(/,/g, '')))
                        }
                    }
                } else {
                    if (x.Network === y.network) {
                        y[`${y.network}`] += parseFloat(Number(x.Amount_Received.replace('$', '').replace(/,/g, '')))
                    }
                }
            })
        })
        console.log(newData)
        return newData;
    }

    return (

        <Box width="100%" position="relative">
            {title === "Investment" && (
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
                    'Solana',
                    'Polygon',
                    'Other',
                    'Ethereum',
                    'Cosmos',
                    'Cardano',
                    'Binance',
                    'Arbitrum',
                    'Algorand',
                ]}
                indexBy="network"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'greens' }}
                yFormat=" >-.2f"
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
                    legend: 'Total Funded By Network',
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

            {title === "Investment" && (
                <Box justifyContent="start" textAlign="start" width="50%" marginTop="1rem">
                    <Typography variant="h3">Filter By Utility</Typography>
                    <select
                        required
                        onChange={e => { setByUtility(e.target.value); console.log(e.target.value) }}
                        style={{ width: "75%", backgroundColor: `${colors.primary[700]}`, color: `${colors.primary[100]}`, padding: "5px 8px", borderRadius: "8px" }}>
                        <option value="">Any</option>
                        <option value="ai">AI</option>
                        <option value="defi">DEFI</option>
                        <option value="gamefi">GAMEFI</option>
                        <option value="launchpad">LAUNCHPAD</option>
                        <option value="metaverse">METAVERSE</option>

                    </select>
                </Box>

            )}
        </Box>
    )


}

export default TotalFunded;