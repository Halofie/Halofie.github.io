import './App.css';
import ScrollVelocity from './ScrollVelocity.jsx';
function Experience(){

    return(
        <>
        <section id="exp">
        <p className='text-center m-2 mt-20 md:mt-30 text-lg' id="skill">Skills</p>
            
            <ScrollVelocity
              texts={['React - Tailwind - Php - Sql - Mongo - Node - ', 'C - Cpp - Py - Java - JS - Matlab - ASM - ']} 
              velocity={90} 
              className="custom-scroll-text"
            />
        <p className='text-center m-3 mt-30 text-lg'>Experience</p>
        <div className='mb-30'>
          <p className='text-center text-bold font-extrabold text-white text-xl sm:text-4xl md:text-6xl border-b-2 p-10 md:p-15 hover:bg-white hover:text-black'>Web Development</p>
          <p className='text-center text-bold font-extrabold text-white text-xl sm:text-4xl md:text-6xl border-b-2 p-10 md:p-15 hover:bg-white hover:text-black'>UI/UX Designing</p>
          <p className='text-center text-bold font-extrabold text-white text-xl sm:text-4xl md:text-6xl border-b-2 p-10 md:p-15 hover:bg-white hover:text-black'>Competitive Programming</p>
          {/* <div className='text-center text-white text-xl sm:text-4xl md:text-6xl border-b-2 p-10 md:p-15 hover:bg-white hover:text-black'>ASIC</div> */}
        </div>
        </section>
        </>
    );
}

export default Experience;