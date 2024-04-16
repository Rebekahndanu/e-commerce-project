from sqlalchemy_serializer import SerializerMixin

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash=db.Column(db.String)

    # One-to-many relationship with Order
    orders = db.relationship("Order", back_populates="user")

    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}')>"

class Product(db.Model, SerializerMixin):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    image_url=db.Column(db.String)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)

    # One-to-many relationship with OrderItem
    order_items = db.relationship("OrderItem", back_populates="product", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Product(id={self.id}, name='{self.name}', price={self.price})>"

class Order(db.Model, SerializerMixin):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    order_number = db.Column(db.Integer)
    order_date = db.Column(db.DateTime)
    total_price = db.Column(db.Integer)
    status = db.Column(db.String)

    # One-to-many relationship with User
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship("User", back_populates="orders")

    # One-to-many relationship with OrderItem
    order_items = db.relationship("OrderItem", back_populates="order")

    def __repr__(self):
        return f"<Order(id={self.id}, order_number={self.order_number}, total_price={self.total_price}, status='{self.status}')>"

class OrderItem(db.Model, SerializerMixin):
    __tablename__ = "order_items"

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer)

    # Many-to-one relationship with Order
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'))
    order = db.relationship("Order", back_populates="order_items")

    # Many-to-one relationship with Product
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    product = db.relationship("Product", back_populates="order_items")

    def __repr__(self):
        return f"<OrderItem(id={self.id}, quantity={self.quantity})>"
    

