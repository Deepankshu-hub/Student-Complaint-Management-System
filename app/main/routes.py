import os
from flask import Blueprint, request, jsonify, current_app
from .. import db
from ..models import SentimentHistory
from flask_login import login_required, current_user
from werkzeug.utils import secure_filename
from textblob import TextBlob
from . import main

@main.route('/')
def index():
    return jsonify({"message": "Welcome to Sentiment Analysis API"})

@main.route('/profile')
@login_required
def profile():
    return jsonify({"name": current_user.name, "email": current_user.email})

@main.route('/upload', methods=['POST'])
@login_required
def upload_post():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        filename = secure_filename(file.filename)
        # Ensure upload folder exists
        os.makedirs(current_app.config['UPLOAD_FOLDER'], exist_ok=True)
        filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        if filename.endswith('.txt') or filename.endswith('.csv'):
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    text = f.read()
                
                if text.strip():
                    blob = TextBlob(text)
                    polarity = blob.sentiment.polarity
                    label = "Positive" if polarity > 0.1 else "Negative" if polarity < -0.1 else "Neutral"
                    
                    history_entry = SentimentHistory(user_id=current_user.id, text=text, polarity=polarity, label=label)
                    db.session.add(history_entry)
                    db.session.commit()
                    
                    return jsonify({
                        "success": True, 
                        "message": "File uploaded and analyzed",
                        "result": {
                            "text": text[:200] + ("..." if len(text) > 200 else ""),
                            "polarity": round(polarity, 2),
                            "label": label
                        }
                    }), 200
            except Exception as e:
                return jsonify({"error": f"Failed to analyze file: {str(e)}"}), 500

        return jsonify({"success": True, "message": "File successfully uploaded"}), 200

@main.route('/history', methods=['GET'])
@login_required
def history():
    records = SentimentHistory.query.filter_by(user_id=current_user.id).order_by(SentimentHistory.timestamp.desc()).all()
    history_data = [{
        "id": r.id,
        "text": r.text[:100] + ("..." if len(r.text) > 100 else ""),
        "full_text": r.text,
        "polarity": r.polarity,
        "label": r.label,
        "timestamp": r.timestamp.isoformat()
    } for r in records]
    return jsonify({"success": True, "history": history_data}), 200

@main.route('/sentiment', methods=['POST'])
@login_required
def sentiment():
    data = request.get_json()
    text = data.get('text') if data else None
    
    if not text:
        return jsonify({"error": "No text provided"}), 400
    
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity

    if polarity > 0.1:
        label = "Positive"
    elif polarity < -0.1:
        label = "Negative"
    else:
        label = "Neutral"

    history_entry = SentimentHistory(user_id=current_user.id, text=text, polarity=polarity, label=label)
    db.session.add(history_entry)
    db.session.commit()
    
    return jsonify({
        "success": True, 
        "text": text, 
        "polarity": round(polarity, 2), 
        "label": label
    }), 200
