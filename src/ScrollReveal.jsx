import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

function SplitTextOnScroll() {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    const splitText = new SplitType(textRef.current, { types: 'words' });

    gsap.from(splitText.words, {
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
      y: 50,
      opacity: 0,
      stagger: 0.13,
      duration: 0.6,
      ease: 'power2.out',
    });

    return () => {
      splitText.revert();
    };
  }, []);

  return (
    <div className="text-xl sm:text-left lg:text-5xl font-sans mb-10 md:mb-40 lg:mb-20">
      <p ref={textRef} id="my-text">
        I am a <b>Full Stack Developer</b> and an <b>Electronics Enthusiast</b> from <b>India</b>. I specialize in <b>UI/UX
        designs</b> and <b>Front-end</b>.
      </p>
    </div>
  );
}

export default SplitTextOnScroll;
