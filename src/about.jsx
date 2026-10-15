import './App.css';
import profile from './assets/profile2.jpg';
import SplitTextOnScroll from './ScrollReveal';


function About(){
    const scrollToSection = (id) => {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
      };
    return(
        <>
        <section id="about">
            <p className='text-center m-10 mt-50 text-lg'>About me</p>
            <div className='flex flex-col md:flex-row justify-center pl-4 pr-4 items-center'>
                <div className='m-4 '>
                    <img src={profile} className='object-cover h-75 w-75 lg:h-100 lg:w-100 rounded-2xl' alt="" />
                </div>
                <div className='m-10 md:m-4 md:basis-128 flex flex-col'>
                    <SplitTextOnScroll/>
                    <button onClick={() => scrollToSection('contact')} className='mt-5 sm:mt-0 border button rounded-full border-solid '>Contact</button>
                </div>
            </div>
            
        </section>
        </>
    );
}
export default About;