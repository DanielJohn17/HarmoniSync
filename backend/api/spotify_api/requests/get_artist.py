#!/usr/bin/python3
from api.spotify_api.config import spotify_auth
# from api.spotify_api.requests.spotify_search import search
import requests
import json


class GetArtist:
    def get_artist(self, artist_id):
        url = "https://api.spotify.com/v1/artists/" + artist_id
        headers = spotify_auth.get_auth_header()

        result = requests.get(url, headers=headers)

        if result.status_code != 200:
            return {"error": "Faild to retrive data"}

        json_result = json.loads(result.content)

        return json_result
    
    def get_artist_albums(self, artist_id, limit=20):
        url = "https://api.spotify.com/v1/artists/" + artist_id + "/albums"
        headers = spotify_auth.get_auth_header()

        params = {
            "limit": limit,
        }

        result = requests.get(url, headers=headers, params=params)

        if result.status_code != 200:
            return {"error": "Faild to retrive data"}

        json_result = json.loads(result.content)

        return json_result
    
    def get_artist_top_tracks(self, artist_id, country="US"):
        url = "https://api.spotify.com/v1/artists/" + artist_id + "/top-tracks"
        headers = spotify_auth.get_auth_header()

        params = {
            "country": country,
        }

        result = requests.get(url, headers=headers, params=params)

        if result.status_code != 200:
            return {"error": "Faild to retrive data"}

        json_result = json.loads(result.content)

        return json_result
    
    def get_artist_related_artists(self, artist_id):
        url = "https://api.spotify.com/v1/artists/" + artist_id + "/related-artists"
        headers = spotify_auth.get_auth_header()

        result = requests.get(url, headers=headers)

        if result.status_code != 200:
            return {"error": "Faild to retrive data"}

        json_result = json.loads(result.content)

        return json_result

artist = GetArtist()