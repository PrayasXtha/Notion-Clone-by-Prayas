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

import {deleteDocument, inviteUserToDocument, removeUserFromDocument} from '@/actions/actions';
import { toast } from "sonner"

import { Input } from "@/components/ui/input"
import { useUser } from '@clerk/nextjs';
import useOwner from '@/lib/useOwner';
import { useRoom } from '@liveblocks/react/suspense';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collectionGroup, query, where } from 'firebase/firestore';
import { db } from '@/firebase';

  

function ManageUsers() {
    const [isOpen, setIsOpen] = useState(false);
    const[isPending, setIsPending] = useTransition();

    const {user} =useUser();
    const isOwner = useOwner();
    const room = useRoom();

    const [usersInRoom] = useCollection(
        user && query(collectionGroup(db,"rooms"), where("roomId", "==", room.id))
    )

    const handleDelete = async (userId: string ) => {
        startTransition(async() => {
            if(!user) return;

            const {success} = await removeUserFromDocument(room.id, userId);
            
            if(success) {
                toast.success("User removed successfully!");
            }else {
                toast.error("Failed to removed the User !");

            }

        })
        
        
    }

  return (
    <Dialog open= {isOpen} onOpenChange={setIsOpen}>
        <Button asChild variant="outline">
            <DialogTrigger>Manage Users ({usersInRoom?.docs.length}) </DialogTrigger></Button>
    
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Users with access: </DialogTitle>
      </DialogHeader>

        <div>
            {/* Users Info */}
            {usersInRoom?.docs.map((doc)=>(
                <div  key={doc.data().userId }
                className='flex items-center justify-between p-1'
                >
                    <p className='font-light'
                    >
                        {doc.data().userId === user?.emailAddresses[0].toString() ?
                         `You (${doc.data().userId})` : doc.data().userId}
                    </p>
                            <div className='flex items-center gap-2 '>
                                <Button variant='outline'> {doc.data().role}</Button>

                                {isOwner && 
                                 doc.data().userId !== user?.emailAddresses[0].toString() && (

                                    <Button
                                    variant='destructive'
                                    onClick={() => handleDelete(doc.data().userId)}
                                    disabled={isPending}
                                    size='sm'>
                                        {isPending ? "Removing": 'X'}
                                    </Button>


                                )

                                }


                            </div>
                </div>
            ))}
       
        </div>

    </DialogContent>
  </Dialog>
  
  )
}

export default ManageUsers



