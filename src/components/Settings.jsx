import { useContext, useEffect, useState } from 'react';
import { useTheme } from "@mui/material";
import { tokens } from '../theme';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios'
//import { Link } from "react-router-dom"
import { WalletContext } from '../context/WalletContext'
import { ProviderContext } from '../context/ProviderContext'
import FlashOnIcon from '@mui/icons-material/FlashOn';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
//import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import Web3 from 'web3'
import CountUp from 'react-countup';
import { Box, Typography } from "@mui/material"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"

//const web3 = Web3(new Web3.providers.HttpProvider("https://eth.llamarpc.com	"));

//const contractAddress = import.meta.glob("../utils/contractConfig.json").contractAddress;

const contractAddress = "0x608aDB23C3129f2c86619362f037301c99B2794E"

//const contractABI = import.meta.glob( "../utils/contractABI.json");

const contractABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_token",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "BillPaid",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "CancelSubscription",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "LifetimeSubscription",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "MonthSubscription",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "PriceChange",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "ReferralEarned",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "USDTWithdraw",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "UpdateReferrer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "YearSubscription",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "LIFETIME_PRICE",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "MONTH_PRICE",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "YEAR_PRICE",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "userName",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_addr",
                "type": "address"
            }
        ],
        "name": "addReferralAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "addrByRef",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "affiliates",
        "outputs": [
            {
                "internalType": "address",
                "name": "affiliate",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "earned",
                "type": "uint256"
            },
            {
                "internalType": "uint16",
                "name": "referrals",
                "type": "uint16"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "bonus",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string[]",
                "name": "userNames",
                "type": "string[]"
            },
            {
                "internalType": "address[]",
                "name": "_addr",
                "type": "address[]"
            }
        ],
        "name": "bulkAddReferralAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_addr",
                "type": "address"
            }
        ],
        "name": "cancelSubscription",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_addr",
                "type": "address"
            }
        ],
        "name": "checkStatus",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "discount",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_stuckToken",
                "type": "address"
            }
        ],
        "name": "emergencyTokenWithdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_addr",
                "type": "address"
            }
        ],
        "name": "payBill",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "refByAddress",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint8",
                "name": "_bonus",
                "type": "uint8"
            }
        ],
        "name": "setBonus",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint8",
                "name": "_disc",
                "type": "uint8"
            }
        ],
        "name": "setDiscount",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_newMonthPrice",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_newYearPrice",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_newLifetimePrice",
                "type": "uint256"
            }
        ],
        "name": "setPrices",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_newToken",
                "type": "address"
            }
        ],
        "name": "setToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint8",
                "name": "tokenId",
                "type": "uint8"
            },
            {
                "internalType": "string",
                "name": "_refCode",
                "type": "string"
            }
        ],
        "name": "subscribe",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "subscriptions",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "token",
        "outputs": [
            {
                "internalType": "contract IERC20",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "newReferrer",
                "type": "address"
            }
        ],
        "name": "updateReferrer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_addr",
                "type": "address"
            },
            {
                "internalType": "uint8",
                "name": "_choice",
                "type": "uint8"
            }
        ],
        "name": "updateSubscription",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "users",
        "outputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "uint8",
                "name": "subType",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "termStart",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "nextPayment",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "referrer",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]




const Settings = ({ toggleCharts, title, cancelMessage }) => {
    const { walletAddress } = useContext(WalletContext);
    const { provider } = useContext(ProviderContext)
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [premium, setPremium] = useState(false)
    const [payTime, setPayTime] = useState(0);
    const [refByAddress, setRefByAddress] = useState("");
    const [refCode, setRefCode] = useState("");
    const [copyMessage, setCopyMessage] = useState('')
    const [userName, setUserName] = useState("");
    const [affiliate, setAffiliate] = useState([])

    const [userInfo, setUserInfo] = useState([])


    const subContract = new provider.eth.Contract(
        contractABI,
        contractAddress
    )
    



    useEffect( () => {
        if(walletAddress.length > 0){

        try {
            getSubData(walletAddress)
            
            getRefAddress(walletAddress)
            getRevenue(walletAddress)

            

        } catch (err) {
            console.log(err);
        }
    }
       

    }, [])

    const getSubData = async (address) => {

        const subData = await subContract.methods.users(address).call();

        console.log(subData)

            setUserInfo(subData);

    }




    const getRefAddress = async (address) => {
        const refAdd = await subContract.methods.refByAddress(address).call();
        console.log('This is the refAddress: ' + refAdd)
        if (!refAdd.includes("0x00000")) {
            setRefByAddress(refAdd);
        }
    }

    const cancelSubscription = async () => {

        await subContract.methods.cancelSubscription(walletAddress).send({ from: walletAddress })
    };

    const getSubType = (subtype) => {
        if (subtype == 3) {
            return "Lifetime"
        } else if (subtype == 2) {
            return "Year"
        } else {
            return "Month"
        }
    }

    const addReferralAddress = async (name) => {
        await subContract.methods.addReferralAddress(name, walletAddress).send({ from: walletAddress }).then(() => {
            getRefAddress(walletAddress);
        })
    }

    const getRevenue = async (address) => {
        const revenue = await subContract.methods.affiliates(address).call();
        setAffiliate(revenue / 10 ** 6)
    }


    return (
        <Box  gridColumn="span 12" gridRow="span 2" display="flex" height="40vh" margin="0 0" backgroundColor={colors.primary[600]} sx={{cursor: "pointer"}} flexDirection="column" position="relative" marginX="auto"  justifyContent="center" alignItems="center">
            {title === "Settings" && (
                <div onClick={() => { toggleCharts("Dashboard") }} style={{ display: "flex", top: "0", right: "0", zIndex: "2", alignItem: "start", position: "absolute", justifyContent: "end", padding: "1rem", cursor: "pointer" }}>

                    <DeleteOutlinedIcon />
                </div>)}


           
                <Box display="flex" flexDirection="column" width="100%">
                    <p>Total Referral Earnings: <span style={{ color: colors.greenAccent[400], fontSize: "3rem", padding: "0 0.5rem" }}>$<CountUp end={affiliate.earned} /></span></p>

                    
                    {!refByAddress.length > 0 && (
                        <Box display="flex" flexDirection="column" justifyContent="center" marginY="1rem" p="0.5rem"  >
                            <p>Got Discord? Add your Discord Username and earn 20% for every purchase that an invitee makes and on each payment afterward!<span style={{ display: "flex", width: "100%", justifyContent: "center" }}><img src='/assets/discord.png' style={{ display: "flex", margin: "2px auto", width: "40px" }} /></span></p>
                            <input style={{width: "50%", margin: "0 auto" , borderRadius: '5px', background: 'transparent', alignItems: "center", justifyContent: "center", textAlign: 'center', border: '1px solid gray' , color: 'gray'}} type='text' placeHolder='@myuser2023' name="discordId" onChange={e => { setUserName(e.target.value) }} value={userName} />

                            <button onClick={() => { addReferralAddress(userName) }} style={{ width: "50%", margin: "5px auto", backgroundColor: colors.blueAccent[500], justifyContent: "center", alignText: "center", borderRadius: "5px", cursor: "pointer", display: "flex", padding: "0.5rem 1rem" }}><span style={{ display: "flex", width: "100%", alignText: "center", justifyContent: "center" }} >Generate Referral Code <FlashOnIcon /></span></button>
                        </Box>
                    )}
                </Box>

            

        </Box>



    )







}

export default Settings;