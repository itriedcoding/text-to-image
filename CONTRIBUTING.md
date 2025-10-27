# Contributing to Gemini AI ImageCrafter

We're thrilled you're interested in contributing to Gemini AI ImageCrafter! Your contributions help us make this project even better. This document outlines how you can get involved.

---

## 👨‍💻 How to Contribute

Thereutable ways to contribute to this project:

1.  **Report Bugs:** If you find a bug, please open an issue on GitHub.
2.  **Suggest Features:** Have an idea for a new feature or improvement? Open an issue to discuss it.
3.  **Submit Code:** Want to contribute code directly? Follow the guidelines below for submitting pull requests.

---

## 🐛 Bug Reports

If you discover a bug, please help us by reporting it. Before opening a new issue, please check if a similar issue already exists.

When reporting a bug, please include:

*   **A clear and concise description** of the bug.
*   **Steps to reproduce** the behavior.
*   **Expected behavior.**
*   **Actual behavior.**
*   **Screenshots or recordings** (if applicable).
*   **Your environment details:**
    *   Operating System
    *   Browser and version
    *   Node.js version (`node -v`)
    *   npm/yarn version (`npm -v` or `yarn -v`)

---

## ✨ Feature Suggestions

We love new ideas! If you have a feature request or an idea for an improvement, please open an issue to propose it.

When suggesting a feature, please include:

*   **A clear and concise description** of the proposed feature.
*   **Why you think this feature is important** or how it would improve the application.
*   **Any mockups or examples** (if applicable).

---

## 💻 Code Contributions

Ready to dive into the code? Here's how to get started:

### Setup Your Development Environment

1.  **Fork the Repository:** Click the "Fork" button on the top right of the [GitHub repository page](https://github.com/your-username/gemini-ai-imagecrafter.git).
2.  **Clone Your Fork:**
    ```bash
    git clone https://github.com/your-username/gemini-ai-imagecrafter.git
    cd gemini-ai-imagecrafter
    ```
    (Replace `your-username` with your GitHub username.)
3.  **Install Dependencies:**
    ```bash
    npm install
    # or yarn install
    ```
4.  **Configure Google Gemini API Key:**
    The application expects your Google Gemini API Key to be available as an environment variable named `API_KEY`. You will need to set this environment variable before running the development server.
    
    **Example (Linux/macOS):**
    ```bash
    export API_KEY="YOUR_GEMINI_API_KEY"
    npx serve .
    ```
    (Replace `"YOUR_GEMINI_API_KEY"` with your actual key.)

5.  **Run the Application:** As this is a client-side ES module application, you can serve it with a static server:
    ```bash
    npx serve .
    # or http-server . if you have it installed globally
    ```
    Then, open your browser to `http://localhost:5000` (or the port reported by the server).
6.  **Create a New Branch:**
    ```bash
    git checkout -b feature/your-feature-name
    # or bugfix/your-bugfix-name
    ```

### Code Style

*   **ESLint and Prettier:** We use ESLint for linting and Prettier for code formatting. Ensure your code adheres to these standards. Configuration files (`.eslintrc`, `.prettierrc`) are included in the repository.
*   **TypeScript:** All new code should be written in TypeScript, following existing patterns and type definitions.
*   **Accessibility:** Prioritize accessibility (ARIA attributes, semantic HTML) in all UI changes.
*   **Responsiveness:** Ensure UI changes are responsive and work well across different screen sizes.

### Pull Request Process

1.  **Make Your Changes:** Implement your feature or bug fix.
2.  **Test Your Changes:** Thoroughly test your code to ensure it works as expected and doesn't introduce new bugs.
3.  **Commit Your Changes:** Write clear and concise commit messages. (See "Commit Message Guidelines" below).
    ```bash
    git add .
    git commit -m "feat: Add new feature for X"
    ```
4.  **Push to Your Fork:**
    ```bash
    git push origin feature/your-feature-name
    ```
5.  **Open a Pull Request (PR):**
    *   Go to the original GitHub repository.
    *   You should see a prompt to open a PR from your recently pushed branch.
    *   Provide a clear title and description for your PR, explaining what it does, why it's needed, and any relevant context.
    *   Reference any related issues (e.g., `Closes #123`, `Fixes #456`).

### Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. This helps us generate release notes and understand the history more easily.

**Format:** `<type>(<scope>): <description>`

*   **type:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `build`, `ci`
*   **scope (optional):** Component, page, or area affected (e.g., `generatePage`, `navbar`, `geminiService`).
*   **description:** A concise summary of the change.

**Examples:**

*   `feat(generatePage): Add advanced prompt builder`
*   `fix(imageCard): Resolve download button alignment`
*   `docs: Update README with API key instructions`
*   `refactor(ui): Improve Button component styling`

---

Thank you for your valuable contributions!