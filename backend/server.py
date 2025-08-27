# from flask import Flask, request, jsonify, session
# from flask_sqlalchemy import SQLAlchemy
# from flask_bcrypt import Bcrypt
# from flask_cors import CORS

# app = Flask(__name__)
# app.secret_key = "P1ssword$1"

# # ✅ Use pymysql for MySQL connection
# app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:P1ssword$1@localhost/game_project"
# app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# db = SQLAlchemy(app)
# bcrypt = Bcrypt(app)
# CORS(app, supports_credentials=True, origins=["http://127.0.0.1:5500"])

# # ✅ User Model (Stores Signup Data)
# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     email = db.Column(db.String(100), unique=True, nullable=False)
#     password = db.Column(db.String(100), nullable=False)

# # ✅ Initialize Database
# with app.app_context():
#     db.create_all()

# # ✅ Signup API
# @app.route("/register", methods=["POST"])
# def register():
#     data = request.json
#     hashed_password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
#     new_user = User(email=data["email"], password=hashed_password)

#     try:
#         db.session.add(new_user)
#         db.session.commit()
#         return jsonify({"message": "Signup successful!", "redirect": "/loginPage.html"}), 201
#     except:
#         return jsonify({"message": "User already exists!"}), 400

# # ✅ Login API
# @app.route("/login", methods=["POST"])
# def login():
#     data = request.json
#     user = User.query.filter_by(email=data["email"]).first()

#     if user and bcrypt.check_password_hash(user.password, data["password"]):
#         session["user_id"] = user.id  # Store session in Flask
#         return jsonify({
#             "message": "Login successful!", 
#             "redirect": "/projectAlpha_home.html"
#         }), 200

#     return jsonify({"message": "Invalid credentials!"}), 401


# @app.route("/check_login", methods=["GET"])
# def check_login():
#     if "user_id" in session:
#         return jsonify({"logged_in": True})
#     else:
#         return jsonify({"logged_in": False})