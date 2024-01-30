from flask import Flask, request, jsonify

app = Flask(__name__)

cars = []

@app.route('/api/cars', methods=["POST"])
def add_car():
    data = request.json

    if 'brand' not in data or 'model' not in data:
        return jsonify({'error': 'Missing brand/model'}), 400

    car = {
        'brand': data['brand'],
        'model': data['model'],
        'year': data['year'],
        'price': data['price'],
        'color': data['color'],
        'weight': data['weight'],
        'mileage': data['mileage'],
        'specs': data['specs'],
        'photo': data.get('photo', ''),
    }

    cars.append(car)

    return jsonify({'message': 'Added car'}), 201

@app.route('/api/cars', methods = ["GET"])
def get_cars():
    return jsonify({'cars': cars})

if __name__ == '__main__':
    app.run(debug=True)