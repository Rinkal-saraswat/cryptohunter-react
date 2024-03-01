import { Container, Typography } from '@mui/material'
import React from 'react'
import Carousel from './Carousel'

const Banner = () => {
  return (
    <div style={{ backgroundImage: "url(/Banner.jpg)"}}>
     <Container style={{ height:300 ,display:'flex',flexDirection:'column',justifyContent:'flex-start', paddingTop:'50px'}}>

        <div className='tagline' style={{ textAlign:'center'}}>
        <Typography variant='h3' style={{ fontWeight:'bold',fontFamily:'Monsterrat'}}> Crypto Hunter</Typography>
        <Typography variant='subtitle2' style={{ color:'darkgrey',textTransform:'capitalize',fontFamily:'Monsterrat'}}>Get all Information regarding your favourite currency</Typography>
        </div>
        <Carousel/>
     </Container>


    </div>
  )
}

export default Banner