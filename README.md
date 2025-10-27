# Gemini AI ImageCrafter

## Unleash Your Imagination with AI-Powered Image Generation

Gemini AI ImageCrafter is an advanced text-to-image generation platform that transforms your creative ideas into stunning visuals. Leveraging the power of Google's Gemini AI, this application offers a sleek, responsive, and interactive experience for crafting unique images from simple text prompts.

This project is open-sourced to foster community contributions and collective innovation.

---

## ✨ Features

*   **Text-to-Image Generation:** Convert descriptive text prompts into high-quality images using the `imagen-4.0-generate-001` model.
*   **Advanced Prompt Builder:** Utilize categorized keyword suggestions to enhance and refine your prompts, guiding the AI to generate precise visuals.
*   **Configurable Settings:**
    *   **Number of Images:** Generate multiple variations (up to 4) from a single prompt.
    *   **Aspect Ratio:** Choose from various aspect ratios (1:1, 4:3, 3:4, 16:9, 9:16) to fit your creative needs.
    *   **Seed Control:** Specify a numerical seed for reproducible generations, allowing you to recreate or iterate on specific visual styles.
    *   **Negative Prompt (UI-only):** While not directly supported by the current `imagen-4.0-generate-001` model, this feature is included in the UI for future model compatibility and to allow users to articulate what they want to avoid.
*   **Generation History:** Automatically save and browse all your generated images, complete with their original prompts and settings.
*   **Image Management:** Download generated images, copy direct data URIs, and clear your history with ease.
*   **Intuitive UI/UX:** A modern, responsive interface built with React and Tailwind CSS, featuring subtle animations and smooth interactions.
*   **Google Gemini API Key Integration:** Securely manage your API key directly through the AI Studio platform, ensuring a seamless and compliant user experience.

---

## 🚀 Getting Started

Follow these steps to set up and run Gemini AI ImageCrafter on your local machine.

### Prerequisites

*   **Node.js & npm:** Ensure you have Node.js (which includes npm) installed. You can download it from [nodejs.org](https://nodejs.org/).
    *   Verify installation: `node -v` and `npm -v`

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

3.  **Run the Application:**
    This application is designed to run in a browser environment that automatically transpiles and resolves ES modules, as demonstrated by the `index.html`'s `type="module"` script and `importmap`.
    
    You can serve the application using a simple static file server.
    
    Using `npx serve`:
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

### Google Gemini API Key Configuration

This application integrates with the AI Studio platform's API key management system.

1.  **No `.env` file needed:** You do **NOT** need to create a `.env` file or manually paste your API key into the code. The `process.env.API_KEY` is dynamically populated by the runtime environment after you select your key via the platform's UI.

2.  **On the "Generate" Page:** When you navigate to the "Generate" page for the first time, or if your key becomes invalid, the application will prompt you to "Select Google Gemini API Key".

3.  **Select Your Key:** Click this button. A dialog provided by the AI Studio platform will appear, allowing you to choose an existing API key or create a new one.

4.  **Enable Billing:** Ensure that your selected API key has billing enabled. The `imagen-4.0-generate-001` model is a paid service. Without billing, API calls will fail. A link to Google's billing information is provided in the application's API key selection prompt.
    *   [Google Gemini API Billing Information](https://ai.google.dev/gemini-api/docs/billing)

---

## 💡 Usage

1.  **Navigate to the "Generate" page.**
2.  **Select API Key:** If prompted, select your Google Gemini API key.
3.  **Enter a Prompt:** Describe the image you want to create in the "Prompt" textarea. Use the "Prompt Builder" to get suggestions and enhance your descriptions.
4.  **Configure Options:**
    *   Adjust the "Number of Images" to generate multiple results.
    *   Choose your desired "Aspect Ratio".
    *   Optionally, enter a "Seed" for reproducible results.
5.  **Generate:** Click the "Generate Images" button.
6.  **View Results:** Your generated images will appear below the controls. You can download them or copy their links.
7.  **History:** All your generated images are saved to local storage and can be viewed on the "History" page.

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
