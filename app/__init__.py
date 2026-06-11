from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_babel import Babel
from flask_cors import CORS

db = SQLAlchemy()
login_manager = LoginManager()
babel = Babel()

def get_locale():
    return request.accept_languages.best_match(['en', 'es'])

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'your_secret_key'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
    app.config['LANGUAGES'] = ['en', 'es']
    app.config['UPLOAD_FOLDER'] = 'app/uploads'

    CORS(app, supports_credentials=True, origins=["http://localhost:5173", "http://127.0.0.1:5173"])

    db.init_app(app)
    login_manager.init_app(app)
    babel.init_app(app, locale_selector=get_locale)

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint, url_prefix='/api')

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint, url_prefix='/api')

    return app
