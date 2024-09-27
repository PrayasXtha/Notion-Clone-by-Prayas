import { Button } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <main className="flex space-x-2  items-center animate-pulse">
     
     <ArrowLeftCircle className="w-6 h-6 md:w-12 md:h-12"></ArrowLeftCircle>
      <h1>Get Started with creating a <b>New Document</b> in my notion-clone!! </h1>

     
  
    </main>
   

    </>
    
  );
}
