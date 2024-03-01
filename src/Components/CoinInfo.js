import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryContext';
import { HistoricalChart } from '../config/api';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { ChartDays } from '../config/data';
//import {Chart as Chartjs} from 'Chart.js/auto';
import { Line } from 'react-chartjs-2';
import { CategoryScale,LinearScale,Chart,PointElement,LineElement } from 'chart.js';
import SelectButton from './SelectButton';
Chart.register(CategoryScale,LinearScale,PointElement,LineElement);

// import {Chart as ChartJS,LineElement,Tooltip,Legend,CategoryScale,LinearScale} from 'chart.js';
// ChartJS.register(
//   LineElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale
// );

const CoinInfo = ({coin}) => {
  const[historicData,setHistoricData]=useState();
  const[days,setDays]=useState(1);
  const{Currency}=CryptoState();
  
  const fetchHistoricalData=async()=>{
    const {data}=await axios.get(HistoricalChart(coin.id,days,Currency));
    setHistoricData(data.prices);
  };
  console.log("datas",historicData);
  useEffect(()=>{
    fetchHistoricalData();
  },[Currency,days]);
  
return (
    <div className='ContainerChart'>
      {!historicData ? (
        <CircularProgress style={{color:"gold"}} size={250}thickness={1}/>
      ):(
      <>
     <Line
      data={{
        labels: historicData.map((coin)=>{
            let date=new Date(coin[0]);
            let time=date.getHours()>12 ? `${date.getHours()-12}:${date.getMinutes()}PM`
            :`${date.getHours()}:${date.getMinutes()}AM`;
          return days===1 ? time:date.toLocaleDateString();
      }),
       datasets:[
         {
          data:historicData.map((coin)=>coin[1]),
         label:`Price(Past${days}Days) in ${Currency}`,
         borderColor:"#EEBC1D",
        },
       ],

      }}
      options={{
        elements:{
          point:{radius:1,
          },
        },
      }}
      />
      <div style={{display:"flex",marginTop:20,justifyContent:"space-around",width:"100%",cursor:"pointer"}}>
        {ChartDays.map((day)=>(
          <SelectButton key={day.value} onClick={()=>setDays(day.value)} selected={day.value===days}>{day.label}</SelectButton>
        ))}
      </div>
      
      </>)}
    </div>
  )
}

export default CoinInfo