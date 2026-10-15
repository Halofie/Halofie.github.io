import { lazy, Suspense, useEffect, useState } from 'react';
import './gallery.css';

const functionUrl = import.meta.env.VITE_SUPABASE_FUNCTION_URL;
const InstagramSection = lazy(() => import('./InstagramSection.jsx'));
const ResumeSection = lazy(() => import('./ResumeSection.jsx'));

const imageNotes = {
  'club5.jpg': { title: 'The VITeach Crew', note: 'The people who make big ideas feel possible.' },
  'drawing.jpg': { title: 'Pencil Weather', note: 'A quiet afternoon, translated into lines.' },
  'keyboard.png': { title: 'Keys & Chaos', note: 'Apparently I am out of tune. I prefer “experimental”.' },
  'birthday.jpg': { title: 'Chapter 21', note: 'A new year, bigger plans, same sense of wonder.' },
  'cooking1.jpg': { title: 'Fries Before Guys', note: 'Crispy proof that I can, in fact, cook.' },
  'cooking2.jpg': { title: 'Trust the Recipe', note: 'It looked questionable. It tasted excellent.' },
  'crochet3.jpg': { title: 'Loops of Patience', note: 'One stitch, then another, then suddenly a thing.' },
  'hackathon2.jpg': { title: 'Victory Lap', note: 'My first hackathon win, and a very happy team.' },
  'club1.jpg': { title: 'Full House', note: 'One club event, 160 curious minds, zero boring moments.' },
  'club2.jpg': { title: 'Tiny Scientists', note: 'Making science feel a little more magical.' },
  'club3.jpg': { title: 'Selfie Diplomacy', note: 'They requested a selfie. Naturally, I said yes.' },
  'club4.jpg': { title: 'Classroom Remix', note: 'Trying to make learning feel like an adventure.' },
  'crochet.jpg': { title: 'Spider-Sense', note: 'The beginning of a very handmade superhero.' },
  'crochet2.jpg': { title: 'Spider-Sense: Loading', note: 'Still in the making, still dramatically red.' },
  'friends.jpg': { title: 'The Good Crowd', note: 'The kind of people who make ordinary days sparkle.' },
  'get_you_a_drink.jpg': { title: 'A Drink & A Story', note: 'A little adventure hiding in an ordinary day.' },
  'hackathon.jpg': { title: 'Build Mode', note: 'Building, learning, and collaborating at full speed.' },
  'pets.jpg': { title: 'Meet Miilo', note: 'Hostel cat, unofficial supervisor, excellent company.' },
  'sport.jpg': { title: 'Racket Science', note: 'One of the sports I am surprisingly good at.' },
  'sport2.jpg': { title: 'Endurance Mode', note: 'Nothing can break the momentum.' },
};

function Gallery() {
  const [state, setState] = useState({ status: 'loading', message: '', gallery: null });
  const [selectedImage, setSelectedImage] = useState(null);

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
      <SectionSlider />
      <section id="gallery" className="gallery-section">
        <p className="gallery-kicker">Welcome to my gallery!!!</p>
        <h1>{"This is me :)"}</h1>
        {state.gallery.description && <p className="gallery-description">A creative and curious clg grad</p>}
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
        <p className="gallery-expiry">Many more to join ...</p>
      </section>
      <Suspense fallback={<p className="section-fallback">Loading the next chapter...</p>}>
        <InstagramSection />
        <ResumeSection />
      </Suspense>
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

function SectionSlider() {
  const sections = [
    ['gallery', 'Photo album'],
    ['instagram', 'The photo lab'],
    ['resume', 'About me'],
  ];

  return (
    <nav className="section-slider" aria-label="Gallery sections">
      <span className="slider-glow" />
      {sections.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}
    </nav>
  );
}

export default Gallery;
