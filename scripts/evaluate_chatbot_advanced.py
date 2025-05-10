import requests
import time
import os
from nltk.translate.bleu_score import sentence_bleu, SmoothingFunction

# Configuration
LAMBDA_API_URL = os.environ.get("LAMBDA_API_URL")
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

# Define test cases: (prompt, expected_response)
TEST_CASES = [
    ("Hello!", "Hi! How can I help you?"),
    ("What is 2+2?", "2+2 is 4."),
    ("Tell me a joke.", "Why did the chicken cross the road?"),
    # Add more...
]

def bleu_metric(expected, actual):
    reference = [expected.strip().split()]
    candidate = actual.strip().split()
    smoothie = SmoothingFunction().method4
    return sentence_bleu(reference, candidate, smoothing_function=smoothie)

def log_evaluation_to_supabase(prompt, response, metric, score):
    payload = {
        "prompt": prompt,
        "response": response,
        "metric": metric,
        "score": score,
        "timestamp": int(time.time())
    }
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json"
    }
    requests.post(f"{SUPABASE_URL}/rest/v1/evaluation_results", json=payload, headers=headers, timeout=2)

def main():
    for prompt, expected in TEST_CASES:
        try:
            resp = requests.post(LAMBDA_API_URL, json={"prompt": prompt}, timeout=30)
            result = resp.json()
            actual = result.get("response", "")
            bleu = bleu_metric(expected, actual)
            log_evaluation_to_supabase(prompt, actual, "BLEU", bleu)
            print(f"Prompt: {prompt} | BLEU: {bleu:.2f}")
        except Exception as e:
            print(f"Error evaluating prompt '{prompt}': {e}")

if __name__ == "__main__":
    main()
