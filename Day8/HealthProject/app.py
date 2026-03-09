from fastapi import FastAPI

app = FastAPI(
    title="This is my project setup only",
    description="This is my first project in fast api",
    version="1.0.0"
              )


@app.get("/")
def home():
    return {
        "id":1,
        "name":"Deepak"}







