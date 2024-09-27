
'use client'

import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react';
import { useUser } from '@clerk/nextjs'
import React from 'react'
import Breadcrumbs from './Breadcrumbs';




function Header() {
    const {user} = useUser();
  return (
    <div className='flex items-center justify-between p-5'>
        {user && (
            <h1>{user?.firstName}{`'s`} Space</h1>
        )}
        <div>
             <Breadcrumbs></Breadcrumbs>
        </div>

   

        <div>
            <SignedOut>
                <SignInButton></SignInButton>
            </SignedOut>
            <SignedIn>
            <UserButton></UserButton>
          
            </SignedIn>
        </div>
    </div>
  )
}

export default Header
