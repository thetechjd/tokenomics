import { Box, Typography, IconButton, useTheme } from "@mui/material"
import { useContext, useState, useEffect } from "react";
import { WalletContext } from '../../context/WalletContext'
import { ProviderContext } from '../../context/ProviderContext'
import { UserContext } from '../../context/UserContext'
import { LoginContext } from '../../context/LoginContext'
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined"
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Web3 from 'web3'
import Web3Modal from "web3modal";
import EthereumProvider from "@walletconnect/ethereum-provider";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

import { fromUtf8, toHex } from 'ethereumjs-util';

const web3 = new Web3("https://eth-mainnet.g.alchemy.com/v2/gOkgumMo6bV2fWBI5ih89uP7KW99oXye");

//import { contractAddress } from "../utils/contractConfig.json"
//import contractABI from "../utils/contractABI.json";






/*const subContract = new web3.eth.Contract(
    contractABI,
    contractAddress
)*/

const TopBar = ({ showLoginModal, email, logOut, user }) => {
  const { walletAddress, setWalletAddress } = useContext(WalletContext)
  const { provider, setProvider } = useContext(ProviderContext)
  //const { userInfo, setUserInfo} = useContext(UserContext)
  //const { user, setUser } = useContext(UserContext)
  //const { login, setLogin } = useContext(LoginContext)
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);



  useEffect(() => {
    if (user) {
      console.log(user)
      console.log("just testing out the user context. I guess it works!")
    }
  }, [user])




  const providerOptions = {
    walletconnect: {
      package: EthereumProvider, // required
      options: {
        rpc: "https://eth-mainnet.g.alchemy.com/v2/trNMW5_zO5iGvlX4OZ3SjVF-5hLNVsN5" // required
      }
    },
    coinbasewallet: {
      package: CoinbaseWalletSDK, // Required
      options: {
        appName: "Ascendant.Finance", // Required
        rpc: "https://eth-mainnet.g.alchemy.com/v2/trNMW5_zO5iGvlX4OZ3SjVF-5hLNVsN5", // Optional if `infuraId` is provided; otherwise it's required

        darkMode: true // Optional. Use dark theme, defaults to false
      }
    }

  };

  const checkUserInfo = async () => {


    const subData = await subContract.methods.users(walletAddress).call();

    try {
      getRefAddress(walletAddress)
      getRevenue(walletAddress)
    } catch (err) {
      console.log(subData)
      setUserInfo(subData);
    }
  }


  const getRefAddress = async (address) => {
    const refAdd = await subContract.methods.refByAddress(address).call();
    console.log('This is the refAddress: ' + refAdd)
    if (!refAdd.includes("0x00000")) {
      setRefByAddress(refAdd);
    }
  }












  async function connectWallet() {

    try {

      let web3Modal = new Web3Modal({
        network: 'mainnet', // optional
        theme: 'dark',
        cacheProvider: false,

        providerOptions,

      });
      const web3ModalInstance = await web3Modal.connect();
      const provider = new Web3(web3ModalInstance);
      if (web3ModalInstance) {
        setProvider(provider);

        const accounts = await provider.eth.getAccounts();
        const address = accounts[0];
        setWalletAddress(address)



        setUser(
          {
            email: "sike@sike.com",
            password: "testtest"
          }
        )



      }

    }



    catch (error) {
      console.error(error)
    }


  }

  const signMessage = async (address) => {
    if (provider) {
      const from = address;

      const rawMessage = 'Hey! We are asking you to sign this message to enter the mint.'
      const msg = '0x' + Array.prototype.map.call(rawMessage, char => char.charCodeAt(0).toString(16)).join('');
      await provider.eth.personal.sign(msg, from, "testing!");

    }


  }

  useEffect(() => {
    console.log(provider)
    signMessage(walletAddress)
  }, [walletAddress])

  const disconnect = () => {
    setWalletAddress('')

  }


  return (<Box display="flex" justifyContent="space-between" p={2}>
    {/*} <Box 
        display="flex" 
        backgroundColor={colors.primary[400]} 
        borderRadius="3px">
            <InputBase sx={{ ml: 2, flex: 1}} placeholder="Search"/>
            <IconButton type="button" sx={{ p: 1}}>
                <SearchIcon/>
            </IconButton>
</Box>*/}

   <Box display="flex">
   <Typography variant="h6">{(email && user.emailVerified) && (<><span style={{ fontStyle: "italic", color: colors.grey[300] }}>Logged in as: </span><span style={{marginLeft: "4px", color: colors.grey[300]}}>{email}</span></>)}</Typography>
 </Box>

   
    <Box display="flex">
      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === 'dark' ? (
          <DarkModeOutlinedIcon />
        ) : (
          <LightModeOutlinedIcon />
        )}

      </IconButton>
      {/*} <IconButton>
                <NotificationsOutlinedIcon/>
                </IconButton>*/}
      <IconButton>
        <SettingsOutlinedIcon />
      </IconButton>
      {email ? (
      <IconButton onClick={logOut} >
      
          <ExitToAppOutlinedIcon />

          </IconButton>
        ):(
          <IconButton onClick={() => { showLoginModal(true) }}>
          <PersonOutlinedIcon />

          </IconButton>
       
       
     
       )}
    </Box>
  </Box>)
}

export default TopBar;