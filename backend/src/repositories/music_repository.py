import requests

class MusicRepository:

    @staticmethod
    def get_google_drive_music(access_token):
        url = "https://www.googleapis.com/drive/v3/files"

        headers = {
            "Authorization": f"Bearer {access_token}"
        }

        params = {
            "q": "mimeType contains 'audio/'",
            "fields": "files(id, name)"
        }

        response = requests.get(url, headers=headers, params=params)

        files = response.json().get("files", [])

        return files
