from sqlalchemy_serializer import SerializerMixin
from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    phone_number = db.Column(db.Integer)
    password = db.Column(db.String(80), nullable=False)
    confirm_password = db.Column(db.String(80), nullable=False)

    # One-to-many relationship with Order
    orders = db.relationship("Order", back_populates="user")
    # One-to-one relationship with Cart
    cart = db.relationship("Cart", uselist=False, back_populates="user")

    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}')>"

class Product(db.Model, SerializerMixin):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)

    # One-to-many relationship with CartItem
    cart_items = db.relationship("CartItem", back_populates="product")
    # One-to-many relationship with Order
    orders = db.relationship("Order", back_populates="product")

    def serialize(self):
        return {
            'id': self.id,
            'image_url': self.image_url,
            'name': self.name,
            'price': self.price
        }

    def __repr__(self):
        return f"<Product(id={self.id}, name='{self.name}', price={self.price})>"

class Order(db.Model, SerializerMixin):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    order_date = db.Column(db.DateTime)
    quantity = db.Column(db.Integer)
    name = db.Column(db.String)
    price = db.Column(db.Integer)

    # Define the many-to-one relationship with User
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship("User", back_populates="orders")

    # Define the many-to-one relationship with Product
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    product = db.relationship("Product", back_populates="orders")

    def __repr__(self):
        return f"<Order(id={self.id}, order_number={self.order_number}, total_price={self.total_price}, status='{self.status}')>"

class Cart(db.Model, SerializerMixin):
    __tablename__ = "carts"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    quantity = db.Column(db.Integer)
    total_price = db.Column(db.Float)

    # One-to-one relationship with User
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True)
    user = db.relationship("User", back_populates="cart")

    # One-to-many relationship with CartItem
    cart_items = db.relationship("CartItem", back_populates="cart")

    def __repr__(self):
        return f"<Cart(id={self.id}, name={self.name}, quantity={self.quantity}, total_price={self.total_price})>"

class CartItem(db.Model, SerializerMixin):
    __tablename__ = "cart_items"

    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey('carts.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    price = db.Column(db.Float)

    # Define the many-to-one relationship with Cart
    cart = db.relationship("Cart", back_populates="cart_items")

    # Define the many-to-one relationship with Product
    product = db.relationship("Product", back_populates="cart_items")

    def __repr__(self):
        return f"<CartItem(id={self.id}, cart_id={self.cart_id}, product_id={self.product_id}, quantity={self.quantity})>"