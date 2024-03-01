
import './App.css';

import { Route, Routes }from "react-router-dom";
import Header from './Components/Header';
import Homepage from './Pages/Homepage';
import Coinpage from './Pages/Coinpage';
//import Header from './Components/Header';
//import Contact from './Pages/Contact';




function App() {

  return (
    <div className='main'>
    <Header/>
    
   
   <Routes>
       <Route  path="/" element={<Homepage/>} />
       <Route path ="/Coinpage/:id" element={<Coinpage/>}/>
       {/* <Route path ="/Contact" element={<Contact />}/> */}
      
    </Routes>
       
    



   </div>
  
  );
}





export default App;
