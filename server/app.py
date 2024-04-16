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

@app.route('/users', methods=['GET','POST', 'PATCH'])
def get_and_post_users():
    users = User.query.all()

    if request.method == 'GET':
        return jsonify([user.to_dict() for user in users]), 200
    
    elif request.method == "POST":
        data = request.json

        if not data:
            return jsonify({'error': 'No data provided for create'}), 400
        
        # input validations
        required_fields = ['username', 'email', 'phone_number', 'password']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        username = data.get('username')
        email = data.get('email')
        phone_number = data.get('phone_number')
        password = data.get('password')

        new_user = User(
            username = username,
            email = email,
            phone_number = phone_number,
            password = password,
        )

        try:
            db.session.add(new_user)
            db.session.commit()
            return jsonify(new_user.to_dict()), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': f'Failed to create item: {str(e)}'}), 500
        

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
            return jsonify(item.to_dict()), 200
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
        
        
if __name__ == '__main__':
    app.run(port=5505, debug=True)