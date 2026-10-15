import './App.css';
import { useState, useRef } from "react";
import insta from './assets/instagram.svg';
import git from './assets/github.svg';
import link from './assets/linked.svg';
import resume from './assets/resume.svg';
import full from './assets/share.svg';
import Balatro from './blue-swirl.jsx';
import profile from './assets/profile.jpg';

function WindowComponent() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("https://thisisvarun.vercel.app");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      console.log("Link copied to Clipboard !")
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };
  const handleDownload = () => {
    const resumeUrl = "/public/Varun's_RESUME.pdf"; // Ensure the file is in the public folder
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Resume_Of_Varun.pdf"; // Sets the file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section>
    <div className="border border-black border-8 w-full h-180 md:h-230 bg-white">
      <div className=" w-full h-8 border border-black bg-black"> <img src={full} onClick={copyToClipboard} className=" w-6 h-6 flex items-center ml-5" alt="share" /> </div>
      {/* Top Menu Bar */}
      <div className="flex items-center justify-around sm:justify-between border-b-5 p-0 border-b border-black bg-white">
        {/* Left Icons */}
        <div className=" items-center space-x-2 p-1 ml-5 hidden sm:flex">
          <img onClick={() => window.location.href = "https://www.instagram.com/thisisvarun1"} src={insta} className="w-7 h-7 mr-5 flex items-center justify-center"/>
          <img onClick={() => window.location.href = "https://github.com/Halofie"} src={git} className="w-7 h-7 mr-5 flex items-center justify-center"/>
          <img onClick={() => window.location.href = "https://www.linkedin.com/in/varun-krishnan-r"} src={link} className="w-7 h-7 mr-5 flex items-center justify-center"/>
          <img onClick={handleDownload} src={resume} className="w-7 h-7 mr-5 flex items-center justify-center"/>
        </div>

        {/* Top Menu Options */}
        <div className="flex items-center text-sm sm:text-lg sm:space-x-4 overflow-hidden text-black font-bold">
          <button  onClick={() => scrollToSection('project')} className="px-4 focus:outline-none rounded-none hover:bg-black hover:text-white">Projects</button>
          <button  onClick={() => scrollToSection('about')} className="px-4 focus:outline-none rounded-none hover:bg-black hover:text-white">About</button>
          <button  onClick={() => scrollToSection('exp')} className="px-4 focus:outline-none rounded-none hover:bg-black hover:text-white">Skills</button>
          <button  onClick={() => scrollToSection('contact')} className="px-4 focus:outline-none rounded-none hover:bg-black hover:text-white">Contact</button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="h-full bg-black md:h-200 w-full p-1 relative flex justify-center items-center"> 
          <div className='md:h-208 h-180 flex absolute inset-0 '>
            <Balatro isRotate={false} mouseInteraction={false} pixelFilter={900}/>
            
          </div>
          <div className="w-70 sm:w-100 md:w-120 rounded-2xl absolute overflow-hidden shadow-xl bg-gray-600/60 backdrop-blur-sm p-6">
            <img src={profile} className='basis-1/3 rounded-md' />
            <div className='basis-2/3 text-white '><h1 className='text-xl'><span className='key'>Hello!</span> <span className='key'>this</span> <span className='key'>is</span> <br className='hidden sm:inline'/><span className='key'> Varun</span> <span className='hidden key sm:inline'>Krishnan</span></h1></div>
          </div>
      </div>
    </div>
    </section>
  );
}


export default WindowComponent;
