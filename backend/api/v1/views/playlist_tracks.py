#!/usr/bin/python3
from api.v1.views import app_view
from flask import request, jsonify
from models import storage


@app_view.route("/users/<user_id>/playlists/<playlist_id>/tracks", methods=["GET"])
def get_playlist_tracks(user_id, playlist_id):
    '''Get playlist tracks route'''

    user = storage.get("User", user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    playlist = storage.get("Playlist", playlist_id)
    if not playlist:
        return jsonify({"error": "Playlist not found"}), 404

    # tracks = playlist.tracks
    # tracks_list = []

    # for track in tracks:
    #     tracks_list.append(track.to_dict())

    # return jsonify(tracks_list)


@app_view.route("/users/<user_id>/playlists/<playlist_id>/tracks/add_track", methods=["POST"])
def add_track_to_playlist(user_id, playlist_id):
    '''Add track to playlist route'''

    user = storage.get("User", user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    playlist = storage.get("Playlist", playlist_id)
    if not playlist:
        return jsonify({"error": "Playlist not found"}), 404

    data = request.get_json()

    track_id = data.get("track_id")
    if not track_id:
        return jsonify({"error": "Missing data"}), 400

    # track = storage.get("Track", track_id)
    # if not track:
    #     return jsonify({"error": "Track not found"}), 404

    # playlist.tracks.append(track)
    # playlist.save_db()

    return jsonify({"message": "Track added to playlist"}), 201