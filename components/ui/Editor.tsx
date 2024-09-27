'use client'

import { useRoom, useSelf } from '@liveblocks/react/suspense'
import * as Y from "yjs"
import React, { useEffect, useState } from 'react'
import {LiveblocksYjsProvider} from "@liveblocks/yjs"
import { Button } from './button';
import { MoonIcon, SunIcon } from 'lucide-react';
import {BlockNoteView} from '@blocknote/shadcn'
import {BlockNoteEditor} from '@blocknote/core'
import {useCreateBlockNote} from '@blocknote/react'
import stringToColor from '@/lib/stringToColor';

import "@blocknote/shadcn/style.css";
import "@blocknote/core/fonts/inter.css";
import TranslateDocument from '../TranslateDocument'
import ChatToDocument from '../ChatToDocument'


type EditorProps = {
  doc: Y.Doc;
  provider: any;
  darkMode: boolean;
}

function BlockNote({doc , provider, darkMode}: EditorProps){
  const userInfo = useSelf((me) => me.info);//real time typing updates!!
  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
    provider,
    fragment: doc.getXmlFragment("document-store"),
    user:{  
      name: userInfo?.name,
      color: stringToColor(userInfo?.email),
    }
  }
  })

  return (
    <div className='relative max-w-6xl mx-auto'>
    <BlockNoteView
    className='min-h-screen'
    editor={editor}
    theme={darkMode ? "dark":"light"}/>
    </div>
  )
}

function Editor() {
    const room = useRoom();
    const [doc,setDoc] = useState<Y.Doc>();
    const[provider,setProvider]= useState<LiveblocksYjsProvider>();
    const [darkMode,setDarkMode] = useState(false);

  

     useEffect (() => {
       const yDoc = new Y.Doc();
       const yProvider = new LiveblocksYjsProvider(room,yDoc);
      setDoc(yDoc);
      setProvider(yProvider);
       return () => {
          yDoc?.destroy();
          yProvider?.destroy();
       }
    }, [room]);

    if (!doc || !provider){
      return null;
    }

    const style = `hover:text-white ${
        darkMode ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
        : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-100"
    }`

   
  return (
    
    <div className='max-w-6xl mx-auto  bg-white p-5'>
        <div className='flex items-center gap-2 justify-end mb-10'>
             {/* Traslator ai */}
              <TranslateDocument doc={doc}></TranslateDocument>
            {/* ChatToDoc AI */}
    <ChatToDocument doc={doc}></ChatToDocument>
            {/* dark mode */}
            <Button className={style} onClick={()=> setDarkMode(!darkMode)}> 
              {darkMode ? <SunIcon></SunIcon>: <MoonIcon></MoonIcon>}
              </Button>
        </div>
           

    <BlockNote doc={doc} provider={provider} darkMode= {darkMode}/>
    </div>
  )
}

export default Editor
