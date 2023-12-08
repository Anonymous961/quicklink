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
        alert("Copied to Clipboard!")
        return ()=>{
            clipboard.destroy();
        }
    },[text])

    return ( 
        <button ref={ref} data-clipboard-text={text}>Copy to Clipboard</button>
     );
}
 
export default CopyToClipboardBtn;