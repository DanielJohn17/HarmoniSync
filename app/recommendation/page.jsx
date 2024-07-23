import "./recommendation.css";

const page = () => {
  return (
    <div id="recommendation-main">
      <div className="recommendation-header">
        <h1>
          Discover the <span>Finest Music Tracks</span> Across All Genres
        </h1>
        <h2>
          Explore the most popular genres and find your next favorite song!
        </h2>
      </div>

      <div className="genre-container"></div>
      <button>Submit</button>
      <div className="recommendation-result-container">
        <h2>Suggested Tracks</h2>
        <div className="suggested-tracks-container"></div>
      </div>
    </div>
  );
};

export default page;
