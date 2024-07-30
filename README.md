# HarmoniSync

HarmoniSync is a music recommendation web application designed to help users discover the finest music tracks across various genres. The project leverages the Spotify API to provide personalized track recommendations based on user-selected genres.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technology & Architecture](#technology--architecture)
- [Core Algorithms](#core-algorithms)
- [Learnings](#learnings)
- [Team](#team)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

HarmoniSync was inspired by our passion for music and the desire to create a seamless way for users to discover new tracks. Our team collaborated to design and develop an intuitive application that provides high-quality music recommendations.

## Features

- Discover music tracks across multiple genres.
- Select your favorite genres and get personalized recommendations.
- Add recommended tracks to your playlists.
- Explore detailed track information and listen on Spotify.

## Technology & Architecture

HarmoniSync utilizes a modern tech stack to ensure a smooth and efficient user experience:

- **Frontend:** React, Next.js, Tailwind CSS
- **Backend:** Python, Flask
- **APIs:** Spotify API for music data
- **Database:** MySQL for user and playlist data
- **Authentication:** NextAuth.js for user authentication

## Core Algorithms

HarmoniSync's recommendation system employs advanced algorithms to analyze user preferences and generate personalized music suggestions. The core algorithm involves:

1. Fetching user-selected genres.
2. Requesting recommendations from Spotify API based on seed genres.
3. Filtering and ranking tracks to suit user tastes.

## Learnings

Working on HarmoniSync enhanced our skills in full-stack development, API integration, and collaborative teamwork. We gained a deeper understanding of music recommendation systems and improved our ability to manage technical and non-technical challenges.

## Team

- **Nathanael Cheramlak**
- **Daniel Yohannes**

## Installation

To run HarmoniSync locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/DanielJohn17/HarmoniSync.git
   ```
2. Navigate to the project directory:
   ```bash
   cd HarmoniSync
   ```
3. Install the Frontend dependencies:
   ```bash
   npm install
   ```
4. Install the backend dependencies:

   ```bash
   pip install -r requirements.txt
   ```

5. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add your Spotify API credentials and other required environment variables.

6. Start the backend development server:

   ```bash
   cd backend
   python -m api.v1.app
   ```

7. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
2. Sign in using your Spotify account.
3. Select your favorite genres.
4. Explore the recommended tracks and add them to your playlists.

## Contributing

We welcome contributions to HarmoniSync! If you have ideas for new features or improvements, please open an issue or submit a pull request. Follow the contributing guidelines for more information.

## License

HarmoniSync is licensed under the MIT License. See the LICENSE file for more details.
