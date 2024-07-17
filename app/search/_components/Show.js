const Show = ({ show, i }) => {
    return (
      <div className="search-result-container">
        <p>{i}</p>
        <h3>{show.name}</h3>
        <p>{show.image_url}</p>
        <a href={show.spotify_link}>Spotify Link</a>
      </div>
    )
}

export default Show;  