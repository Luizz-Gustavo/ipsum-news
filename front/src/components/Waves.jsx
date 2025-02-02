import "../assets/css/waves.css";

function Waves() {
  return (
    <>
      <div className="waves_container">
        <svg id="waves" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="parallax">
            {/* <use xlinkHref="#gentle-wave" x="48" y="0" fill="#E4E4E4" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="#E8E631" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="#22AB51" /> */}
            <use xlinkHref="#gentle-wave" x="48" y="2" fill="#FFFF00" />
          </g>
        </svg>
      </div>
    </>
  );
}

export default Waves;