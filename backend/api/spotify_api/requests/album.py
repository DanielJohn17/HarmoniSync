#!/usr/bin/python3
from api.spotify_api.config import spotify_auth
import json
import requests


class GetAlbum:
    def get_album(self, album_id):
        url = "https://api.spotify.com/v1/albums/" + album_id
        headers = spotify_auth.get_auth_header()

        result = requests.get(url, headers=headers)

        if result.status_code != 200:
            return {"error": "Faild to retrive data"}

        json_result = json.loads(result.content)

        return json_result
    
    def get_album_tracks(self, album_id, limit=20):
        url = "https://api.spotify.com/v1/albums/" + album_id + "/tracks"
        headers = spotify_auth.get_auth_header()

        params = {
            "limit": limit,
        }

        result = requests.get(url, headers=headers, params=params)

        if result.status_code != 200:
            return {"error": "Faild to retrive data"}

        json_result = json.loads(result.content)

        return json_result


album = GetAlbum()