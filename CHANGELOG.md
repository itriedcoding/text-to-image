# CHANGELOG

## 1.0.0 - 2023-10-26

### ✨ Features
- **Frontend-only User Authentication Simulation:**
  - Implemented a client-side (localStorage-based) sign-up and login system for UI/UX demonstration.
  - New `AuthPage.tsx` for user registration and login.
  - User state (logged in/out, username) managed in `localStorage`.
  - Protected routes (`/generate`, `/history`) now require a simulated login.
- **Terms of Service Page:**
  - Added a dedicated static page (`/terms`) for Terms of Service.
- **Privacy Policy Page:**
  - Added a dedicated static page (`/privacy`) for Privacy Policy.
- **Global Footer Component:**
  - Introduced a new `Footer.tsx` component, displayed on all pages, containing legal links (ToS, Privacy) and copyright information.
- **Navbar Enhancements:**
  - Navbar now dynamically displays "Sign Up/Login" or "Welcome, [Username] / Logout" based on simulated authentication status.
  - Added a logout functionality.
- **Image Card Performance Improvement:**
  - Updated `ImageCard.tsx` to use `URL.createObjectURL` for image display and download links, improving performance and memory usage by avoiding large data URIs directly in the DOM.

### 📝 Documentation
- Updated `README.md` to reflect new authentication features, legal pages, and the footer component.
- Clarified the frontend-only nature of the authentication system.

### 🐛 Bug Fixes
- `ImageCard.tsx`: Ensured correct cleanup of `URL.revokeObjectURL` for generated image blobs.
- `ImageCard.tsx`: Corrected type definition for `ref` prop in `Card` component for better type safety.

### 🛠️ Refactor
- Consolidated UI component imports and usage for consistency.
- `App.tsx`: Refactored route management to include new pages and authentication guards.
- Removed deprecated `AuthForm.tsx` and `AuthPage.tsx` placeholder files in favor of the new, functional `AuthPage.tsx`.