import json
import re

from openai import OpenAI

from core.config import settings


class OpenAIService:
    def __init__(self):
        self.client = None

    def _get_client(self):
        if self.client is not None:
            return self.client
        if not settings.OPENAI_API_KEY:
            raise ValueError("OPENAI_API_KEY is missing in backend .env")
        self.client = OpenAI(api_key=settings.OPENAI_API_KEY)
        return self.client

    @staticmethod
    def _parse_model_json(content: str) -> dict:
        """Models often wrap JSON in markdown fences; strip and parse safely."""
        text = (content or "").strip()
        fence = re.search(r"```(?:json)?\s*([\s\S]*?)```", text)
        if fence:
            text = fence.group(1).strip()
        try:
            return json.loads(text)
        except json.JSONDecodeError:
            start = text.find("{")
            end = text.rfind("}")
            if start != -1 and end > start:
                return json.loads(text[start : end + 1])
            raise ValueError("Model did not return valid JSON. Try simplifying the prompt.") from None

    def list_capabilities(self):
        return [
            {
                "id": "chat",
                "title": "Text Generation",
                "description": "General chat and prompt completion using OpenAI chat models.",
            },
            {
                "id": "structured",
                "title": "Structured Output",
                "description": "Generate machine-readable JSON from natural language prompts.",
            },
            {
                "id": "embeddings",
                "title": "Embeddings",
                "description": "Convert text to vectors for semantic search and retrieval.",
            },
            {
                "id": "moderation",
                "title": "Moderation",
                "description": "Classify potentially unsafe content.",
            },
            {
                "id": "image",
                "title": "Image Generation",
                "description": "Generate images from text prompts.",
            },
            {
                "id": "models",
                "title": "Model Discovery",
                "description": "List currently available models in your account.",
            },
        ]

    def chat(self, prompt: str, model: str | None = None, system_prompt: str | None = None):
        client = self._get_client()
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})

        response = client.chat.completions.create(
            model=model or settings.CHAT_MODEL,
            messages=messages,
        )
        return response.choices[0].message.content or ""

    def structured_output(self, prompt: str, model: str | None = None):
        schema_prompt = (
            "Return ONLY valid JSON with keys: title (string), summary (string), "
            "key_points (array of strings), confidence (number from 0 to 1)."
        )
        content = self.chat(
            prompt=f"{schema_prompt}\n\nUser prompt: {prompt}",
            model=model or settings.CHAT_MODEL,
        )
        return self._parse_model_json(content)

    def embedding(self, text: str, model: str | None = None):
        client = self._get_client()
        response = client.embeddings.create(
            model=model or settings.EMBEDDING_MODEL,
            input=text,
        )
        vector = response.data[0].embedding
        return {
            "dimensions": len(vector),
            "preview": vector[:10],
        }

    def moderation(self, text: str, model: str | None = None):
        client = self._get_client()
        response = client.moderations.create(
            model=model or settings.MODERATION_MODEL,
            input=text,
        )
        result = response.results[0]
        return {
            "flagged": result.flagged,
            "categories": result.categories.model_dump(),
            "category_scores": result.category_scores.model_dump(),
        }

    def image(self, prompt: str, model: str | None = None, size: str = "1024x1024"):
        client = self._get_client()
        response = client.images.generate(
            model=model or settings.IMAGE_MODEL,
            prompt=prompt,
            size=size,
        )
        item = response.data[0]
        if getattr(item, "b64_json", None):
            return {"base64": item.b64_json}
        return {"url": item.url}

    def models(self):
        client = self._get_client()
        response = client.models.list()
        ids = sorted([model.id for model in response.data])
        return ids[:100]


openai_service = OpenAIService()
