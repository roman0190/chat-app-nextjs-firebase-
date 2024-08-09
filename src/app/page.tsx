import Image from "next/image";
import SignIn from "./auth/sign-in/page";

export default function Home() {
  return (
   <>
   <div className='bg-white text-black min-h-screen'>
     <SignIn />
   </div>
   </>
  );
}
