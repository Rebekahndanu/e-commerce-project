from app import app
from models import db, User, Order, Product, Cart
from faker import Faker


with app.app_context():
    fake = Faker()

    # Delete any existing rows
    print("Deleting data...")
    User.query.delete()
    Order.query.delete()
    Cart.query.delete()
    Product.query.delete()
    db.session.commit()


    products_data = [
        {"name": "Cleanser", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM2YZLfUVwcWLmdReHb4spC_QmXhbKoSYQJJFYUIiRcw&s", "price": 10},
        {"name": "Moisturizer", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfRSQhsg7V77MfiQ7rsGnpVnKKE8SXZ6Bv5flugkBoyA&s","price": 20},
        {"name": "Toner", "image": "","price": 30},
        {"name": "Body Lotion", "image": "", "price": 10},
        {"name": "Primer", "image": "","price": 20},
        {"name": "Make-up Remover", "image": "","price": 30},
        {"name": "Wipes", "image": "", "price": 10},
        {"name": "Blush", "image": "","price": 20},
        {"name": "Contour", "image": "","price": 30},
        {"name": "Setting spray", "image": "", "price": 10},
        {"name": "Concealer", "image": "","price": 20},
        {"name": "Salicilic acid", "image": "","price": 30},
        # Add more products as needed
    ]
    
    print("Creating products...")
    products = []
    for product_data in products_data:
        product = Product(name=product_data["name"], image_url=product_data["image"], price=product_data["price"])
        products.append(product)
    db.session.add_all(products)
    db.session.commit()