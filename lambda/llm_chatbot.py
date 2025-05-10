import json
import os
import time
import requests
from transformers import pipeline

# Load model name from environment or use default
MODEL_NAME = os.environ.get("HF_MODEL", "distilgpt2")

# Initialize the HuggingFace pipeline (cold start will be slow)
generator = pipeline("text-generation", model=MODEL_NAME)

# Supabase REST endpoint and API key (set in Lambda env vars)
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")


def log_to_supabase(prompt, response, latency, status):
    if not SUPABASE_URL or not SUPABASE_KEY:
        return
    payload = {
        "prompt": prompt,
        "response": response,
        "latency": latency,
        "status": status,
        "timestamp": int(time.time())
    }
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json"
    }
    try:
        requests.post(f"{SUPABASE_URL}/rest/v1/chat_logs", json=payload, headers=headers, timeout=2)
    except Exception as e:
        pass  # Don't fail Lambda on logging error


def lambda_handler(event, context):
    start = time.time()
    try:
        body = json.loads(event["body"]) if "body" in event else event
        prompt = body.get("prompt", "Hello!")
        result = generator(prompt, max_length=100, num_return_sequences=1)
        response = result[0]["generated_text"]
        latency = time.time() - start
        log_to_supabase(prompt, response, latency, "success")
        return {
            "statusCode": 200,
            "body": json.dumps({"response": response, "latency": latency})
        }
    except Exception as e:
        latency = time.time() - start
        log_to_supabase(body.get("prompt", ""), str(e), latency, "error")
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e), "latency": latency})
        }
