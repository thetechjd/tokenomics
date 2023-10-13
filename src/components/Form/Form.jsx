import { ResponsivePie } from "@nivo/pie";
import PieChart from "react-js-pie-chart";
import Slider from '@mui/material/Slider';
import LinearProgress from '@mui/material/LinearProgress';
import { useState, useEffect } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { MenuItem } from "react-pro-sidebar"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
import { icoData as data } from "../../data/ico_data";
import { TypeAnimation } from 'react-type-animation';
import { Configuration, OpenAIApi } from "openai";
import ProgressBar from "@ramonak/react-progress-bar";
import CountUp from 'react-countup';
import './form.css'



const Form = ({ toggleCharts, user, email }) => {
        const theme = useTheme();
        const colors = tokens(theme.palette.mode);
        const [priv, setPriv] = useState(0);
        const [pub, setPub] = useState(0);
        const [team, setTeam] = useState(0);
        const [partners, setPartners] = useState(0);
        const [ecosystem, setEcosystem] = useState(0);
        const [company, setCompany] = useState(0);
        const [marketing, setMarketing] = useState(0);
        const [staking, setStaking] = useState(0);
        const [liquidity, setLiquidity] = useState(0);
        const [policy, setPolicy] = useState("")
        const [network, setNetwork] = useState("");
        const [utility, setUtility] = useState("");
        const [supply, setSupply] = useState(0);
        const [price, setPrice] = useState(0);
        const [marketCap, setMarketCap] = useState(0);
        const [description, setDescription] = useState("")
        const [output, setOutput] = useState("");

        const [avgPrivate, setAvgPrivate] = useState(0);
        const [avgPublic, setAvgPublic] = useState(0);
        const [avgTeam, setAvgTeam] = useState(0);
        const [avgPartners, setAvgPartners] = useState(0);
        const [avgEcosystem, setAvgEcosystem] = useState(0);
        const [avgCompany, setAvgCompany] = useState(0);
        const [avgMarketing, setAvgMarketing] = useState(0);
        const [avgStaking, setAvgStaking] = useState(0);
        const [avgLiquidity, setAvgLiquidity] = useState(0);
        const [avgPrice, setAvgPrice] = useState(0);
        const [avgSupply, setAvgSupply] = useState(0);
        const [avgMarketCap, setAvgMarketCap] = useState(0);


        const [privBar, setPrivBar] = useState([{ type: "you", level: 0 }, { type: "avg", level: 0 }])
        const [pubBar, setPubBar] = useState([{ type: "you", level: 0 }, { type: "avg", level: 0 }])
        const [teamBar, setTeamBar] = useState([{ type: "you", level: 0 }, { type: "avg", level: 0 }])
        const [partnerBar, setPartnerBar] = useState([{ type: "you", level: 0 }, { type: "avg", level: 0 }])
        const [ecoBar, setEcoBar] = useState([{ type: "you", level: 0 }, { type: "avg", level: 0 }])
        const [compBar, setCompBar] = useState([{ type: "you", level: 0 }, { type: "avg", level: 0 }])
        const [markBar, setMarkBar] = useState([{ type: "you", level: 0 }, { type: "avg", level: 0 }])
        const [stakeBar, setStakeBar] = useState([{ type: "you", level: 0 }, { type: "avg", level: 0 }])
        const [liqBar, setLiqBar] = useState([{ type: "you", level: 0 }, { type: "avg", level: 0 }])
        const [priceBar, setPriceBar] = useState([{ type: "you", level: 0 }, { type: "avg", level: 0 }])
        const [supplyBar, setSupplyBar] = useState([{ type: "you", level: 0 }, { type: "avg", level: 0 }])

        const [buffer, setBuffer] = useState(null);
        const [bufferMessage, setBufferMessage] = useState('')
        const [showLoading, setShowLoading] = useState(false)

        const [pieData, setPieData] = useState();



        useEffect(() => {
                if (buffer) {
                        setBufferMessage('')
                }
                else {
                        setBufferMessage("Loading result...")
                }
        }, [showLoading])





        const makePie = () => {



                setPieData([
                        { value: priv, name: "Private" },
                        { value: pub, name: "Public" },
                        { value: team, name: "Team" },
                        { value: partners, name: "Partners" },
                        { value: company, name: "Company" },
                        { value: ecosystem, name: "Ecosystem" },
                        { value: marketing, name: "Marketing" },
                        { value: staking, name: "Staking" },
                        { value: liquidity, name: "Liquidity" },

                ])





        }



        const analyzeData = async (e) => {
                e.preventDefault();

                setBuffer(true)
                setShowLoading(true);

                setTimeout(async () => {

                        setBuffer(false)
                        setShowLoading(false);

                        let net = network;

                        if (!net.includes("ethereum", "binance", "polygon")) {
                                net = "other"
                        }

                        console.log("This is the selected network: " + net)



                        let counter = 0;

                        let averages =
                        {

                                private: 0,
                                public: 0,
                                team: 0,
                                partners: 0,
                                ecosystem: 0,
                                company: 0,
                                marketing: 0,
                                staking: 0,
                                liquidity: 0,
                                price: 0,
                                supply: 0,
                                marketCap: 0
                        }

                        data.forEach(x => {
                                if (net === "other") {
                                        if (utility === "other") {
                                                if (x.Class.toLowerCase() !== "defi" && x.Class.toLowerCase() !== "launchpad" && x.Class.toLowerCase() !== "gamefi" && x.Class.toLowerCase() !== "ai" && x.Class.toLowerCase() !== "metaverse") {
                                                        averages.private += x.Private;
                                                        averages.public += x.Public;
                                                        averages.team += x.Team;
                                                        averages.partners += x.Partnerships_Advisors;
                                                        averages.ecosystem += x.Ecosystem;
                                                        averages.company += x.Company_Treasury_Development;
                                                        averages.marketing += x.Marketing_Airdrop;
                                                        averages.staking += x.Staking_Rewards;
                                                        averages.liquidity += x.Liquidity;
                                                        averages.price += parseFloat(Number(x.ICO_Price_USD.replace('$', '').replace(/,/g, '')));
                                                        averages.supply += parseFloat(Number(x.Market_Cap.replace('$', '').replace(/,/g, ''))) / parseFloat(Number(x.ICO_Price_USD.replace('$', '').replace(/,/g, '')));
                                                        averages.marketCap += parseFloat(Number(x.Market_Cap.replace('$', '').replace(/,/g, '')));

                                                        counter++;
                                                }
                                        } else {
                                                if (x.Class.toLowerCase() === utility) {
                                                        averages.private += x.Private;
                                                        averages.public += x.Public;
                                                        averages.team += x.Team;
                                                        averages.partners += x.Partnerships_Advisors;
                                                        averages.ecosystem += x.Ecosystem;
                                                        averages.company += x.Company_Treasury_Development;
                                                        averages.marketing += x.Marketing_Airdrop;
                                                        averages.staking += x.Staking_Rewards;
                                                        averages.liquidity += x.Liquidity;
                                                        averages.price += parseFloat(Number(x.ICO_Price_USD.replace('$', '').replace(/,/g, '')));
                                                        averages.supply += parseFloat(Number(x.Market_Cap.replace('$', '').replace(/,/g, ''))) / parseFloat(Number(x.ICO_Price_USD.replace('$', '').replace(/,/g, '')));
                                                        averages.marketCap += parseFloat(Number(x.Market_Cap.replace('$', '').replace(/,/g, '')));

                                                        counter++;
                                                }
                                        }
                                } else if (x.Network.toLowerCase() === net) {



                                        if (utility === "other") {
                                                if (x.Class.toLowerCase() !== "defi" && x.Class.toLowerCase() !== "launchpad" && x.Class.toLowerCase() !== "gamefi" && x.Class.toLowerCase() !== "ai" && x.Class.toLowerCase() !== "metaverse") {
                                                        averages.private += x.Private;
                                                        averages.public += x.Public;
                                                        averages.team += x.Team;
                                                        averages.partners += x.Partnerships_Advisors;
                                                        averages.ecosystem += x.Ecosystem;
                                                        averages.company += x.Company_Treasury_Development;
                                                        averages.marketing += x.Marketing_Airdrop;
                                                        averages.staking += x.Staking_Rewards;
                                                        averages.liquidity += x.Liquidity;
                                                        averages.price += parseFloat(Number(x.ICO_Price_USD.replace('$', '').replace(/,/g, '')));
                                                        averages.supply += parseFloat(Number(x.Market_Cap.replace('$', '').replace(/,/g, ''))) / parseFloat(Number(x.ICO_Price_USD.replace('$', '').replace(/,/g, '')));
                                                        averages.marketCap += parseFloat(Number(x.Market_Cap.replace('$', '').replace(/,/g, '')));

                                                        counter++;
                                                }
                                        } else {
                                                if (x.Class.toLowerCase() === utility) {
                                                        averages.private += x.Private;
                                                        averages.public += x.Public;
                                                        averages.team += x.Team;
                                                        averages.partners += x.Partnerships_Advisors;
                                                        averages.ecosystem += x.Ecosystem;
                                                        averages.company += x.Company_Treasury_Development;
                                                        averages.marketing += x.Marketing_Airdrop;
                                                        averages.staking += x.Staking_Rewards;
                                                        averages.liquidity += x.Liquidity;
                                                        averages.price += parseFloat(Number(x.ICO_Price_USD.replace('$', '').replace(/,/g, '')));
                                                        averages.supply += parseFloat(Number(x.Market_Cap.replace('$', '').replace(/,/g, ''))) / parseFloat(Number(x.ICO_Price_USD.replace('$', '').replace(/,/g, '')));
                                                        averages.marketCap += parseFloat(Number(x.Market_Cap.replace('$', '').replace(/,/g, '')));

                                                        counter++;
                                                }

                                        }




                                }
                        })

                        setMarketCap(price * supply);

                        setAvgPrivate(averages.private / counter)
                        setAvgPublic(averages.public / counter)
                        setAvgTeam(averages.team / counter)
                        setAvgPartners(averages.partners / counter)
                        setAvgCompany(averages.company / counter)
                        setAvgEcosystem(averages.ecosystem / counter)
                        setAvgMarketing(averages.marketing / counter)
                        setAvgStaking(averages.staking / counter)
                        setAvgLiquidity(averages.liquidity / counter)
                        setAvgPrice(averages.price / counter)
                        setAvgSupply(averages.supply / counter)
                        setAvgMarketCap(averages.marketCap / counter);


                        makePie();





                        /*
                        
                                                const configuration = new Configuration({
                                                        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
                                                        dangerouslyAllowBrowser: true
                                                });
                        
                                                try {
                        
                                                        delete configuration.baseOptions.headers['User-Agent'];
                                                        const openai = new OpenAIApi(configuration);
                        
                        
                        
                        
                                                        const completion = await openai.createChatCompletion({
                                                                model: "gpt-3.5-turbo",
                                                                messages: [
                                                                        {
                                                                                role: "user", content: `In 200 words or less, perform tokenomics analysis and offer feedback on how to strengthen it in the areas of utility, allocation, vesting periods, number of rounds of crowdfunding, etc. The private allocation is ${priv}%,
                                                 public is ${pub}%, team is ${team}%, partners and advisors is ${partners}%, ecosystem is ${ecosystem}%, company, treasury, and development (all grouped into one) is ${company}%, marketing is ${marketing}%, staking is ${staking}, and liquidity is ${liquidity}%.
                                                 The token will be launched on ${network === "other" ? "a custom network described below" : network} network at a listing price of ${price} and supply of ${supply}. The monetary policy is ${policy}. ${description}`
                                                                        }
                                                                ],
                                                        });
                        
                                                        const aiData = completion.data.choices[0].message.content
                        
                                                        const formattedJson = aiData.replace(/\n/g, " ");
                        
                                                        //console.log(formattedJson)
                        
                                                        setOutput(formattedJson);
                                                } catch (err) {
                                                        console.log(err)
                                                        setOutput("Error retrieving feedback.");
                                                }*/


                }, 5000)


        }








        return (
                <>
                        {(!user.emailVerified) ? (
                                <div style={{ backgroundColor: colors.primary[600] }} className="warning">
                                        <p style={{ color: "whitesmoke" }}>You must be logged in with a verified email to use this feature. Please login/signup or check your for the verification link.</p>
                                        <div onClick={() => { toggleCharts("Dashboard") }} style={{ display: "flex", top: "0", right: "0", alignItem: "start", position: "absolute", justifyContent: "end", padding: "1rem", cursor: "pointer" }}>

                                                <DeleteOutlinedIcon />
                                        </div>
                                </div>

                        ) : (

                                <div style={{ backgroundColor: colors.primary[600] }} className="slideForm tokenomics smReport"  >
                                        <div onClick={() => { toggleCharts("Dashboard") }} style={{ display: "flex", top: "0", right: "0", alignItem: "start", position: "absolute", justifyContent: "end", padding: "1rem", cursor: "pointer" }}>

                                                <DeleteOutlinedIcon />
                                        </div>
                                        {avgSupply > 0 ? (
                                                <>
                                                        {showLoading ? (
                                                                <div style={{ display: "flex", flexDirection: "column", margin: "auto", justifyContent: "center", minHeight: "30vh" }}>
                                                                        <Typography variant="h3">{bufferMessage}</Typography>
                                                                        <br></br>

                                                                        <LinearProgress color="secondary" />
                                                                </div>
                                                        ) : (
                                                                <div className="report smReport" >
                                                                        <div className='allocation' >
                                                                                <div className='summary' id="bars">
                                                                                        <Typography variant="h6">Your private allocation of {priv}% is {priv > avgPrivate ? "greater than" : "less than"} the average for similar projects.</Typography>
                                                                                        <ProgressBar completed={priv} maxCompleted={priv > avgPrivate ? priv : avgPrivate} bgColor={colors.greenAccent[500]} baseBgColor='transparent' animateOnRender={true} transitionDuration='3s' />
                                                                                        <ProgressBar completed={avgPrivate} maxCompleted={priv > avgPrivate ? priv : avgPrivate} bgColor={colors.blueAccent[500]} baseBgColor='transparent' animateOnRender={true} transitionDuration='3s' />
                                                                                        <p>Your public allocation of {pub}% is {pub > avgPublic ? "greater than" : "less than"} the average for similar projects.</p>
                                                                                        <ProgressBar completed={pub} maxCompleted={pub > avgPublic ? pub : avgPublic} bgColor={colors.greenAccent[500]} baseBgColor='transparent' animateOnRender={true} transitionDuration='3s' />
                                                                                        <ProgressBar completed={avgPublic} maxCompleted={pub > avgPublic ? pub : avgPublic} bgColor={colors.blueAccent[500]} baseBgColor='transparent' animateOnRender={true} transitionDuration='3s' />
                                                                                        <p>Your team allocation of {team}% is {team > avgTeam ? "greater than" : "less than"} the average for similar projects.</p>
                                                                                        <ProgressBar completed={team} maxCompleted={team > avgTeam ? team : avgTeam} bgColor={colors.greenAccent[500]} baseBgColor='transparent' animateOnRender={true} transitionDuration='3s' />
                                                                                        <ProgressBar completed={avgTeam} maxCompleted={team > avgTeam ? team : avgTeam} bgColor={colors.blueAccent[500]} baseBgColor='transparent' animateOnRender={true} transitionDuration='3s' />
                                                                                        <p>Your partners & advisors allocation of {partners}% is {partners > avgPartners ? "greater than" : "less than"} the average for similar projects.</p>
                                                                                        <ProgressBar completed={partners} maxCompleted={partners > avgPartners ? partners : avgPartners} bgColor={colors.greenAccent[500]} baseBgColor='transparent' animateOnRender={true} transitionDuration='3s' />
                                                                                        <ProgressBar completed={avgPartners} maxCompleted={partners > avgPartners ? partners : avgPartners} bgColor={colors.blueAccent[500]} baseBgColor='transparent' animateOnRender={true} transitionDuration='3s' />
                                                                                        <p>Your ecosystem allocation of {ecosystem}% is {ecosystem > avgEcosystem ? "greater than" : "less than"} the average for similar projects.</p>
                                                                                        <ProgressBar completed={ecosystem} maxCompleted={ecosystem > avgEcosystem ? ecosystem : avgEcosystem} bgColor={colors.greenAccent[500]} baseBgColor='transparent' animateOnRender={true} transitionDuration='3s' />
                                                                                        <ProgressBar completed={avgEcosystem} maxCompleted={ecosystem > avgEcosystem ? ecosystem : avgEcosystem} bgColor={colors.blueAccent[500]} baseBgColor='transparent' animateOnRender={true} transitionDuration='3s' />
                                                                                        <p>Your company/treasury allocation of {company}% is {company > avgCompany ? "greater than" : "less than"} the average for similar projects.</p>
                                                                                        <ProgressBar completed={company} maxCompleted={company > avgCompany ? company : avgCompany} bgColor={colors.greenAccent[500]} baseBgColor='transparent' animateOnRender={true} transitionDuration='3s' />
                                                                                        <ProgressBar completed={avgCompany} maxCompleted={company > avgCompany ? company : avgCompany} bgColor={colors.blueAccent[500]} baseBgColor='transparent' animateOnRender={true} transitionDuration='3s' />
                                                                                        <p>Your marketing allocation of {marketing}% is {marketing > avgMarketing ? "greater than" : "less than"} the average for similar projects.</p>
                                                                                        <ProgressBar completed={marketing} maxCompleted={marketing > avgMarketing ? marketing : avgMarketing} bgColor={colors.greenAccent[500]} baseBgColor='transparent' animateOnRender={true} transitionDuration='3s' />
                                                                                        <ProgressBar completed={avgMarketing} maxCompleted={marketing > avgMarketing ? marketing : avgMarketing} bgColor={colors.blueAccent[500]} baseBgColor='transparent' animateOnRender={true} transitionDuration='3s' />
                                                                                        <p>Your staking allocation of {staking}% is {staking > avgStaking ? "greater than" : "less than"} the average for similar projects.</p>
                                                                                        <ProgressBar completed={staking} maxCompleted={staking > avgStaking ? staking : avgStaking} bgColor={colors.greenAccent[500]} baseBgColor='transparent' animateOnRender={true} transitionDuration='3s' />
                                                                                        <ProgressBar completed={avgStaking} maxCompleted={staking > avgStaking ? staking : avgStaking} bgColor={colors.blueAccent[500]} baseBgColor='transparent' animateOnRender={true} transitionDuration='3s' />
                                                                                        <p>Your liquidity allocation of {liquidity}% is {liquidity > avgLiquidity ? "greater than" : "less than"} the average for similar projects.</p>
                                                                                        <ProgressBar completed={liquidity} maxCompleted={liquidity > avgLiquidity ? liquidity : avgLiquidity} bgColor={colors.greenAccent[500]} baseBgColor='transparent' animateOnRender={true} transitionDuration='3s' />
                                                                                        <ProgressBar completed={avgLiquidity} maxCompleted={liquidity > avgLiquidity ? liquidity : avgLiquidity} bgColor={colors.blueAccent[500]} baseBgColor='transparent' animateOnRender={true} transitionDuration='3s' />

                                                                                </div>

                                                                                {avgSupply && (

                                                                                        <Box id='pie' sx={{
                                                                                                "& .legend": {
                                                                                                        backgroundColor: "transparent !important"
                                                                                                },
                                                                                                width: "50%",
                                                                                                display: "flex",
                                                                                                marginLeft: "2rem",
                                                                                                marginTop: "2rem"
                                                                                               
                                                                                        }}>
                                                                                                <PieChart
                                                                                                        data={pieData}

                                                                                                        width={300}
                                                                                                        height={300}
                                                                                                        thickness={70}
                                                                                                        colors={[
                                                                                                                colors.blueAccent[100],
                                                                                                                colors.blueAccent[200],
                                                                                                                colors.blueAccent[300],
                                                                                                                colors.blueAccent[400],
                                                                                                                colors.blueAccent[500],
                                                                                                                colors.blueAccent[600],
                                                                                                                colors.blueAccent[700],
                                                                                                                colors.blueAccent[800],
                                                                                                                colors.blueAccent[900],
                                                                                                        ]}
                                                                                                        legendPosition='bottom'
                                                                                                        animation
                                                                                                />
                                                                                        </Box>

                                                                                )}


                                                                        </div>
                                                                        <div className='numbers'>
                                                                        <p>Your <span  style={{ color: colors.redAccent[400], fontWeight: "bolder", fontSize: "1.5rem" }}>token price</span> of <span className="num" style={{  fontWeight: "bolder", color: colors.greenAccent[400] }}><CountUp end={price} decimals={3} /></span>USD is

                                                                                {price > avgPrice ? (
                                                                                        <span> greater than the average price of <span className='num' style={{  fontWeight: "bolder", color: colors.blueAccent[200] }}><CountUp end={avgPrice} decimals={3} /></span> USD for similar projects.</span>) :
                                                                                        (
                                                                                                <span> less than the average price of ${<span className='num' style={{  fontWeight: "bolder", color: colors.blueAccent[200] }}><CountUp end={avgPrice} decimals={3} /></span>} USD for similar projects.</span>
                                                                                        )}
                                                                        </p>
                                                                        <p>Your <span style={{ color: colors.redAccent[400], fontWeight: "bolder", fontSize: "1.5rem" }}>token supply</span> of <span className="num" style={{  fontWeight: "bolder", color: colors.greenAccent[400] }}><CountUp end={supply} /></span> is

                                                                                {supply > avgSupply ? (
                                                                                        <span> greater than the average (<span className="num" style={{  fontWeight: "bolder", color: colors.blueAccent[200] }}><CountUp end={avgSupply} /></span>) for similar projects.</span>
                                                                                ) : (
                                                                                        <span> less than the average <span className="num" style={{  fontWeight: "bolder", color: colors.blueAccent[200] }}>(~<CountUp end={avgSupply} />)</span> for similar projects.</span>
                                                                                )}
                                                                        </p>
                                                                        <p>Your <span style={{ color: colors.redAccent[400], fontWeight: "bolder", fontSize: "1.5rem" }}>market cap</span> of <span className="num" style={{  fontWeight: "bolder", color: colors.greenAccent[400] }}><CountUp end={marketCap} /></span> USD is

                                                                                {marketCap > avgMarketCap ? (
                                                                                        <span> greater than the average <span className="num" style={{  fontWeight: "bolder", color: colors.blueAccent[200] }}>(~<CountUp end={avgMarketCap} />)</span> for similar projects. If either price or token supply is too high, consider reducing them to closer to the average to avoid overpricing or oversaturation.</span>
                                                                                ) : (
                                                                                        <span> less than the average <span className="num" style={{  fontWeight: "bolder", color: colors.blueAccent[200] }}>(~<CountUp end={avgMarketCap} />)</span> for similar projects. If either the token price or the token supply is too low, consider increasing them to closer to the average to avoid underpricing and low FDV.</span>
                                                                                )

                                                                                } </p>
                                                                        <br></br>
                                                                        {output.length > 0 && (
                                                                                <TypeAnimation
                                                                                        sequence={[output]}
                                                                                        speed={75}

                                                                                />
                                                                        )}
                                                                        </div>





                                                                </div>


                                                        )}
                                                </>

                                        ) : (
                                                <form className="tform" >
                                                        <div className='tform-box' >
                                                                <div className="survey" >
                                                                        <Typography variant="h3">Tokenomics</Typography>
                                                                        <br></br>
                                                                        <Typography variant="h6">Network</Typography>
                                                                        <select
                                                                                required
                                                                                onChange={e => { setNetwork(e.target.value); console.log(e.target.value) }}
                                                                                style={{ width: "75%", backgroundColor: `${colors.primary[500]}`, color: `${colors.primary[100]}`, padding: "5px 8px", borderRadius: "8px" }}>
                                                                                <option value="">Network</option>
                                                                                <option value="algorand">ALGORAND</option>
                                                                                <option value="arbitrum">ARBITRUM</option>
                                                                                <option value="binance">BINANCE</option>
                                                                                <option value="cardano">CARDANO</option>
                                                                                <option value="cosmos">COSMOS</option>
                                                                                <option value="ethereum">ETHEREUM</option>
                                                                                <option value="other">OTHER</option>
                                                                                <option value="polygon">POLYGON</option>
                                                                                <option value="solana">SOLANA</option>
                                                                        </select>
                                                                        <br></br>
                                                                        <Typography variant="h6">Class</Typography>
                                                                        <select
                                                                                required
                                                                                onChange={e => { setUtility(e.target.value); console.log(e.target.value) }}
                                                                                style={{ width: "75%", backgroundColor: `${colors.primary[500]}`, color: `${colors.primary[100]}`, padding: "5px 8px", borderRadius: "8px" }}>
                                                                                <option value="">Class</option>
                                                                                <option value="ai">AI</option>
                                                                                <option value="defi">DEFI</option>
                                                                                <option value="gamefi">GAMEFI</option>
                                                                                <option value="launchpad">LAUNCHPAD</option>
                                                                                <option value="metaverse">METAVERSE</option>
                                                                        </select>
                                                                        <br></br>
                                                                        <Typography variant="h6">Monetary Policy</Typography>
                                                                        <select

                                                                                style={{ width: "75%", backgroundColor: `${colors.primary[500]}`, color: `${colors.primary[100]}`, padding: "5px 8px", borderRadius: "8px" }}
                                                                                required
                                                                                onChange={e => { setPolicy(e.target.value) }}>
                                                                                <option value="">Monetary Policy</option>
                                                                                <option value="deflationary">DEFLATIONARY</option>
                                                                                <option value="inflationary">INFLATIONARY</option>
                                                                        </select>
                                                                        <br></br>
                                                                        <Typography variant="h6">{policy === "deflationary" ? "Total Supply" : "Initial Supply"}</Typography>
                                                                        <input
                                                                                style={{ width: "75%", backgroundColor: `${colors.primary[500]}`, color: `${colors.primary[100]}`, padding: "5px 8px", borderRadius: "8px" }}
                                                                                required
                                                                                onChange={e => { setSupply(e.target.value) }}
                                                                                value={supply} type="number" placeholder="0" />
                                                                        <br></br>
                                                                        <Typography variant="h6">ICO Price</Typography>
                                                                        <input
                                                                                style={{ width: "75%", backgroundColor: `${colors.primary[500]}`, color: `${colors.primary[100]}`, padding: "5px 8px", borderRadius: "8px" }}
                                                                                required
                                                                                onChange={e => { setPrice(e.target.value) }}
                                                                                value={price} type="number" placeholder="0" />
                                                                        <br></br>


                                                                </div>
                                                                <Box style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                                                                        <Typography variant="h3">Allocation</Typography>
                                                                        <div className="slider" >
                                                                                <p style={{ color: colors.grey[100] }}>Private</p>
                                                                                <Slider
                                                                                        valueLabelDisplay={priv === 0 ? 'off' : 'on'}
                                                                                        value={priv}
                                                                                        onChange={(e, newValue) => setPriv(newValue)}
                                                                                        min={0}
                                                                                        max={100 - pub - team - partners - company - ecosystem - marketing - staking - liquidity < 0 ? 0 : 100 - pub - team - partners - company - ecosystem - marketing - staking - liquidity}
                                                                                        sx={{ color: `${colors.greenAccent[500]} !important` }}

                                                                                />
                                                                        </div>
                                                                        <div className="slider" >
                                                                                <p style={{ color: colors.grey[100] }}>Public</p>
                                                                                <Slider
                                                                                        valueLabelDisplay={pub === 0 ? 'off' : 'on'}
                                                                                        value={pub}
                                                                                        onChange={(e, newValue) => setPub(newValue)}
                                                                                        min={0}
                                                                                        max={100 - priv - team - partners - company - ecosystem - marketing - staking - liquidity < 0 ? 0 : 100 - priv - team - partners - company - ecosystem - marketing - staking - liquidity}
                                                                                        sx={{ color: `${colors.greenAccent[500]} !important` }}

                                                                                />
                                                                        </div>
                                                                        <div className="slider" >
                                                                                <p style={{ color: colors.grey[100] }}>Team</p>
                                                                                <Slider
                                                                                        valueLabelDisplay={team === 0 ? 'off' : 'on'}
                                                                                        value={team}
                                                                                        onChange={(e, newValue) => setTeam(newValue)}
                                                                                        min={0}
                                                                                        max={100 - pub - priv - partners - company - ecosystem - marketing - staking - liquidity < 0 ? 0 : 100 - pub - priv - partners - company - ecosystem - marketing - staking - liquidity}
                                                                                        sx={{ color: `${colors.greenAccent[500]} !important` }}

                                                                                />
                                                                        </div>
                                                                        <div className="slider" >
                                                                                <p style={{ color: colors.grey[100] }}>Partners</p>
                                                                                <Slider
                                                                                        valueLabelDisplay={partners === 0 ? 'off' : 'on'}
                                                                                        value={partners}
                                                                                        onChange={(e, newValue) => setPartners(newValue)}
                                                                                        min={0}
                                                                                        max={100 - pub - priv - team - company - ecosystem - marketing - staking - liquidity < 0 ? 0 : 100 - pub - priv - team - company - ecosystem - marketing - staking - liquidity}
                                                                                        sx={{ color: `${colors.greenAccent[500]} !important` }}

                                                                                />
                                                                        </div>
                                                                        <div className="slider" >
                                                                                <p style={{ color: colors.grey[100] }}>Ecosystem</p>
                                                                                <Slider
                                                                                        valueLabelDisplay={ecosystem === 0 ? 'off' : 'on'}
                                                                                        value={ecosystem}
                                                                                        onChange={(e, newValue) => setEcosystem(newValue)}
                                                                                        min={0}
                                                                                        max={100 - pub - priv - team - company - partners - marketing - staking - liquidity < 0 ? 0 : 100 - pub - priv - team - company - partners - marketing - staking - liquidity}
                                                                                        sx={{ color: `${colors.greenAccent[500]} !important` }}

                                                                                />
                                                                        </div>
                                                                        <div className="slider" >
                                                                                <p style={{ color: colors.grey[100] }}>Treasury</p>
                                                                                <Slider
                                                                                        valueLabelDisplay={company === 0 ? 'off' : 'on'}
                                                                                        value={company}
                                                                                        onChange={(e, newValue) => setCompany(newValue)}
                                                                                        min={0}
                                                                                        max={100 - pub - priv - team - ecosystem - partners - marketing - staking - liquidity < 0 ? 0 : 100 - pub - priv - team - ecosystem - partners - marketing - staking - liquidity}
                                                                                        sx={{ color: `${colors.greenAccent[500]} !important` }}

                                                                                />
                                                                        </div>
                                                                        <div className="slider" >
                                                                                <p style={{ color: colors.grey[100] }}>Marketing</p>
                                                                                <Slider
                                                                                        valueLabelDisplay={marketing === 0 ? 'off' : 'on'}
                                                                                        value={marketing}
                                                                                        onChange={(e, newValue) => setMarketing(newValue)}
                                                                                        min={0}
                                                                                        max={100 - pub - priv - team - company - ecosystem - partners - staking - liquidity < 0 ? 0 : 100 - pub - priv - team - company - ecosystem - partners - staking - liquidity}
                                                                                        sx={{ color: `${colors.greenAccent[500]} !important` }}

                                                                                />
                                                                        </div>
                                                                        <div className="slider" >
                                                                                <p style={{ color: colors.grey[100] }}>Staking</p>
                                                                                <Slider
                                                                                        valueLabelDisplay={staking === 0 ? 'off' : 'on'}
                                                                                        value={staking}
                                                                                        onChange={(e, newValue) => setStaking(newValue)}
                                                                                        min={0}
                                                                                        max={100 - pub - priv - team - company - ecosystem - marketing - partners - liquidity < 0 ? 0 : 100 - pub - priv - team - company - ecosystem - marketing - partners - liquidity}
                                                                                        sx={{ color: `${colors.greenAccent[500]} !important` }}

                                                                                />
                                                                        </div>
                                                                        <div className="slider" >
                                                                                <p style={{ color: colors.grey[100] }}>Liquidity</p>
                                                                                <Slider
                                                                                        valueLabelDisplay={liquidity === 0 ? 'off' : 'on'}
                                                                                        value={liquidity}
                                                                                        onChange={(e, newValue) => setLiquidity(newValue)}
                                                                                        min={0}
                                                                                        max={100 - pub - priv - team - company - ecosystem - marketing - staking - partners < 0 ? 0 : 100 - pub - priv - team - company - ecosystem - marketing - staking - partners}
                                                                                        sx={{ color: `${colors.greenAccent[500]} !important` }}

                                                                                />
                                                                        </div>
                                                                </Box>
                                                        </div>
                                                        <Box style={{ display: "flex", width: "100%", flexDirection: "column", alignItems: "start" }}>
                                                                <Typography variant="h3">Utility</Typography>

                                                                <textarea
                                                                        onChange={e => { setDescription(e.target.value) }}
                                                                        style={{ width: "100%", backgroundColor: `${colors.primary[500]}`, color: `${colors.primary[100]}`, padding: "5px 8px", borderRadius: "8px" }} cols="40" rows="8" placeholder="Please provide details about the utility of your project." />
                                                                <button style={{ width: "100%", backgroundColor: colors.greenAccent[500], color: "whitesmoke", marginTop: "2rem", textAlign: "center", border: "none", padding: "0.75rem 1rem" }} type="submit" onClick={analyzeData}>RUN</button>

                                                        </Box>






                                                </form>

                                        )}

                                </div>

                        )}


                </>
        )

}

export default Form;