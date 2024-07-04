#!/usr/bin/python3
'''User playlists routes'''
from api.v1.views import app_view
from flask import request, jsonify
from models import storage
from models.playlist import Playlist


# Get all playlists route
@app_view.route("/users/<user_id>/playlists", methods=["GET"])
def playlists(user_id):
    '''Get all playlists route'''

    user = storage.get("User", user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    all_playlists = storage.all("Playlist")
    playlists_list = []

    for playlist in all_playlists.values():
        if playlist.user_id == user_id:
            playlists_list.append(playlist.to_dict())
    
    return jsonify(playlists_list)

# Create playlist route
@app_view.route("/users/<user_id>/playlists/create_playlist", methods=["POST"])
def create_playlist(user_id):
    '''Create playlist route'''

    user = storage.get("User", user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()

    name = data.get("name")
    description = data.get("description")

    if not name or not description:
        return jsonify({"error": "Missing data"}), 400

    new_playlist = Playlist(name=name, description=description, user_id=user_id)

    try:
        new_playlist.save_db()
    except:
        return jsonify({"error": "Could not create playlist"}), 400
    
    return jsonify({"message": "Playlist Created!"}), 201

# Get playlist by id route
@app_view.route("/users/<user_id>/playlists/<playlist_id>", methods=["GET"])
def get_playlist(user_id, playlist_id):
    '''Get playlist by id route'''

    user = storage.get("User", user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    playlist = storage.get("Playlist", playlist_id)

    if not playlist:
        return jsonify({"error": "Playlist not found"}), 404

    return jsonify(playlist.to_dict())

# Delete playlist route
@app_view.route("/users/<user_id>/playlists/<playlist_id>", methods=["DELETE"])
def delete_playlist(user_id, playlist_id):
    '''Delete playlist by id route'''

    user = storage.get("User", user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    playlist = storage.get("Playlist", playlist_id)

    if not playlist:
        return jsonify({"error": "Playlist not found"}), 404

    try:
        playlist.delete()
    except:
        return jsonify({"error": "Could not delete playlist"}), 400
    
    return jsonify({"message": "Playlist Deleted!"}), 200

# Update playlist route
@app_view.route("/users/<user_id>/playlists/<playlist_id>", methods=["PUT"])
def update_playlist(user_id, playlist_id):
    '''Update playlist by id route'''

    user = storage.get("User", user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    playlist = storage.get("Playlist", playlist_id)

    if not playlist:
        return jsonify({"error": "Playlist not found"}), 404

    data = request.get_json()

    name = data.get("name")
    description = data.get("description")

    if not name or not description:
        return jsonify({"error": "Missing data"}), 400

    playlist.name = name
    playlist.description = description

    try:
        playlist.save_db()
    except:
        return jsonify({"error": "Could not update playlist"}), 400
    
    return jsonify({"message": "Playlist Updated!"}), 200
