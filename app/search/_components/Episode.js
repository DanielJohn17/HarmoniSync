const Episode = ({ episode, i }) => {
    return (
      <div className="search-result-container">
        <p>{i}</p>
        <h3>{episode.name}</h3>
        <p>{episode.image_url}</p>
        <a href={episode.spotify_link}>Spotify Link</a>
      </div>
    )
}

export default Episode;