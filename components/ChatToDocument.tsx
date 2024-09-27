'use client'

import React, { FormEvent, startTransition, useState, useTransition } from 'react'
import {
    Dialog,
    DialogContent,

    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from './ui/button';
import { toast } from "sonner"

import { Input } from "@/components/ui/input"

 import * as Y from "yjs" 
import { BotIcon, MessageCircleCode } from 'lucide-react';
import Markdown from 'react-markdown';

function ChatToDocument({doc}: {doc: Y.Doc}) {
    const [input, setInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [summary, setSummary] = useState("")
    const [question, setQuestion] = useState("");
    const[isPending, startTransition] = useTransition();



    const handleAskQuestion = async (e: FormEvent ) => {
        e.preventDefault();
        setQuestion (input);

        startTransition(async () => {
            const documentData = doc.get("document-store").toJSON();

            const res = await fetch (
                `${process.env.NEXT_PUBLIC_BASE_URL}/chatToDocument` ,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        documentData,
                        question: input,
                    })
                }
            );

            if(res.ok){
                const {message} = await res.json();

                setInput("");
                setSummary(message);
                toast.success("Question asked successfully!");
            }
    })

        
    }

  return (
    <Dialog open= {isOpen} onOpenChange={setIsOpen}>
        <Button asChild variant="outline">
            <DialogTrigger> 
                <MessageCircleCode className='mr-2'/>
                Chat to document</DialogTrigger></Button>
    
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Ask the AiBot about your document: </DialogTitle>
        <hr className='mt-5' />
                    {question && <p className='mt-5 text-gray-500'>Q: {question}  <h2 className='text-xl text-black'>404: No money to buy ChatGpt-4 !!!!</h2> <span>This function requires gpt4 as this function requires alot of quota! Donate me @prayasshrestha127@gmail.com to have this function running. Thank you! :)</span> </p>   }
      </DialogHeader>


     { summary && (

<div className="flex flex-col items-start max-h-96 overflow-scroll gap-2 p-5 bg-white">
    <div className="flex">
        <BotIcon />
            <p className="font-bold ml-2">
                GPT {isPending? "is thinking...": "Says: "}
            </p>


    </div>
    <p > {isPending? "Thinking": <Markdown>{summary}</Markdown>}</p>
</div>
)
}
            

        <form onSubmit={handleAskQuestion} 
        className='flex gap-3'
        >
            <Input type="text"
            placeholder='e.g: Did Prayas really made this Project?'
            className='w-full'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            
            />
            <Button type="submit" disabled={!input || isPending}>
                {isPending ? "Asking..." : "Ask"}

            </Button>

        </form>
   

    </DialogContent>
  </Dialog>
  
  )
}

export default ChatToDocument


