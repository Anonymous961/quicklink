import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Display = () => {
    // console.log(props)
    const [links,setLinks]=useState(null);
    const [qr,setQR]=useState("");
    const {id}=useParams();
    console.log(id)
    
    const retrieveData= async()=>{
        try{
            const res= await axios.get(`${import.meta.env.VITE_BACK_URL}/qrgen/getLinks/${id}`)
            console.log(res.data)
            setLinks(res.data.data)
            setQR(res.data.qr)
        }catch(err){
            console.log(err)
        }
    }

    // retrieveData();
    useEffect(()=>{
        retrieveData();
    },[])

    return ( 
        <div>
           <h2>Display Page</h2>
            {qr && <img src={qr} width={"200px"} height={"200px"}/>}
            {links && 
            
            }
        </div>
     );
}
 
export default Display;