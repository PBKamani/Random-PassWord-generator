from flask import Flask, render_template, request, jsonify
import random
import string

app = Flask(__name__)

def generate_password(length=12, use_digits=True, use_special_chars=True, min_digits=False, min_special=False):
    lower = string.ascii_lowercase
    upper = string.ascii_uppercase
    digits = string.digits if use_digits else ""
    special = string.punctuation if use_special_chars else ""

    all_chars = lower + upper + digits + special
    if not all_chars:
        return "Error: No character sets selected!"

    password_chars = []

    if min_digits and use_digits:
        password_chars += random.choices(string.digits, k=2)

    if min_special and use_special_chars:
        password_chars += random.choices(string.punctuation, k=2)

    remaining_length = length - len(password_chars)
    password_chars += random.choices(all_chars, k=remaining_length)
    random.shuffle(password_chars)

    return "".join(password_chars)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    length = int(data.get('length', 12))
    use_digits = data.get('use_digits', True)
    use_special_chars = data.get('use_special_chars', True)
    min_digits = data.get('min_digits', False)
    min_special = data.get('min_special', False)

    password = generate_password(length, use_digits, use_special_chars, min_digits, min_special)
    return jsonify({"password": password})

if __name__ == '__main__':
    app.run(debug=True)