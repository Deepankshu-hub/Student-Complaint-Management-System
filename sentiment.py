# Student Complaint Sentiment Analysis
# Authors: Deepankshu Singh, Sakshi Jha
# Guide: Mr. Mandeep

from textblob import TextBlob
import csv

print("\n=== STUDENT COMPLAINT SENTIMENT ANALYSIS (File-Based) ===\n")

# Read complaints from a text file
try:
    with open("complaints.txt", "r", encoding="utf-8") as file:
        complaints = [line.strip() for line in file.readlines() if line.strip()]
except FileNotFoundError:
    print("Error: complaints.txt not found. Please place it in the same folder.")
    exit()

# Analyze each complaint
results = []
for i, text in enumerate(complaints, 1):
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity

    if polarity > 0.1:
        label = "Positive"
    elif polarity < -0.1:
        label = "Negative"
    else:
        label = "Neutral"

    results.append([i, text, round(polarity, 2), label])
    print(f"{i}. {text}")
    print(f"   → Sentiment Score: {polarity:.2f}, Label: {label}\n")

# Saving results to CSV
with open("complaint_sentiments.csv", "w", newline='', encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["ID", "Complaint", "Polarity", "Sentiment"])
    writer.writerows(results)

print("Results saved in csv file")



# .\venv\Scripts\Activate.ps1