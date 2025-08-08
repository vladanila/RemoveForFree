from flask import Flask, request, send_file
from rembg import remove
from PIL import Image
import io

app = Flask(__name__)

@app.route('/remove', methods=['POST'])
def remove_bg():
    file = request.files['image']
    input_image = Image.open(file.stream)
    output = remove(input_image)
    byte_io = io.BytesIO()
    output.save(byte_io, 'PNG')
    byte_io.seek(0)
    return send_file(byte_io, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)
