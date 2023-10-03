import React from "react";


export default function NavWarning() {
    return(
        <div className="alert alert-info bg-indigo-500/50 mx-auto mt-0 flex animate-fade-up items-center justify-center space-x-5 ">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <p className="md:text-xsm">Please note that while you chat with us you must remain on the app. If you navigate away from the chat window your connection may be lost.</p>
        </div> 
    )
}