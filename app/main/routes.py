import os
from flask import Blueprint, render_template, request, flash, redirect, url_for, current_app
from .. import db
from flask_login import login_required, current_user
from werkzeug.utils import secure_filename
from textblob import TextBlob
from . import main

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/profile')
@login_required
def profile():
    return render_template('profile.html', name=current_user.name)

@main.route('/upload')
@login_required
def upload():
    return render_template('upload.html')

@main.route('/upload', methods=['POST'])
@login_required
def upload_post():
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)
    file = request.files['file']
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)
    if file:
        filename = secure_filename(file.filename)
        file.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
        flash('File successfully uploaded')
        return redirect(url_for('main.profile'))

@main.route('/sentiment', methods=['GET', 'POST'])
@login_required
def sentiment():
    if request.method == 'POST':
        text = request.form.get('text')
        if not text:
            flash('No text provided')
            return redirect(url_for('main.sentiment'))
        
        blob = TextBlob(text)
        polarity = blob.sentiment.polarity

        if polarity > 0.1:
            label = "Positive"
        elif polarity < -0.1:
            label = "Negative"
        else:
            label = "Neutral"
        
        return render_template('sentiment.html', result=True, text=text, polarity=round(polarity, 2), label=label)
    
    return render_template('sentiment.html', result=False)
