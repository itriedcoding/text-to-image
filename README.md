# Gemini AI ImageCrafter

## Unleash Your Imagination with AI-Powered Image Generation

Gemini AI ImageCrafter is an advanced text-to-image generation platform that transforms your creative ideas into stunning visuals. Leveraging the power of Google's Gemini AI, this application offers a sleek, responsive, and interactive experience for crafting unique images from simple text prompts.

This project is open-sourced to foster community contributions and collective innovation.

---

## ✨ Features

*   **Text-to-Image Generation:** Convert descriptive text prompts into high-quality images using the `imagen-4.0-generate-001` model.
*   **Advanced Image Editing:** Take any previously generated image and apply new prompts to modify it, leveraging a specialized image editing model (`gemini-2.5-flash-image`). This allows for dynamic refinement, transformation, and artistic manipulation of your creations.
*   **Frontend-only User Authentication (Simulation):** A client-side sign-up and login system using `localStorage` to simulate user sessions. This provides a user management UI/UX experience without requiring a backend, demonstrating how user-specific content could be handled.
*   **Dedicated Legal Pages:** Includes "Terms of Service" and "Privacy Policy" pages for a complete application experience.
*   **Persistent Footer:** A global footer component with copyright information and navigation links to legal pages and main app sections.
*   **Desktop Installability (PWA):** Install the application directly to your desktop (Windows, macOS, Linux) for a native app-like experience. Enjoy offline access and a dedicated window, enhancing usability and accessibility.
*   **Advanced Prompt Builder:** Utilize categorized keyword suggestions to enhance and refine your prompts, guiding the AI to generate precise visuals.
*   **Configurable Settings:**
    *   **Number of Images:** Generate multiple variations (up to 4) from a single prompt.
    *   **Aspect Ratio:** Choose from various aspect ratios (1:1, 4:3, 3:4, 16:9, 9:16) to fit your creative needs.
    *   **Seed Control:** Specify a numerical seed for reproducible generations, allowing you to recreate or iterate on specific visual styles.
    *   **Negative Prompt (UI-only):** While not directly supported by the current `imagen-4.0-generate-001` model, this feature is included in the UI for future model compatibility and to allow users to articulate what they want to avoid.
*   **Generation History:** Automatically save and browse all your generated images, complete with their original prompts and settings.
*   **Image Management:** Download generated images, copy direct data URIs, and clear your history with ease. Optimized image rendering and downloads using `URL.createObjectURL` for better performance.
*   **Intuitive UI/UX:** A modern, responsive interface built with React and Tailwind CSS, featuring subtle animations and smooth interactions.
*   **Google Gemini API Key:** The application expects the Google Gemini API key to be provided securely via `process.env.API_KEY` in the execution environment.

---

## 🚀 Getting Started

Follow these steps to set up and run Gemini AI ImageCrafter on your local machine.

### Prerequisites

*   **Node.js & npm:** Ensure you have Node.js (which includes npm) installed. You can download it from [nodejs.org](https://nodejs.org/).
    *   Verify installation: `node -v` and `npm -v`
*   **Google Gemini API Key:** You will need an API key from Google AI Studio. This key must be made available to the application via an environment variable.

### Local Development Setup

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/gemini-ai-imagecrafter.git
    cd gemini-ai-imagecrafter
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    # or if you prefer yarn
    # yarn install
    ```

3.  **Configure Google Gemini API Key:**
    The application expects your Google Gemini API Key to be available as an environment variable named `API_KEY`. How you set this depends on your development environment or deployment method.

    *   **When running locally with `npx serve` or `http-server`:** You will need to set the `API_KEY` environment variable before starting the server.
        **Example (Linux/macOS):**
        ```bash
        export API_KEY="YOUR_GEMINI_API_KEY"
        npx serve .
        ```
        **Example (Windows Command Prompt):**
        ```bash
        set API_KEY="YOUR_GEMINI_API_KEY"
        npx serve .
        ```
        **Example (Windows PowerShell):**
        ```bash
        $env:API_KEY="YOUR_GEMINI_API_KEY"
        npx serve .
        ```
        Replace `"YOUR_GEMINI_API_KEY"` with your actual key obtained from Google AI Studio.

    *   **Important:** Ensure your selected API key has billing enabled. The `imagen-4.0-generate-001` model is a paid service. Without billing, API calls will fail.
        *   [Google Gemini API Billing Information](https://ai.google.dev/gemini-api/docs/billing)

4.  **Run the Application:**
    This application is designed to run in a browser environment that automatically transpiles and resolves ES modules, as demonstrated by the `index.html`'s `type="module"` script and `importmap`.
    It is also a Progressive Web App (PWA), which means you can install it to your desktop for a native-like experience and offline functionality after visiting the URL.

    You can serve the application using a simple static file server.

    Using `npx serve` (after setting API_KEY):
    ```bash
    npx serve .
    ```
    (If `serve` is not installed globally, `npx` will download and run it.)

    Alternatively, if you have a different static server (e.g., `http-server`):
    ```bash
    npm install -g http-server
    http-server .
    ```

    After running the server, open your web browser and navigate to `http://localhost:5000` (or the port indicated by your server).

---

## 💡 Usage

1.  **Ensure API Key is Set:** Before running, make sure your `API_KEY` environment variable is configured.
2.  **Sign Up or Log In:** Navigate to the "Sign Up/Login" page. Create a new account or log in with existing (frontend-only) credentials. You must be logged in to access image generation and history features.
3.  **Navigate to the "Generate" page.**
4.  **Enter a Prompt:** Describe the image you want to create in the "Prompt" textarea. Use the "Prompt Builder" to get suggestions and enhance your descriptions.
5.  **Configure Options:**
    *   Adjust the "Number of Images" to generate multiple results.
    *   Choose your desired "Aspect Ratio".
    *   Optionally, enter a "Seed" for reproducible results.
6.  **Generate:** Click the "Generate Images" button.
7.  **View Results:** Your generated images will appear below the controls. You can download them or copy their links.
8.  **Edit Images:** Click the "Edit Image" button on any generated image to open the editing interface. Provide a new prompt to transform the selected image.
9.  **History:** All your generated and edited images are saved to local storage and can be viewed on the "History" page.
10. **Install to Desktop (PWA):** Most modern browsers will offer an "Install App" option in their address bar or menu. Click this to install Gemini AI ImageCrafter as a desktop application.

---

## 🤝 Contributing

We welcome contributions from the community! Please refer to the `CONTRIBUTING.md` file for detailed guidelines on how you can help improve this project.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🌟 Acknowledgements

*   Developed with React and TypeScript.
*   Styled using Tailwind CSS.
*   Powered by Google's Gemini API and the `@google/genai` SDK.
*   UI components inspired by Shadcn UI principles.