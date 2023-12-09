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
        <button ref={ref} data-clipboard-text={text}>Copy to Clipboard</button>
     );
}
 
export default CopyToClipboardBtn;