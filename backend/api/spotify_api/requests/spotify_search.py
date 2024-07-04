#!/usr/bin/python3
from api.spotify_api.config import spotify_auth
import requests
import json


class SpotifySearch:
    # def calc_offset(offset, limit):


    def search(self, query_user, search_types, limit=20):
        url = "https://api.spotify.com/v1/search"
        headers = spotify_auth.get_auth_header()

        search_type_str = ",".join(search_types)

        params = {
            "q": query_user,
            "type": search_type_str,
            "limit": limit,
        }

        result = requests.get(url, headers=headers, params=params)

        if result.status_code != 200:
            return {"error": "Faild to retrive data"}
        
        json_result = json.loads(result.content)

        search_results = {}

        for search_type in search_types:
            items = json_result.get(search_type + 's', {}).get('items', [])
            search_results[search_type + 's'] = items
        
        return search_results

search = SpotifySearch()

