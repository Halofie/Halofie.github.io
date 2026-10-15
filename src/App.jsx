import { useState } from 'react';
import './App.css';
import WindowComponent from './disp.jsx';
import Footer from './foot.jsx';
import Projects from './projects.jsx';
import Experience from './experience.jsx';
import About from './about.jsx';
function App() {
  
  return (
    
    <>
      <WindowComponent />
      <Projects />
      <About />
      <Experience/>
      <Footer />
    </>
  );
}

export default App;
