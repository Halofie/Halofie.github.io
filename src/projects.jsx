import './App.css';

function Projects(){
    return(
        <>
        <section id='project'>
        <p className='text-center m-5 mt-50 text-lg'>Projects</p>

        <div className='flex flex-col sm:flex-row mt-10 justify-around content-around'>
            <div onClick={() => window.location.href = "https://github.com/Halofie/Smart-India-Hackathon24"} className='font-serif m-5 sm:w-2/7 flex p-10 text-xl overflow-hidden text-center items-center justify-center shadow-xl bg-gray-600/60 backdrop-blur-sm p-6 rounded-3xl hover:bg-cyan-400/60'>
                Plant Disease Detection Using AI
            </div>
            <div onClick={() => window.location.href = "https://github.com/Halofie/webwork2024"} className='font-serif m-5 sm:w-2/7 flex p-10 text-xl overflow-hidden text-center items-center justify-center  shadow-xl bg-gray-600/60 backdrop-blur-sm p-6 rounded-3xl hover:bg-cyan-400/60'>
                Mission Enhans : AI learning chat bot
            </div>
            <div onClick={() => window.location.href = "https://github.com/Halofie/KNF"} className='font-serif m-5  sm:w-2/7 sm:flex p-10 text-xl overflow-hidden text-center justify-center items-center shadow-xl bg-gray-600/60 backdrop-blur-sm p-6 rounded-3xl hover:bg-cyan-400/60'>
                KNF: E-Commerce Platform 
            </div>
        </div>
        <div className='relative'>
        <div className='text-center text-lg mt-10 mb-30 absolute inset-0'>Check out my <a href='https://github.com/Halofie'><b><u>Github</u></b> </a>for more Projects...</div>
        </div>
        </section>
        </>
    );
}

export default Projects;