# Python Syntax Quiz Web Application

A full-stack quiz web application built using HTML, CSS, JavaScript, and Flask. This project allows users to take a 10-question multiple-choice quiz on Python syntax, drawn randomly from a pool of 30 questions.

---

## 🛠️ How It Works

The application follows a client-server architecture. Below is a breakdown of how each technology contributes to the project:

### 1. Flask (Python Backend)
Flask is the web framework that handles routing and serves the application files to the browser.
- **Routing**: `app.py` defines three main routes using decorators:
  - `@app.route('/')`: Serves the `index.html` (Home Page).
  - `@app.route('/quiz')`: Serves the `quiz.html` (Quiz Page).
  - `@app.route('/result')`: Serves `result.html` and captures the user's score and total questions from the URL parameters (e.g., `/result?score=8&total=10`) dynamically passing them to the result page template.
- **Templating**: Flask uses `render_template` to render the HTML files, allowing them to dynamically resolve paths using `{{ url_for() }}` to link static assets like CSS and JS files securely.

### 2. HTML (Structure)
HTML is responsible for the structure and layout of the app's three pages located in the `templates/` folder:
- **`index.html`**: First page the user sees. It greets the user and has a "Start Quiz" button that transitions the app to the `/quiz` route.
- **`quiz.html`**: The main interface where gameplay happens. It holds empty container blocks (like `<div id="choices-container"></div>`), timers, and progress trackers that Javascript will inject content into.
- **`result.html`**: The final page of the app. Utilizing Flask's Jinja templating, it takes the `{{ score }}` variable passed from the backend and displays the completion screen along with a "Play Again" button.

### 3. CSS (Styling)
CSS defines the visual aesthetics, ensuring an engaging User Interface (UI).
- **Modern Glassmorphism**: Uses `backdrop-filter: blur()`, gradients, and slight transparency to give the application a premium, modern feel.
- **Interactivity**: Adds hover effects, animations, and transitions to buttons to make the app feel alive and responsive.
- **Visual Feedback**: Contains specific classes to visually alert the user. For instance, `.correct` gives a green hue to right answers, while `.wrong` turns incorrect choices red. 

### 4. JavaScript (Client-side Logic)
JavaScript is the brains behind the actual interactivity of the quiz inside `quiz.html`.
- **Question Logic**: It begins by randomly selecting 10 unique questions out of a provided array of 30.
- **Shuffling**: It uses an algorithm to shuffle both the order of questions displayed and the 4 multiple-choice answers for each question, guaranteeing a distinct experience every time.
- **State Management**: It manages global states like `currentQuestionIndex`, `score`, and `timeLeft`.
- **Timer Handling**: Executes a 15-second countdown timer for each question using `setInterval()`. If the timer reaches 0 before the player clicks an answer, the logic automatically determines the round as a loss, reveals the right answer, and prompts the "Next Question" button.
- **Redirection**: Upon answering the final question, it computes the final score and securely redirects the browser dynamically to the `/result?score=X&total=Y` endpoint using `window.location.href`.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Python installed. You also need to install Flask.

```bash
pip install Flask
```

### Running the App
1. Open up your terminal or command prompt.
2. Navigate into the application folder.
3. Run the following command:
```bash
python app.py
```
4. Open your web browser and visit `http://127.0.0.1:5000/`.
