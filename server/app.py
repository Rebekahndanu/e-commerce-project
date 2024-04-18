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
        phone = request.json['phone']
        password = str(request.json['password'])
        confirm_password = str(request.json['confirmPassword'])

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
            phone_number=phone, 
            password=hashed_pw,
            confirm_password=hashed_cpw,
        )

        try:
            db.session.add(new_user)
            db.session.commit()
            return jsonify(new_user.to_dict()), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': f'Failed to create item: {str(e)}'}), 500
        

@app.route('/products', methods=['GET', 'POST'])
def get_and_post_products():
    if request.method == 'GET':
        name = request.args.get('name')

        if name:
            products = Product.query.filter(Product.name.ilike(f'%{name}%')).all()

        else:
            products = Product.query.all()

        return jsonify([product.to_dict() for product in products]), 200
    
    if request.method == "POST":
        data = request.json

        name = data.get('name')
        image_url = data.get('image_url')
        price = data.get('price')

        new_product = Product(
            image_url = image_url,
            name = name,
            price = price,
        )

        try:
            db.session.add(new_product)
            db.session.commit()
            return jsonify(new_product.to_dict()), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': f'Failed to create item: {str(e)}'}), 500


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
    
    elif request.method == 'PATCH':
        data = request.json

        if not data:
            return jsonify({'error': 'No data provided for update'}), 400
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        allowed_attributes = ['email', 'phone_number']
        for attr, value in data.items():
            if attr in allowed_attributes:
                setattr(user, attr, value)
            else:
                return jsonify({'error': 'Invalid attribute'}), 400
        
        try:
            db.session.commit()
            return jsonify(user.to_dict()), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': f'Failed to update item: {str(e)}'}), 500
        
    elif request.method == 'DELETE':
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        try:
            db.session.delete(user)
            db.session.commit()
            return {}, 204
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': f'Failed to delete item: {str(e)}'}), 500



@app.route('/orders', methods=['GET', 'POST'])
def get_and_post_orders():
    orders = Order.qery.all()
    if request.method == 'GET':
        return jsonify([order.to_dict() for order in orders])
    
    elif request.method == 'POST':
        data = request.json

        if not data:
            return jsonify({'error': 'No data provided for create'}), 400
        
        required_fields = ['address', 'name', 'quantity', 'price']
        for field in required_fields:
            if field not in data:
                return ({'error': f'Missing required field: {field}'}), 400
        
        address = data.get('address')
        name = data.get('name')
        quantity = data.get('quantity')
        price = data.get('price')

        new_order = Order(
            address = address,
            name = name,
            quantity = quantity,
            price = price
        )

        try:
            db.session.add(new_order)
            db.session.commit()
            return jsonify(new_order.to_dict())
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': f'Failed to create item: {str(e)}'}), 500
        
# add to cart functionality
@app.route('/cart/add', methods=['POST'])
def add_to_cart():
    data = request.json
    product_id = data.get('product_id')
    product = Product.query.get(product_id)

    if not product:
        return jsonify({'error': 'Product not found'}), 404
    cart_item = Cart(product_id=product_id)
    db.session.add(cart_item)
    db.session.commit()
    return jsonify({'message': 'Product added to cart successfully'}), 201

        
        
if __name__ == '__main__':
    app.run(port=5505, debug=True)