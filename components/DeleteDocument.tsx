'use client'

import React, { startTransition, useState, useTransition } from 'react'
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

import {deleteDocument} from '@/actions/actions';
import { toast } from "sonner"


  

function DeleteDocument() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();


   const handleDelete = async() => {

        const roomId = pathname.split("/").pop();
        if(!roomId) return;

    startTransition( async() => {
   
        const { success } = await deleteDocument(roomId);
        
        if( success ) {
            setIsOpen(false);
            router.replace("/");
            toast.success("Rooms Deleted Successfully!")
        } else{ 
            toast.success("Failed to Deleted room!")
        }

    })

   }
    
    const[isPending, setIsPending] = useTransition();

  return (
    <Dialog open= {isOpen} onOpenChange={setIsOpen}>
        <Button asChild variant="destructive">
            <DialogTrigger>Delete</DialogTrigger></Button>
    
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely you want to delete?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete all the user and its contents.
        </DialogDescription>
      </DialogHeader>
    <DialogFooter className="sm:justify-end gap-2">
        <Button 
        type='button'
        variant="destructive"
        onClick={handleDelete}
        disabled={isPending}>
            {isPending ? "Deleting": "Delete"}
        </Button>
        <DialogClose asChild>
        
        <Button type="button" variant="secondary">
        Close
        </Button>
    </DialogClose>
    </DialogFooter>
   

    </DialogContent>
  </Dialog>
  
  )
}

export default DeleteDocument

