🛡️ Cipher Hub | Ultimate Security Sentinel (v7.0)

Cipher Hub is a next-generation, multi-modal security visualization and analysis suite. Built with a stunning Glassmorphism interface and a dynamic Rainbow-Flow background, it allows users to analyze, create, and secure various forms of digital authentication—ranging from standard passwords to complex rhythm-based and spatial-hotspot biometric analogs.

🌟 Comprehensive Feature Breakdown

1. 🔑 Password Sentinel (The Alpha Module)

-This module goes beyond simple character checking to provide a full forensic analysis of text-based credentials.

-Real-time Entropy Meter: A high-precision circular progress tracker that calculates password strength (0-100%) based on character variety (Uppercase, Numbers, Symbols).

-"Time to Crack" Estimator: Dynamic feedback using complexity algorithms to estimate brute-force resistance (ranging from "Instantly" to "Centuries").

-Keyboard Heatmap: A visual 35-dot grid representing the QWERTY layout. As you type, the grid lights up to show "fingerprint clustering," helping users avoid predictable physical key patterns.

-CPM Tracker: Measures Characters Per Minute in real-time, allowing users to gauge the "muscle memory" speed of their password entry.

-Salted Suggestions: Automatically generates a "Better Alternative" by applying a custom salt algorithm (capitalization + special characters + length-based math) to the user's input.

2. 🎨 Pattern Sentinel (Spatial Security)

-An interactive 3x3 node grid designed for gesture-based security visualization.

-Path Visualization: Real-time directional arrows (e.g., 1 → 5 → 9) to track the flow of the pattern.

-Node Complexity Meter: A dedicated meter that grows based on the number of unique nodes and the "distance" of the connections.

-Pattern Suggestion: Recommends high-complexity non-linear shapes to avoid common "L" or "Z" patterns.

3. 🛡️ Advanced Authentication Modules (The "Sentinel" Suite)

-🔤 Passphrase Engine: Focuses on the "Diceware" security philosophy, tracking word-count and sentence length for ultra-secure, human-readable keys.

-😀 Emoji Keys: A modern security approach using a sequence of 16 different emojis. Emoji-based keys are often harder to crack via social engineering.

-⏱️ Auth Vault (TOTP): A simulated Time-based One-Time Password generator. It features a 30-second progress bar and refreshes a 6-digit code, mimicking apps like Google Authenticator.

-🥁 Rhythm Sentinel: A biometric-analog module. Users "tap" out a rhythm, and the system tracks the precise timing between beats to create a temporal signature.

-🎯 Image Hotspot: This allows users to upload a personal image and select 3 "Secret Points" (XY coordinates) on the canvas to act as an invisible spatial password.

4. 📜 Integrated Activity History & Logging

-Persistent Vault: Automatically stores every password, pattern, and rhythm generated into the browser's LocalStorage.

-Search & Filter: A live search bar allows you to filter your history by type (e.g., searching "Pattern" brings up only pattern logs).

-Metadata Tracking: Every log records the specific email used for the backup and the exact time of creation.

5. 📩 Secure Cloud Backups (EmailJS)

-Direct-to-Inbox: Integrated with the EmailJS API to send notes and credentials directly to your verified email.

-Validation Layer: Includes regex-based email validation to prevent data loss due to typos.

🛠️ Technical Architecture

-UI/UX: CSS3 Custom Properties (Variables), Backdrop Filters (Blur), and Keyframe Animations.

-Frontend Logic: Vanilla JavaScript (ES6+) with zero external dependencies (except for the EmailJS SDK).

-Data Persistence: Browser localStorage API for session-based history retention.

-Service Layer: EmailJS for SMTP-free communication.

🚀 Installation & Local Setup

1. Clone the Repository:
git clone.-                                     https://github.com/aadi15127/cipher-hub.git

2. Organization: Ensure your root folder contains the following structure:

├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md

3. Configure Email Credentials:

Open js/script.js and locate the configuration section at the top. Replace the placeholder IDs with your EmailJS credentials:

const PUBLIC_KEY = "F6_n12Iry0aRYGpvx"; 


🎨 Design Philosophy

-Glassmorphism: All UI elements use a semi-transparent white background with a heavy blur to maintain readability over the moving rainbow background.

-Color-Coded Feedback: The UI dynamically shifts between var(--danger) (red), var(--warning) (orange), and var(--success) (green) based on the user's security score.

📄 License

This project is licensed under the MIT License. You are free to use, modify, and distribute this software for personal or commercial use.