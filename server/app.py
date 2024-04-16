from config import app, db, api
from models import User, Product, Order
from flask import Flask, jsonify, request
from flask_restful import Api, Resource
from flask_cors import CORS
from flask_migrate import Migrate
from datetime import datetime


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


CORS(app)

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

@app.route('/')
def index():
    return {"message": "success"}
# GET FOR ALL MODELS
@app.route('/products', methods=[ 'GET'])
def get_all_products():
    products = Product.query.all()
    product_list = [product.to_dict() for product in products]
    return jsonify(product_list)
from flask import jsonify



@app.route('/products/<int:id>', methods=['GET'])
def get_product_by_id(id):
    product = Product.query.get(id)
    if product is None:
        return jsonify({"error": "Product not found"}), 404
    return jsonify({
        "id": product.id,
        "name": product.name,
        "price": product.price,
        "image_url": product.image_url
    }), 200

# DELETE a product
@app.route('/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    with app.app_context():
        product = Product.query.get(id)
        if not product:
            return jsonify({"message": "Product not found"}), 404
        db.session.delete(product)
        db.session.commit()
        return jsonify({"message": "Product deleted successfully"}), 200
    
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