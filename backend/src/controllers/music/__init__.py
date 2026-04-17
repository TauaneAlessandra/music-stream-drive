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
        # Tenta pegar o token do header ou do query param (necessário para tag <audio>)
        token = request.headers.get("Authorization")
        if not token:
            token = request.args.get("token")
            if token and not token.startswith("Bearer "):
                token = f"Bearer {token}"

        if id.startswith("demo-"):
            # Redirect to a public sample audio for demo purposes
            sample_url = "https://www.bensound.com/bensound-music/bensound-creativeminds.mp3"
            return Response(requests.get(sample_url, stream=True).iter_content(chunk_size=16384), content_type="audio/mpeg")

        url = f"https://www.googleapis.com/drive/v3/files/{id}?alt=media"
        
        try:
            response = requests.get(url, headers={"Authorization": token}, stream=True, timeout=10)
            
            # Aumentando chunk_size para 16KB para melhor performance de áudio
            return Response(response.iter_content(chunk_size=16384),
                            content_type=response.headers.get('Content-Type'))
        except Exception as e:
            return {"error": str(e)}, 500
