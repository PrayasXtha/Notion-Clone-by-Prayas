import React from 'react'
import {motion} from "framer-motion";
import stringToColor from '@/lib/stringToColor';

function FollowPointer({x,y,info}:{
    x:number;
    y: number;
    info: {
        name:string;
        email:string;
        avatar:string;
    },
}) {
    const color = stringToColor(info.email ||"1")
  return <motion.div
  className='h-4 w-4 rounded-full absolute z-50'
  style={{
    top: y,
    left: x,
    pointerEvents:"none",

  }} initial={{
    scale: 1,
    opacity: 1,
  }}
   animate={{
    scale:1,
    opacity: 1,

  }}
  exit={{
    scale:0,
    opacity: 0,

  }}
  >  
  <svg
  stroke={color}
  fill={color}
  strokeWidth="1"
  viewBox="0 0 16 16"
  className={`h-6 w-6 text-[${color}] transform -rotate-[70deg] -translate-x-12 -translate-y-10 stroke-[${color}]`} 
  height="1em"
  xmlns="https://www.w3.org/TR/SVG2/"
  >
    <path
      d="M41.6 31.3l12.8-12.8L0 0l18.5 54.3 12.8-12.7L53.7 64 64 53.7 41.6 31.3z"
      fill={color}
      stroke="none"
    />
  </svg>
<motion.div  className='px-2 py-2 bg-neutral-200 text-black font-bold whitespace-nowrap min-w-max text-xs rounded-full'
  style={{
    backgroundColor: color,

  }} initial={{
    scale: 0.5,
    opacity: 0,
  }}
   animate={{
    scale:1,
    opacity: 1,

  }}
  exit={{
    scale:0.5,
    opacity: 0,

  }}>
    {info?.name || info?.email}
</motion.div>
  </motion.div>
}

export default FollowPointer
