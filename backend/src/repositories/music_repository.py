import requests

class MusicRepository:

    @staticmethod
    def get_google_drive_music(access_token):
        if access_token == "demo_token_123":
            return [
                {"id": "demo-1", "name": "Midnight City - M83 (Demo)"},
                {"id": "demo-2", "name": "Starboy - The Weeknd (Demo)"},
                {"id": "demo-3", "name": "Blinding Lights - The Weeknd (Demo)"}
            ]

        url = "https://www.googleapis.com/drive/v3/files"
        headers = {"Authorization": f"Bearer {access_token}"}
        params = {
            "q": "mimeType contains 'audio/'",
            "fields": "files(id, name)"
        }

        try:
            response = requests.get(url, headers=headers, params=params, timeout=10)
            if response.status_code != 200:
                return []
            return response.json().get("files", [])
        except Exception:
            return []
