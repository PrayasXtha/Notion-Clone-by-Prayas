'use client'

import React, { FormEvent, startTransition, useState, useTransition } from 'react'
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
import { DialogClose } from '@radix-ui/react-dialog';
import { usePathname, useRouter } from 'next/navigation';

import {deleteDocument, inviteUserToDocument} from '@/actions/actions';
import { toast } from "sonner"

import { Input } from "@/components/ui/input"

  

function InviteUser() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const[isPending, setIsPending] = useTransition();



    const handleInvite = async (e: FormEvent ) => {
        e.preventDefault();
        const roomId = pathname.split("/").pop();
        if(!roomId) return;

        startTransition( async() => {
   
            const { success } = await inviteUserToDocument(roomId, email);
            
            if( success ) {
                setIsOpen(false);
                setEmail("")
                toast.success("User added Successfully!")
            } else{ 
                toast.success("Failed to add the user!")
            }
    
        })
        
    }

  return (
    <Dialog open= {isOpen} onOpenChange={setIsOpen}>
        <Button asChild variant="outline">
            <DialogTrigger>Invite</DialogTrigger></Button>
    
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Invite a user for a collab?</DialogTitle>
        <DialogDescription>
          Enter the email of the user you want to invite:
        </DialogDescription>
      </DialogHeader>

        <form onSubmit={handleInvite} 
        className='flex gap-3'
        >
            <Input type="email"
            placeholder='Email'
            className='w-full'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
            />
            <Button type="submit" disabled={!email || isPending}>
                {isPending ? "Inviting" : "Invite"}

            </Button>

        </form>
   

    </DialogContent>
  </Dialog>
  
  )
}

export default InviteUser


