import React from 'react'
import {  useNavigate} from 'react-router-dom';

import Container from '@mui/material/Container';
import { AppBar, MenuItem, Select, ThemeProvider, Toolbar,Typography ,createTheme} from '@mui/material';
import { CryptoState } from '../CryContext';



const Header = () => {
  const navigate=useNavigate();
   const{Currency,setCurrency}=CryptoState();
   console.log(Currency);
  const darkTheme = createTheme({
    palette: {
      primary:{
         main:"#fff",
      } ,
      mode:"dark",
    },
  });
  
   
  return (
    <ThemeProvider theme ={darkTheme}>
    <div className='header' >
      <AppBar color='transparent' position='static'> 
      <Container>
        <Toolbar>
        <Typography  onClick={()=>navigate('/')} className='crypt'>Crypto Hunter  </Typography>
        <Select variant="outlined" style={{
          width:100,
          height:40,
          marginLeft:15,
          color:'white'
        }}
        value={Currency}
        onChange={(e)=>setCurrency(e.target.value)}
        >
          <MenuItem value={'INR'}>INR</MenuItem>
          <MenuItem value={'USD'}>USD</MenuItem>
         
        </Select>
       
        {/* <div >
        <Typography>
        <ul  className='list'>
          
          <li>
          <Typography>  <Link to="/" >Home</Link></Typography> 
          </li>
          
          <li>
          <Typography> <Link to="/Coinpage">Coins</Link></Typography> 
          </li>
          <li>
         <Typography><Link to="/Contact">Contact</Link></Typography> 
          </li>


      </ul>
      </Typography>
        

        </div> */}

       
        </Toolbar>
       
        
        
     
      </Container>

      </AppBar>
     
     
    </div>
    </ThemeProvider>
  )
}

export default Header