import requests
import json

url = "http://localhost:8000/api/explain"
data = {"topic": "Quantum Physics"}

try:
    response = requests.post(url, json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"Error: {e}")
