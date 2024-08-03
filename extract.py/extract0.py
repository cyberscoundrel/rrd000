from base64 import b64decode

import requests

api_response = requests.post(
    "https://api.zyte.com/v1/extract",
    auth=("f7c6327814744c1b86ec15ab44ebc908", ""),
    json={
        "url": "https://a1rents.com/scaffold_lifts.htm",
        "httpResponseBody": True,
        "product": True,
        "productOptions": {"extractFrom":"httpResponseBody"},
    },
)
http_response_body: bytes = b64decode(
    api_response.json()["httpResponseBody"])
product = api_response.json()["product"]