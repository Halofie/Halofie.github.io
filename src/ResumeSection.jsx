function ResumeSection() {
  return (
    <section id="resume" className="resume-section" aria-labelledby="resume-heading">
      
      <h2 id="resume-heading">The Resume</h2>
      <div className="resume-viewer">
        <object data="/Amazon_SWE.pdf" type="application/pdf" aria-label="Varun Krishnan resume">
          <embed src="/Amazon_SWE.pdf" type="application/pdf" />
          <p className="resume-fallback">
            Your browser cannot preview PDFs here. Use the link below to open the resume.
          </p>
        </object>
      </div>
      <a className="resume-download" href="/Amazon_SWE.pdf" target="_blank" rel="noreferrer">
        Open or download resume ↗
      </a>
    </section>
  );
}

export default ResumeSection;
