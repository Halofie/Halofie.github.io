function ResumeSection() {
  return (
    <section id="resume" className="resume-section" aria-labelledby="resume-heading">
      <h2 id="resume-heading">The Resume</h2>
      
      <div className="resume-viewer" style={{ width: '100%', height: '800px' }}>
        <iframe
          src="/Amazon_SWE.pdf#toolbar=0"
          title="Varun Krishnan Resume"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
        >
          <p className="resume-fallback">
            Your browser cannot preview PDFs inline.{' '}
            <a href="/Amazon_SWE.pdf" target="_blank" rel="noreferrer">
              Download the PDF instead
            </a>.
          </p>
        </iframe>
      </div>

      <a className="resume-download" href="/Amazon_SWE.pdf" target="_blank" rel="noreferrer">
        Open or download resume ↗
      </a>
    </section>
  );
}

export default ResumeSection;