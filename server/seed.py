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
        {"name": "CeraVe Cleanser", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM2YZLfUVwcWLmdReHb4spC_QmXhbKoSYQJJFYUIiRcw&s", "price": 10},
        {"name": "CeraVe Moisturizer", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfRSQhsg7V77MfiQ7rsGnpVnKKE8SXZ6Bv5flugkBoyA&s","price": 20},
        {"name": "Toner", "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.beautyclick.co.ke%2Fproducts%2Fsimple-kind-to-skin-soothing-facial-toner-200ml%2F&psig=AOvVaw0SttcWhTiTatwZQwhQyJgy&ust=1713345366379000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCODg8omzxoUDFQAAAAAdAAAAABAE","price": 30},
        {"name": "Vaseline Body Lotion", "image": "https://m.media-amazon.com/images/I/51GIMFvynDL.jpg", "price": 10},
        {"name": "Maybelline Primer", "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.sephora.com%2Fproduct%2Fhydro-grip-primer-mini-P441814&psig=AOvVaw3md-ckN2sMFs1AFA_HkA6n&ust=1713345521117000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLioudKzxoUDFQAAAAAdAAAAABAJ","price": 20},
        {"name": "Garnier Make-up Remover", "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.target.com%2Fp%2Fgarnier-skinactive-micellar-cleansing-water-all-in-1-makeup-remover-38-cleanser-unscented-13-5-fl-oz%2F-%2FA-39599037&psig=AOvVaw1_dA1QzME4cA0XcWQgOg6W&ust=1713345791554000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCMivsMy0xoUDFQAAAAAdAAAAABAQ","price": 30},
        {"name": "Neutrogena Wipes", "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.walmart.com%2Fip%2FNeutrogena-Makeup-Remover-Night-Calming-Wipes-and-Face-Cleansing-Towelettes-25-Ct%2F12166846&psig=AOvVaw2RmH7J9j7ffHgILrIunmRl&ust=1713345624589000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCKjCuf6zxoUDFQAAAAAdAAAAABAE", "price": 10},
        {"name": "Fashion Colour Blush", "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.fashioncolour.in%2Fproducts%2Fblush-kit&psig=AOvVaw2PeLKPQwICykK8uZvh8oYK&ust=1713346111249000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCNDz8-e1xoUDFQAAAAAdAAAAABAE","price": 20},
        {"name": "Mac Cosmetics Contour", "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.maccosmetics.com%2Fproduct%2F13845%2F57814%2Fproducts%2Fmakeup%2Fface%2Fface-kits%2Fpro-face-palette-contour&psig=AOvVaw1b-VRnPtnJdmsNyESoIWa8&ust=1713346177458000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCOi9zIe2xoUDFQAAAAAdAAAAABAE","price": 30},
        {"name": "Make It Last Setting spray", "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.desertcart.co.ke%2Fproducts%2F267050101-milani-make-it-last-setting-spray-03-natural&psig=AOvVaw3FwZ_e-EgZbNdHic8-N_Ce&ust=1713346230620000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCMC-mZ62xoUDFQAAAAAdAAAAABAR", "price": 10},
        {"name": "Milani Concealer", "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.milanicosmetics.com%2Fblogs%2Fblog%2Fwhen-to-apply-foundation-v-concealer&psig=AOvVaw1rTng7E-IR8rvQzkJObKhW&ust=1713346292465000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCPDf8MG2xoUDFQAAAAAdAAAAABAE","price": 20},
        {"name": "Haus Labs Eyeliner", "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.thecut.com%2Farticle%2Fbest-eyeliner.html&psig=AOvVaw1XSVgC2OgvVb526hvlmmqt&ust=1713346497580000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCODq3563xoUDFQAAAAAdAAAAABAJ","price": 30},
        # Add more products as needed
    ]
    
    print("Creating products...")
    products = []
    for product_data in products_data:
        product = Product(name=product_data["name"], image_url=product_data["image"], price=product_data["price"])
        products.append(product)
    db.session.add_all(products)
    db.session.commit()

