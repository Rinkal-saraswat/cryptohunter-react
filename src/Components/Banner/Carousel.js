import React, { useEffect, useState } from 'react'
import axios from "axios";
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../CryContext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

 export function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
 }


const Carousel = () => {
   const[trending,setTrending]=useState([]);
     const{Currency,symbol}=CryptoState();
    const fetchTrendingCoins= async()=>{
       //const {Data}=await axios.get(TrendingCoins(Currency));
       //setTrending(Data);
      //const{data}=
        await axios.get(TrendingCoins(Currency)).then((response)=>{
        setTrending(response.data)
        
      }).catch((error)=>{
        console.log(error);
      })
    };
   // console.log(trending);
    useEffect(()=>{
        fetchTrendingCoins();
    },[Currency]);

    const items=trending.map((coin)=>{
      let profit=coin.price_change_percentage_24h>=0;
      return(
        <Link className='carouselitem' to={`/Coinpage/${coin.id}`}>
        <img 
        src={coin?.image}
        alt={coin.name}
        height="80"
        style={{marginBottom:10,padding:10}}
        />
        <span>
          {coin?.symbol}
          &nbsp;
        <span 
        style={{color: profit>0? "rgb(14,203,129)":"red",fontweight:500,}}>
        
          {profit &&"+"}{coin?.price_change_percentage_24h?.toFixed(2)}%
        </span>
        </span>

        <span style={{fontSize:22, fontWeight:500}}>
          {symbol}{numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
         </Link>
      )
      })
      const responsiveness={
      0:{
        items:2,
      },
      512:{
        items:4,
      },
    };
    

  return (
    <div className='carousel' style={{height:'50%',display:'flex',alignItems:'center'}}>
      
      <AliceCarousel
      mouseTracking
      infinite
      autoPlayInterval={1000}
      animationDuration={1500}
      disableDotsControls
      disableButtonsControls
      responsive={responsiveness}
      autoPlay
      items={items}
      />
   

    </div>
  )
}

export default Carousel
