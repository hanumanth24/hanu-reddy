import { useNavigate } from "react-router-dom";

const errorCopy = {
  400: {
    eyebrow: "Bad Request",
    title: "This request does not look right.",
    text: "The page request could not be understood. Go back home or use the navigation to continue.",
  },
  404: {
    eyebrow: "Not Found",
    title: "This page is outside the delivery path.",
    text: "The route may have moved, or the link may be incorrect. The portfolio is still available from the homepage.",
  },
  500: {
    eyebrow: "Server Error",
    title: "Something failed while loading.",
    text: "The page could not be completed by the server. Try again, or return home and continue from there.",
  },
};

export default function ErrorPage({ code = 404 }) {
  const navigate = useNavigate();
  const copy = errorCopy[code] ?? errorCopy[404];

  return (
    <section className="error-page" aria-labelledby="error-title">
      <div className="error-panel">
        <div className="error-visual" aria-hidden="true">
          <span className="error-code">{code}</span>
          <span className="error-ring error-ring-one" />
          <span className="error-ring error-ring-two" />
          <span className="error-node error-node-one">AEM</span>
          <span className="error-node error-node-two">CDN</span>
          <span className="error-node error-node-three">Route</span>
        </div>
        <div className="error-copy">
          <span>{copy.eyebrow}</span>
          <h1 id="error-title">{copy.title}</h1>
          <p>{copy.text}</p>
          <div className="error-actions">
            <button type="button" className="primary-btn button-reset" onClick={() => navigate("/")}>
              Go Home
            </button>
            <button type="button" className="secondary-btn button-reset" onClick={() => navigate(-1)}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
