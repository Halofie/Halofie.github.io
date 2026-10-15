import { useEffect, useState } from 'react';
import './gallery.css';

const functionUrl = import.meta.env.VITE_SUPABASE_FUNCTION_URL;

const imageNotes = {
  'club5.jpg': { title: 'VITeach Club', note: 'Introducing my Awesome Team!!' },
  'drawing.jpg': { title: 'Drawing', note: 'My most recent work...' },
  'keyboard.png': { title: 'Electronic Keyboard', note: 'My niece says "I am out of tune", but I think its not that bad' },
  'birthday.jpg': { title: 'Birthday', note: '21 and bigger ambitions!' },
  'cooking1.jpg': { title: 'Frieess!!', note: 'I cooked it!' },
  'cooking2.jpg': { title: 'Cooking, continued', note: 'looks questionable, but it tastes good!!' },
  'crochet3.jpg': { title: 'Crocheting', note: 'A handmade piece I worked on' },
  'hackathon2.jpg': { title: 'Hackathon', note: 'My first Hackathon Victory!!!' },
  'club1.jpg': { title: 'Another club pic', note: 'A moment from one of my club event with 160 participants.' },
  'club2.jpg': { title: 'Outreach mission', note: 'Me teaching Kids some pretty cool science.' },
  'club3.jpg': { title: 'Curious', note: 'They wanted a selfie with me, cuz I am Cool' },
  'club4.jpg': { title: 'VITeach', note: 'Trying to make classes more fun.' },
  'crochet.jpg': { title: 'spidermannn', note: 'I made the spiderman mask' },
  'crochet2.jpg': { title: 'spidermannn, continued', note: 'in the making.' },
  'friends.jpg': { title: 'Friends', note: 'A memory shared with good friends.' },
  'get_you_a_drink.jpg': { title: 'Get You a Drink', note: 'A fun memory from a day out.' },
  'hackathon.jpg': { title: 'Hackathon', note: 'Building, learning, and collaborating!!' },
  'pets.jpg': { title: 'Pets', note: 'Meet our Hostel Cat Miilo' },
  'sport.jpg': { title: 'Batminton', note: 'One of the sport I am good at!' },
  'sport2.jpg': { title: 'Marathon!!', note: 'Nothing can break my Endurance!!' },
};

function Gallery() {
  const [state, setState] = useState({ status: 'loading', message: '', gallery: null });
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://elfsightcdn.com/platform.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://elfsightcdn.com/platform.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const token = window.location.pathname.split('/').filter(Boolean).pop();

    if (!functionUrl || !token) {
      setState({
        status: 'error',
        message: 'This gallery link is not configured correctly.',
        gallery: null,
      });
      return;
    }

    fetch(`${functionUrl}/gallery?token=${encodeURIComponent(token)}`)
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(data.error || 'This gallery link is invalid or has expired.');
        }
        return data;
      })
      .then((gallery) => setState({ status: 'ready', message: '', gallery }))
      .catch((error) => setState({ status: 'error', message: error.message, gallery: null }));
  }, []);

  useEffect(() => {
    if (!selectedImage) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedImage(null);
    };
    document.addEventListener('keydown', closeOnEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  if (state.status === 'loading') {
    return <GalleryShell><p className="gallery-status">Checking your private gallery...</p></GalleryShell>;
  }

  if (state.status === 'error') {
    return (
      <GalleryShell>
        <p className="gallery-kicker">Private gallery</p>
        <h1>This link is unavailable.</h1>
        <p className="gallery-status">{state.message}</p>
        <a className="gallery-back" href="/">Back to portfolio</a>
      </GalleryShell>
    );
  }

  return (
    <GalleryShell>
      <p className="gallery-kicker">Private gallery</p>
      <h1>{state.gallery.title || "Varun's work"}</h1>
      {state.gallery.description && <p className="gallery-description">{state.gallery.description}</p>}
      <div className="gallery-grid">
        {state.gallery.images.map((image) => {
          const details = imageNotes[image.path.split('/').pop()] || {
            title: image.alt || 'Gallery image',
            note: image.alt || 'A private gallery image.',
          };

          return (
            <button
              className="gallery-card"
              type="button"
              onClick={() => setSelectedImage({ ...image, ...details })}
              key={image.path}
            >
              <img src={image.url} alt={details.title} loading="lazy" />
              <span className="gallery-card-caption">
                <strong>{details.title}</strong>
                <span>{details.note}</span>
              </span>
            </button>
          );
        })}
      </div>
      <p className="gallery-expiry">These image links expire automatically for your privacy.</p>
      <section className="instagram-section" aria-labelledby="instagram-heading">
        <p className="gallery-kicker">Photography</p>
        <h2 id="instagram-heading">More from my photography account</h2>
        <div
          className="elfsight-app-1af05ea9-42aa-41bb-8e23-e36d7baf4fdb"
          data-elfsight-app-lazy
        />
      </section>
      <section className="resume-section" aria-labelledby="resume-heading">
        <p className="gallery-kicker">Background</p>
        <h2 id="resume-heading">My resume</h2>
        <div className="resume-viewer">
          <iframe
            src="/Amazon_SWE.pdf"
            title="Varun Krishnan resume"
          />
        </div>
        <a className="resume-download" href="/Amazon_SWE.pdf" target="_blank" rel="noreferrer">
          Open or download resume
        </a>
      </section>
      {selectedImage && (
        <div className="gallery-modal" role="dialog" aria-modal="true" aria-label={selectedImage.title}>
          <button className="gallery-modal-backdrop" type="button" aria-label="Close image" onClick={() => setSelectedImage(null)} />
          <div className="gallery-modal-content">
            <button className="gallery-modal-close" type="button" onClick={() => setSelectedImage(null)} aria-label="Close image">
              ×
            </button>
            <img src={selectedImage.url} alt={selectedImage.title} />
            <div className="gallery-modal-caption">
              <h2>{selectedImage.title}</h2>
              <p>{selectedImage.note}</p>
            </div>
          </div>
        </div>
      )}
    </GalleryShell>
  );
}

function GalleryShell({ children }) {
  return <main className="gallery-page"><div className="gallery-content">{children}</div></main>;
}

export default Gallery;
