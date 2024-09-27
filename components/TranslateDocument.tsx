import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from './ui/button';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

import React, { FormEvent, startTransition, useState, useTransition } from 'react'
import * as Y from "yjs"

import { BotIcon, LanguagesIcon } from "lucide-react";
import { get } from "http";
import { toast } from "sonner";
import { sum } from "firebase/firestore";

import Markdown from 'react-markdown'
import { Value } from "@radix-ui/react-select";

function TranslateDocument({doc }:{ doc: Y.Doc}) {

    const [isOpen, setIsOpen] = useState(false);
  

    const [email, setEmail] = useState("");
    const[isPending, startTransition] = useTransition();
    const [summary, setSummary ] = useState("");
    const [question, setQuestion] = useState("");
    const [language, setLanguage] = useState<string>("");


    const languages = [
        "english",
        "spanish",
        "french",
        "german",
        "chinese",
        "japanese",
        "korean",
        "italian",
        "portuguese",
        "russian",
        "nepali",
        "hindi"
      ];
      

      const handleAskQuestion = async (e:FormEvent) => {
        e.preventDefault();

        startTransition(async () => {
                const documentData = doc.get("document-store").toJSON();

                const res = await fetch (
                    `${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument` ,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            documentData,
                            targetLang: language,
                        })
                    }
                );

                if(res.ok){
                    const {translated_text} = await res.json();

                    setSummary(translated_text);
                    toast.success("Translated successfully!");
                }
        })

    };
  return (
    <Dialog open= {isOpen} onOpenChange={setIsOpen}>
        <Button asChild variant="outline">
            <DialogTrigger><LanguagesIcon></LanguagesIcon>Translate</DialogTrigger></Button>
    
    <DialogContent>
      <DialogHeader>
        <DialogTitle> Translate </DialogTitle>
        <DialogDescription>
Translate your document to different languages:     </DialogDescription>
      </DialogHeader>
{

    summary && (

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
                            <Select value={language} onValueChange={(value) => setLanguage(value)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Languages" />
            </SelectTrigger>
            <SelectContent>
                {languages.map((language) => (

                    <SelectItem key={language} value={language}>
                        {language.charAt(0).toUpperCase() + language.slice(1)}
                    </SelectItem>
                ))}
            </SelectContent>
            </Select>

            <Button type="submit" disabled={!languages || isPending}>
                {isPending ? "Translating" : "Translate"}

            </Button>

        </form>
   

    </DialogContent>
  </Dialog>
  )
}

export default TranslateDocument

