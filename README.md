# YouTube Clone

A responsive YouTube-inspired video browsing application built with React and Vite. The app uses the YouTube Data API to display popular videos, category-based feeds, video details, channel information, recommendations, and comments in a familiar watch experience.

## Features

- Browse popular videos from the YouTube Data API
- Filter videos by category, including music, gaming, sports, technology, news, and entertainment
- Responsive YouTube-style navigation with collapsible sidebar
- Video watch page with embedded YouTube playback
- Video metadata including title, views, publication date, likes, and description
- Channel information and subscriber count
- Recommended video panel
- Comment loading with formatted text, author details, timestamps, and likes
- Responsive layouts for desktop, tablet, and mobile screens
- Vite-powered development server with hot module replacement

## Tech Stack

- React 19
- Vite
- React Router
- YouTube Data API v3
- Moment.js
- CSS3 with responsive media queries

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm
- A Google Cloud project with YouTube Data API v3 enabled

### Installation

1. Clone the repository and move into the project directory:

   ```bash
   git clone <repository-url>
   cd youtube-clone-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a local environment file:

   ```bash
   copy .env.example .env
   ```

   On macOS or Linux, use:

   ```bash
   cp .env.example .env
   ```

4. Add your YouTube API key to `.env`:

   ```env
   VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

   Open the local URL shown in the terminal, normally `http://localhost:5173`.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Creates a production build |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint across the project |

## Environment Variables

| Variable | Description |
| --- | --- |
| `VITE_YOUTUBE_API_KEY` | Google API key used for YouTube Data API requests |

Vite exposes variables prefixed with `VITE_` to client-side code. This means the API key is not a server-side secret. Restrict the key in Google Cloud by HTTP referrer, API, and quota before deploying the application. Never commit `.env` or place unrestricted production credentials in the repository.

## Project Structure

```text
src/
├── Components/
│   ├── Feed/          Video grid and API feed
│   ├── Navbar/        Global navigation and search UI
│   ├── PlayVideo/     Video player, metadata, and comments
│   ├── Recommended/   Recommended video panel
│   └── Sidebar/       Category and subscription navigation
├── Pages/
│   ├── Home/          Home feed and category filters
│   └── Video/         Watch page layout
├── Data.js            Shared display utilities
├── index.css          Global design tokens and base styles
└── main.jsx           React application entry point
```

## API Usage

The application uses these YouTube Data API resources:

- `videos.list` for popular videos and video details
- `channels.list` for channel metadata
- `commentThreads.list` for video comments

API responses depend on the selected region, available quota, video visibility, and API key restrictions. If the feed is empty, check the browser console and confirm that the API is enabled and the key has access to YouTube Data API v3.

## Production Build

Create and preview a production build with:

```bash
npm run build
npm run preview
```

Before deployment, configure `VITE_YOUTUBE_API_KEY` in the hosting provider's environment settings and restrict the key to the deployed domain.

## License

This project is intended for learning and demonstration purposes. YouTube is a trademark of Google LLC. This application is not affiliated with or endorsed by YouTube.
