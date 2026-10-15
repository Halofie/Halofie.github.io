import './App.css';
import insta from './assets/instagram.svg';
import link from './assets/linked.svg';
import Iridescence from './waves.jsx';
function foot() {
  return (
    <>
    <section id="contact">
      <p className='text-center m-10 mt-20 text-lg'>Contact me</p>

      <div className='h-auto mt-5 w-full'>
        <div className='relative h-128 sm:h-180'>
          
          <div className=' h-135 sm:h-180 p-5 md:pr-10 md:pl-10 w-full inset-0 absolute'>
            <Iridescence
              color={[0.6, 0.7, 1]}
              mouseReact={false}
              amplitude={0.5}
              speed={1.0}
            />
          </div>

          <div className='absolute flex flex-col h-128 sm:h-180 inset-0 w-full'>
              <div className='text-4xl mt-20 sm:text-6xl sm:mt-25 md:text-7xl lg:ml-40 lg:text-8xl m-11 sm:ml-25 sm:mr-10 lg:mt-20'>
                <p>"Let's turn dreams <br />into reality.<br />drop a message!"<br/>:D</p>
              </div>
              <div className='text-3xl mt-5 sm:text-4xl sm:mt-25 lg:text-3xl md:pr-25 lg:pr-40 md:mt-15 lg:mt-6 flex flex-col items-center md:items-end'>
                <button onClick={() => window.location.href = "mailto:varun.krishnan2023@vitstudent.ac.in"} className=' border button font-serif rounded-full border-solid transition  hover:bg-white hover:text-sky-500'>Contact</button>
                <p className='text-sm text-center sm:text-right sm:text-xl mt-7 sm:ml-10 sm:mt-4'>Classic? Here is my email: <br className='sm:hidden'/><b>varun.krishnan2023@vitstudent.ac.in</b></p>
              </div>
          </div>

        </div>
        <div className='flex justify-center mt-10 sm:mt-0'> 
          <a href="https://www.instagram.com/thisisvarun1"><img src={insta} className="bg-white m-6  rounded-full border border-white h-15 w-15" alt="" /></a>
          <a href="https://www.linkedin.com/in/varun-krishnan-r"><img src={link} className="bg-white  m-6 rounded-full border border-white h-15 w-15" alt="" /></a>
        </div>
      </div>
      </section>
    </>
  );
};

export default foot;
