from config import app, db, api
from models import User, Product

if __name__ == '__main__':
    app.run(port=5505, debug=True)