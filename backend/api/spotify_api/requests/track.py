#!/usr/bin/python3
from api.spotify_api.config import spotify_auth
import json
import requests

class GetTrack:
    def get_track(self, track_id):
        url = "https://api.spotify.com/v1/tracks/" + track_id
        headers = spotify_auth.get_auth_header()

        result = requests.get(url, headers=headers)

        if result.status_code != 200:
            return {"error": "Faild to retrive data"}

        json_result = json.loads(result.content)

        return json_result

    def get_track_audio_features(self, track_id):
        url = "https://api.spotify.com/v1/audio-features/" + track_id
        headers = spotify_auth.get_auth_header()

        result = requests.get(url, headers=headers)

        if result.status_code != 200:
            return {"error": "Faild to retrive data"}

        json_result = json.loads(result.content)

        return json_result

    def get_track_audio_analysis(self, track_id):
        url = "https://api.spotify.com/v1/audio-analysis/" + track_id
        headers = spotify_auth.get_auth_header()

        result = requests.get(url, headers=headers)

        if result.status_code != 200:
            return {"error": "Faild to retrive data"}

        json_result = json.loads(result.content)

        return json_result


class GetRecommendation:
    def get_recommendation(self, seed_artists, seed_genres, seed_tracks, limit=20):
        url = "https://api.spotify.com/v1/recommendations"
        headers = spotify_auth.get_auth_header()

        params = {
            "seed_artists": ",".join(seed_artists),
            "seed_genres": ",".join(seed_genres),
            "seed_tracks": ",".join(seed_tracks),
            "limit": limit,
        }

        result = requests.get(url, headers=headers, params=params)

        if result.status_code != 200:
            return {"error": "Faild to retrive data"}

        json_result = json.loads(result.content)

        return json_result
    
    def get_recommendation_genre(self, seed_genres, limit=20):
        url = "https://api.spotify.com/v1/recommendations"
        headers = spotify_auth.get_auth_header()

        params = {
            "seed_genres": ",".join(seed_genres),
            "limit": limit,
        }

        result = requests.get(url, headers=headers, params=params)

        if result.status_code != 200:
            return {"error": "Faild to retrive data"}

        json_result = json.loads(result.content)

        return json_result