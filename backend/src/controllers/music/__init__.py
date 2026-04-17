from flask import request, Response
import requests
from flask_restx import Namespace, Resource, fields
from src.repositories.music_repository import MusicRepository

music_namespace = Namespace("music", description="Music operations")

# 4.3 Schema (OBRIGATÓRIO no Smart Dash)
music_item = music_namespace.model('Music Item', {
    'id': fields.String(required=True),
    'name': fields.String(required=True),
})

music_response = music_namespace.model('Music Response', {
    'data': fields.List(fields.Nested(music_item)),
    'meta': fields.Raw
})

@music_namespace.route("/drive/musics")
class GetDriveMusics(Resource):

    @music_namespace.marshal_with(music_response)
    def get(self):
        # Captura o token do header
        token = request.headers.get("Authorization")
        
        # Limpa o prefixo 'Bearer ' se presente para o repository
        access_token = token
        if token and token.startswith("Bearer "):
            access_token = token.split(" ")[1]

        # Busca os dados no repository
        data = MusicRepository.get_google_drive_music(access_token)

        response = {
            "data": data,
            "meta": {
                "total": len(data)
            }
        }

        return response, 200

@music_namespace.route("/stream/<id>")
class StreamMusic(Resource):

    def get(self, id):
        token = request.headers.get("Authorization")

        url = f"https://www.googleapis.com/drive/v3/files/{id}?alt=media"

        response = requests.get(url, headers={
            "Authorization": token
        }, stream=True)

        return Response(response.iter_content(chunk_size=1024),
                        content_type=response.headers.get('Content-Type'))
