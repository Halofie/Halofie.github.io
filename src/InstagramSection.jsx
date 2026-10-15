import { useEffect } from 'react';

function InstagramSection() {
  useEffect(() => {
    if (!document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://elfsightcdn.com/platform.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section id="instagram" className="instagram-section" aria-labelledby="instagram-heading">
      <p className="gallery-kicker">My photography journey</p>
      <h2 id="instagram-heading">My Instagram Page</h2>
      <div background="white" className="elfsight-app-1af05ea9-42aa-41bb-8e23-e36d7baf4fdb" data-elfsight-app-lazy />
    </section>
  );
}

export default InstagramSection;
