import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../CryContext';
import { SingleCoin } from '../config/api';
import axios from 'axios';
import CoinInfo from '../Components/CoinInfo';
import { LinearProgress, Typography } from '@mui/material';
import { numberWithCommas } from '../Components/Banner/Carousel';
//import  makeStyles  from '@mui/styles';
//import { createTheme } from '@mui/material';

const Coinpage = () => {
  const {id}=useParams();
  const[coin,setcoin]=useState();
  
  const{Currency,symbol}=CryptoState();
  const fetchCoin=async()=>{
    const{ data }=await axios.get(SingleCoin(id));
    setcoin(data);
  };
  console.log(coin);
  useEffect(()=>{
    fetchCoin();
  },[]);
   
  // const theme = createTheme();
  //  const useStyles=makeStyles((theme)=>({
  //   containerpage:{
  //     display: "flex",
  //     [theme.breakpoints.down("md")]:{
  //       flexDirection: "column",
  //       alignItems: "center",
  //     },
  //   },
    
  //  }))
  //  const classes=useStyles();

  if(!coin)return<LinearProgress style={{backgroundColor:"gold"}} />

  return (
    <div className='containerpage'>
      <div className='sidebar'>
      <img 
      src={coin?.image.large}
      alt={coin?.name}
      height="200"
      style={{marginBottom:20}}
      />
      <Typography variant="h4" className='heading'> {coin?.name}</Typography>
      <Typography variant="subtitle" className='description'>{coin?.description.en.split(".")[0] }.</Typography>
      <div className='marketData'>
        <span style={{display:"flex"}}>
          <Typography variant="h5" className='heading'>
              Rank:
          </Typography>
          &nbsp; &nbsp;
          <Typography variant='h5' style={{fontFamily:"Montserrat",}}>
            {coin?.market_cap_rank}
          </Typography>
        </span>
        <span style={{display:"flex"}}>
          <Typography variant="h5" className='heading'>
              Current Price:
          </Typography>
          &nbsp; &nbsp;
          <Typography variant='h5' style={{fontFamily:"Montserrat",}}>
          {symbol}{" "}
          {numberWithCommas(coin?.market_data.current_price[Currency.toLowerCase()])}
          </Typography>
        </span>
        <span style={{display:"flex"}}>
          <Typography variant="h5" className='heading'>
              Market Cap:{" "}
          </Typography>
          &nbsp; &nbsp;
          <Typography variant='h5' style={{fontFamily:"Montserrat",}}>
          {symbol}{" "}
          {numberWithCommas(coin?.market_data.market_cap[Currency.toLowerCase()].toString().slice(0,-6))}M 
          </Typography>
        </span>

      </div>
      </div>
      {/* chart */}
      <CoinInfo coin={coin}/>
    </div>
  )
}

export default Coinpage