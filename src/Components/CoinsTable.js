import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryContext';
import axios from 'axios';
import { CoinList } from '../config/api';
import { Container, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';


import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from './Banner/Carousel';

const CoinsTable = () => {
    const[coins,setCoins]=useState([]);
    const[loading,setLoading]=useState(false);
    const[search,setsearch]=useState("");
    const[page,setpage]=useState(1);
    const{Currency,symbol}=CryptoState();
    const navigate=useNavigate();
    const fetchCoins=async()=>{
        setLoading(true);
        const{data}=await axios.get(CoinList(Currency));
        setCoins(data);
        setLoading(false);
    };
    //console.log(coins);
    useEffect(()=>{
        fetchCoins();
    },[Currency]);

    const darkTheme = createTheme({
        palette: {
          primary:{
             main:"#fff",
             
          } ,
          mode:"dark",
        },
      });
      
     const handleSearch=(coin)=>{
        return coins.filter((coin)=>(
            coin.name.toLowerCase().includes(search)||
            coin.symbol.toLowerCase().includes(search)
         ) );
     };
    

  return (
    <ThemeProvider theme ={darkTheme}>
        <Container style={{textAlign:"center"}}>
            <Typography variant="h4" style={{margin:18,fontFamily:"Montserrat"}}>
                Cryptography prices by Market Cap
            </Typography>
            <TextField label="Search for a Crypto Currency.." variant="outlined"
            style={{marginBottom:20,width:"100%"}}
            onChange={(e)=>setsearch(e.target.value)}
            /> 
            <TableContainer>

                {
                    loading?(
                        <LinearProgress style={{backgroundColor:"gold"}} />
                    ):(
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead style={{ backgroundColor:"#EEBC1D"}}>
                                <TableRow>
                                    {["Coin","Price","24h Change","Market Cap"].map((head)=>(
                                        <TableCell
                                         style={{
                                            color:"black",
                                            fontWeight:"800",
                                            fontFamily:"Montserrat",
                                            fontWeight:"bolder"

                                         }}
                                         key={head}
                                         align={head==="Coin"?"left":"right"}
                                        >
                                            {head}

                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody className="classrow">
                                {handleSearch().slice((page-1)*10,(page-1)*10+10).map((row)=>{
                                    const profit=row.price_change_percentage_24h>0;
                                    return(
                                        <TableRow onClick={()=>navigate(`/Coinpage/${row.id}`)}
                                         className="classRow"
                                        key={row.name}
                                        // style={{ '&:last-child td, &:last-child th': { border: 70} }}
                                        >
                                            <TableCell component="th" scope="row" style={{display:"flex",gap:15}} >
                                                <img src={row?.image}
                                                alt={row.name}
                                                height="40"
                                                style={{marginBottom:10}}/>
                                                <div style={{display:"flex",flexDirection:"column"}}>
                                                    <span style={{textTransform:"uppercase",
                                                        fontSize:18,color:"Black"
                                                    }}>
                                                        {row.symbol}
                                                    </span>
                                                    <span style={{color:"Black"}}>{row.name}</span>

                                                </div>
                                            </TableCell>  
                                           
                                            <TableCell align="right" style={{color:'black'}}>
                                                {symbol}{" "}
                                                {numberWithCommas(row.current_price.toFixed(2))}
                                            </TableCell>
                                              <TableCell align="right" style={{color:profit>0?"rgb(14,203,129)":"red",
                                        fontWeight:500}}>
                                            {profit && "+"}
                                            {row.price_change_percentage_24h.toFixed(2)}%
                                                
                                                
                                            </TableCell>
                                            <TableCell align="right" style={{color:'black'}}>
                                                {symbol}{" "}
                                                {numberWithCommas(row.market_cap.toString().slice(0,-6))}M
                                            </TableCell>           
                                        </TableRow>
                                    )
                                })} 
                            </TableBody>
                        </Table>
                    )
                }
            </TableContainer>
            <Pagination 
            style={{padding:5,width:"100%",display:"flex",justifyContent:"center", backgroundColor:"rgb(161,121,121)",borderRadius:"50px",}}
            
            color='secondary'
             count={(handleSearch()?.length/10).toFixed(0)}
             onChange={(_,value)=>{
                setpage(value);
                window.scroll(0,450);
             }}  />

            
        </Container>

    </ThemeProvider>
  )
}

export default CoinsTable