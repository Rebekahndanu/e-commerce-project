from sqlalchemy_serializer import SerializerMixin
from config import db

# Association Table for the many-to-many relationship between User and Product
user_product_table = db.Table('user_product_table', db.Model.metadata,
    db.Column('id', db.Integer, primary_key=True),                         
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('product_id', db.Integer, db.ForeignKey('products.id')),
    db.Column('quantity', db.Integer, nullable=False), 
    db.Column('price', db.Float, nullable=False),      
)

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    phone_number = db.Column(db.Integer)
    password=db.Column(db.String(80), nullable=False)
    confirm_password = db.Column(db.String(80), nullable=False)

    # Serialization rules
    serialize_rules = ('-orders.user',)

    # One-to-many relationship with Order
    orders = db.relationship("Order", back_populates="user")

    # Many-to-many relationship with Product through the association table
    products = db.relationship("Product", secondary=user_product_table, back_populates="users")


    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}')>"
    
class Product(db.Model, SerializerMixin):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)

    # Serialization rules
    serialize_rules = ('-orders.product',)

    #  one-to-many relationship with Order
    orders = db.relationship("Order", back_populates="product")

    # Many-to-many relationship with User through the association table
    users = db.relationship("User", secondary=user_product_table, back_populates="products")

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
    quantity = db.Column(db.Integer, nullable=False)

    # serialize-rules
    serialize_rules = ('-product.orders', '-user.orders')

    # Define the many-to-one relationship with User
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship("User", back_populates="orders")

    # Define the many-to-one relationship with Product
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    product = db.relationship("Product", back_populates="orders")

    # Define the price as a floating-point value
    price = db.Column(db.Float, nullable=False)

    # Define the one-to-one relationship with Cart
    # cart_id = db.Column(db.Integer, db.ForeignKey('carts.id'))
    # cart = db.relationship("Cart", back_populates="order")

    def __repr__(self):
        return f"<Order(id={self.id}, quantity={self.quantity}, price={self.price})>"
    

    
# class Cart(db.Model, SerializerMixin):
#     __tablename__ = "carts"

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String)
#     quantity = db.Column(db.Integer)
#     total_price = db.Column(db.Float)

#     # Define the one-to-one relationship with Order
#     order = db.relationship("Order", uselist=False, back_populates="cart")

#     def __repr__(self):
#         return f"<Cart(id={self.id}, name={self.name}, quantity={self.quantity}, total_price={self.total_price})"