from app import app
from models import db, User, Order, Product
from faker import Faker


with app.app_context():
    fake = Faker()

    # Delete any existing rows
    print("Deleting data...")
    User.query.delete()
    Order.query.delete()
    Product.query.delete()
    db.session.commit()


    products_data = [
        {"name": "CeraVe Cleanser", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM2YZLfUVwcWLmdReHb4spC_QmXhbKoSYQJJFYUIiRcw&s", "price": 10},
        {"name": "CeraVe Moisturizer", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfRSQhsg7V77MfiQ7rsGnpVnKKE8SXZ6Bv5flugkBoyA&s","price": 20},
        {"name": "Toner", "image": "https://m.media-amazon.com/images/I/71ScUb0VhOL.jpg","price": 30},
        {"name": "Vaseline Body Lotion", "image": "https://m.media-amazon.com/images/I/51GIMFvynDL.jpg", "price": 10},
        {"name": "Maybelline Primer", "image": "https://www.beautyclick.co.ke/wp-content/smush-webp/2024/01/Untitleddesign_3_6fb6b7d6-ac44-4840-aace-fac17c563ab3.jpg.webp","price": 20},
        {"name": "Garnier Make-up Remover", "image": "https://cdn.salla.sa/jrGRQ/tb8377adoI6fg9L1dJ2OPSRH3IJCig8IM4oELjI6.jpg","price": 30},
        {"name": "Neutrogena Wipes", "image": "https://www.neutrogena.com.au/sites/neutrogena_au/files/product-images/79601578-1-.jpg", "price": 10},
        {"name": "Rare beauty Blush", "image": "https://m.media-amazon.com/images/I/41AJrIvrCWL.jpg","price": 20},
        {"name": "Mac Cosmetics Contour", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRByUo6OYLnlT6dldAJBUtGw7Fj9HeS_YCw_oR4waIPGw&s","price": 30},
        {"name": "Make It Last Setting spray", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8LIu3_YWZitpssO-lJnPpAzIf1K6A39q4P9Fg-ese_w&s", "price": 10},
        {"name": "Milani Concealer", "image": "https://pictures-kenya.jijistatic.com/22677398_NjIwLTYyMC1mMzg5ZWMzNzBlLTE.webp","price": 20},
        {"name": "Haus Labs Eyeliner", "image": "https://m.media-amazon.com/images/S/aplus-media/vc/bf41f1d3-f7c7-492a-8ae5-b1552d2ab9e6.__CR0,0,1200,900_PT0_SX600_V1___.jpg","price": 30},
        # Add more products as needed
    ]
    
    print("Creating products...")
    products = []
    for product_data in products_data:
        product = Product(name=product_data["name"], image_url=product_data["image"], price=product_data["price"])
        products.append(product)
    db.session.add_all(products)
    db.session.commit()

