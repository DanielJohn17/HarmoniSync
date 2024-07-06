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
            final_items = []
            items = json_result.get(search_type + 's', {}).get('items', [])

            for item in items:
                final_items.append({
                    "id": item.get("id"),
                    "name": item.get("name"),
                    "followers": item.get("followers", {}).get("total"),
                    "genres": item.get("genres", []),
                    "type": search_type,
                    "images": item.get("images", [])[0].get("url") if item.get("images", []) else None,
                    "spotify_link": item.get("external_urls", {}).get("spotify"),
                })
            search_results[search_type + 's'] = final_items
        
        return search_results

spotify_search = SpotifySearch()

