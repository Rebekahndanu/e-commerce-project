from config import app, db, api
from models import User, Product, Order, Cart
from flask import Flask, jsonify, request
from flask_restful import Api, Resource
from flask_cors import CORS, cross_origin
from flask_migrate import Migrate
from datetime import datetime
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token
from flask_bcrypt import Bcrypt


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


CORS(app)

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

bcrypt = Bcrypt(app)

app.secret_key = 'secret key'
app.config['JWT_SECRET_KEY'] = 'this-is-secret-key'

jwt = JWTManager(app)

@app.route('/')
def index():
    return {"message": "success"}

class UserRegister(Resource):
    @cross_origin()
    def post(self):
        username = request.json['username']
        email = request.json['email']
        phone_number = request.json['phone_number']
        password = str(request.json['password'])
        confirm_password = str(request.json['confirm_password'])

        user_exists = User.query.filter_by(username=username).first()

        if user_exists:
            return jsonify({'error': 'User already exists'}), 409
        
        if password != confirm_password:
            return jsonify({'Error': 'Passwords not matching'})

        hashed_pw = bcrypt.generate_password_hash(password)
        hashed_cpw = bcrypt.generate_password_hash(confirm_password)

        access_token = create_access_token(identity=email)

        new_user = User(
            username=username,
            email=email, 
            phone_number=phone_number, 
            password=hashed_pw,
            confirm_password=hashed_cpw,
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            "id": new_user.id,
            "username": new_user.username,
            "email": new_user.email,
            'phone_number': new_user.phone_number,
            "access_token": access_token,
        }),201

api.add_resource(UserRegister, '/userRegister')

class UserLogin(Resource):
    @cross_origin()
    def post(self):
        username = request.json['username']
        password = str(request.json['password'])

        user = User.query.filter_by(username=username).first()

        if user is None:
            return jsonify({'error': 'Unauthorized'}), 401

        if not bcrypt.check_password_hash(user.password, password):
            return jsonify({'error': 'Unauthorized, incorrect password'}), 401
        
        access_token = create_access_token(identity=username)
        user.access_token = access_token


        return jsonify({
            "id": user.id,
            "username": user.username,
            "access_token": access_token
            
        }), 201
    
api.add_resource(UserLogin, '/userLogin')

class UserLogout(Resource):
    def post(self):
        pass

api.add_resource(UserLogout, '/userLogout')


# GET FOR ALL MODELS
@app.route('/products', methods=[ 'GET'])
def get_all_products():
    products = Product.query.all()
    product_list = [product.to_dict() for product in products]
    return jsonify(product_list)

@app.route('/products/<int:id>', methods=['GET'])
def get_products_using_id(id):
    session = db.session
    product = session(Product, id)

    if request.method == 'GET':
        return jsonify(product.to_dict()), 200
    

@app.route('/users/<int:id>', methods=['GET','PATCH', 'DELETE'])
def get_and_patch_using_id(id):
    user = User.query.get(id)

    if request.method == 'GET':
        return jsonify(user.to_dict()), 200
    
@app.route('/products/<int:id>', methods=['PATCH'])
def update_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    
    data = request.json
    if 'name' in data:
        product.name = data['name']
    if 'price' in data:
        product.price = data['price']
    if 'image_url' in data:
        product.image_url = data['image_url']
    
    db.session.commit()
    
    return jsonify(product.serialize()), 200

@app.route('/products', methods=['POST'])
def create_product():
    data = request.json
    image_url = data.get('image_url')
    name = data.get('name')
    price = data.get('price')
    new_product = Product(image_url=image_url, name=name, price=price)
    db.session.add(new_product)
    db.session.commit()
    return jsonify({'message': 'Product created successfully'}), 201

           
if __name__ == '__main__':
    app.run(port=5505, debug=True)