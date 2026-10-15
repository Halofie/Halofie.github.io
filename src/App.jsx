import './App.css';
import WindowComponent from './disp.jsx';
import Footer from './foot.jsx';
import Projects from './projects.jsx';
import Experience from './experience.jsx';
import About from './about.jsx';
import Gallery from './gallery.jsx';
function App() {
  if (window.location.pathname.startsWith('/gallery/')) {
    return <Gallery />;
  }

  return (
    <>
      <WindowComponent />
      <Projects />
      <About />
      <Experience />
      <Footer />
    </>
  );
}

export default App;
