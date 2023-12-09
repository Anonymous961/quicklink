import {useEffect, useRef} from 'react'
import ClipboardJS from "clipboard"

interface copytoclip{
    text:string
}

const CopyToClipboardBtn:React.FC<copytoclip> = ({text}) => {
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(()=>{
        const clipboard=new ClipboardJS(ref.current!, {
            text:()=> text,
        });

        clipboard.on('success',()=>{
            alert("Copied to Clipboard!")
            clipboard.destroy();
        })
        
        return ()=>{
            clipboard.destroy();
        }
    },[text])

    return ( 
        <button ref={ref} data-clipboard-text={text} className='shadow-2xl p-2 m-2 rounded-md bg-black text-white hover:text-yellow-500'>Copy to Clipboard</button>
     );
}
 
export default CopyToClipboardBtn;