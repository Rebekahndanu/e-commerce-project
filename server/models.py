from sqlalchemy_serializer import SerializerMixin

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String)
    phone_number = db.Column(db.String)
    password=db.Column(db.String)

    # One-to-many relationship with Order
    orders = db.relationship("Order", back_populates="user")


    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}')>"
    
class Product(db.Model, SerializerMixin):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)

    #  one-to-many relationship with Order
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
    Address = db.Column(db.Integer)
    order_date = db.Column(db.DateTime)
    quantity = db.Column(db.Integer)
    name= db.Column(db.String)
    price = db.Column(db.Integer)
    

    # Define the many-to-one relationship with User
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship("User", back_populates="orders")

    # Define the many-to-one relationship with Product
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    product = db.relationship("Product", back_populates="orders")

    # Define the one-to-one relationship with Cart
    cart_id = db.Column(db.Integer, db.ForeignKey('carts.id'))
    cart = db.relationship("Cart", back_populates="order")

    def __repr__(self):
        return f"<Order(id={self.id}, order_number={self.order_number}, total_price={self.total_price}, status='{self.status}')>"
    
class Cart(db.Model, SerializerMixin):
    __tablename__ = "carts"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    quantity = db.Column(db.Integer)
    total_price = db.Column(db.Float)

    # Define the one-to-one relationship with Order
    order = db.relationship("Order", uselist=False, back_populates="cart")

    def __repr__(self):
        return f"<Cart(id={self.id}, name={self.name}, quantity={self.quantity}, total_price={self.total_price})"



