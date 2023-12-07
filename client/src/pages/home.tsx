import { FormEvent, useState } from "react";
import axios from 'axios';
import {v4 as uuid4} from 'uuid';

const Home = () => {
    const [key,setKey]=useState("");
    const [value,setValue]=useState("");
    const [links,setLinks]=useState([{key:"github",value:"www.github.com/anonymous961",id:"1"}]);

    const handleSubmit=async(e: FormEvent)=>{
        e.preventDefault();
        try{
            const res= await axios.post("http://localhost:4000/qrgen/gen",{links},{headers:{
                "Content-Type":"application/json"
            }})
            console.log(res.data);
        }catch(err:unknown){
            console.log(err)
        }
    }

    const handleLinks=(e:FormEvent)=>{
        e.preventDefault();
        const id=uuid4();
        setLinks([...links,{key,value,id}])
        setKey("");
        setValue("");
        console.log(links)
    }


    return (  
        <div>
            <h1 >Home</h1>
            {links.map((link)=>(
                <div className="flex" key={link.id}>
                    <p className="m-2 border-2 rounded-md p-1">{link.key}</p>
                    <p className="m-2 border-2 rounded-md p-1">{link.value}</p>
                    <button onClick={()=>{
                        setLinks(()=>{
                            return links.filter((l)=>l.id!==link.id)
                        })
                    }}>delete</button>
                </div>
            ))}
            <form onSubmit={handleLinks}>
                <input type="text" className="m-2" value={key} onChange={(e)=>setKey(e.target.value)} required/>
                <input type="text" className="m-2" value={value} onChange={(e)=>setValue(e.target.value)} required/>
                <input type="submit" className="border-2 p-1 rounded-md px-2" value="+" />
            </form>
            <button onClick={handleSubmit}>Generate</button>
        </div>
    );
}
 
export default Home;