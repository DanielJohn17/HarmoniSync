import Link from "next/link";

const Form = ({ type, playlist, setPlaylist, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1>{type} Playlist</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="">Playlist Name</span>

          <input
            type="text"
            value={playlist.name}
            onChange={(e) => setPlaylist({ ...playlist, name: e.target.value })}
            placeholder="Enter PlaylistName..."
            required
            className="form_input"
          />
        </label>

        <label>
          <span className="">Description</span>

          <textarea
            value={playlist.description}
            onChange={(e) =>
              setPlaylist({ ...playlist, description: e.target.value })
            }
            placeholder="Write description here..."
            required
            className="form_textarea"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4"></div>
      </form>
    </section>
  );
};

export default Form;
