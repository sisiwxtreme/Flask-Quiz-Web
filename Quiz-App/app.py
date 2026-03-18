from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

@app.route('/result')
def result():
    score = request.args.get('score', 0)
    total = request.args.get('total', 10)
    return render_template('result.html', score=score, total=total)

if __name__ == '__main__':
    app.run(debug=True)
