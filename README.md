Below is a beautifully formatted README file for your "Globetrotter Challenge" project. It includes detailed instructions, commands, emojis, and a professional yet engaging tone to showcase your work for the Greenhouse assignment. You can save this as `README.md` in the root of your `globetrotter-challenge` project.

---

# 🌍 Globetrotter Challenge – The Ultimate Travel Guessing Game! 🚀

Welcome to the **Globetrotter Challenge**, a fun and interactive full-stack web application built as part of the Greenhouse Software Engineer, Web assignment. This game challenges users to guess famous destinations based on cryptic image-based clues, unlocking fun facts and trivia along the way. 🎉

## 🌟 Project Overview
The Globetrotter Challenge is a Next.js-based web app that features:
- 🕹️ Image-based clues to guess famous destinations (e.g., Tokyo, Paris, New York).
- ⏱ A timer (60 seconds) or limit on wrong answers (3) to end the game.
- 📊 Score tracking for correct and incorrect guesses.
- 🎨 Engaging feedback animations (confetti for correct, sad face for incorrect).
- 🤝 Multiplayer sharing via a "Challenge a Friend" button (WhatsApp integration).
- 📚 Fun facts and trivia for each destination, stored securely in MongoDB Atlas.

This project demonstrates full-stack development skills, including React, Next.js, Tailwind CSS, Mongoose, and MongoDB, while meeting Greenhouse’s assignment requirements. ✨

---

## 🛠 Tech Stack
| Technology         | Purpose                                      | Version       |
|--------------------|----------------------------------------------|---------------|
| **Next.js**        | Full-stack React framework (SSR, API routes) | ^14.0.0       |
| **React**          | UI component library                         | ^18.0.0       |
| **Tailwind CSS**   | Utility-first CSS framework                  | ^3.0.0        |
| **Mongoose**       | MongoDB ODM for Node.js                      | ^7.0.0        |
| **MongoDB Atlas**  | Cloud-hosted NoSQL database                  | Latest        |
| **cookies-next**   | Cookie management for user persistence       | ^2.1.1        |

---

## 🚀 Getting Started

Follow these steps to set up and run the Globetrotter Challenge locally. 😊

### Prerequisites
- **Node.js** (v18 or later): Install from [nodejs.org](https://nodejs.org/).
- **npm** (comes with Node.js): Check with `node -v` and `npm -v`.
- **MongoDB Atlas Account**: Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) for a free cluster.
- **Git** (optional): For version control and GitHub integration.

### Installation

1. **Clone the Repository** 🌟
   ```bash
   git clone <your-github-repo-url>
   cd globetrotter-challenge
   ```

   If you don’t use Git, download the ZIP file from GitHub and extract it.

2. **Install Dependencies** 📦
   Run the following command to install all project dependencies:
   ```bash
   npm install
   ```

3. **Set Up MongoDB Atlas** 🗃️
   - Create a MongoDB Atlas account and cluster (see detailed steps below).
   - Whitelist your IP in Atlas (Network Access).
   - Create a database user (e.g., `globetrotterUser`) with a secure password.
   - Get your connection string (e.g., `mongodb+srv://globetrotterUser:<password>@globetrottercluster.mongodb.net/globetrotter?retryWrites=true&w=majority`).

4. **Configure Environment Variables** 🔑
   Create a `.env.local` file in the project root with your MongoDB Atlas connection string:
   ```plaintext
   MONGODB_URI=mongodb+srv://globetrotterUser:<password>@globetrottercluster.mongodb.net/globetrotter?retryWrites=true&w=majority
   ```
   Replace `<password>` with your actual MongoDB Atlas password.

5. **Populate MongoDB with Data** 🌐
   - Generate or use a `destinations.json` file with 100+ destinations, including `name`, `clues` (optional for reference), `funFact`, and `imageUrl` (e.g., Unsplash URLs). Example:
     ```json
     [
       {
         "name": "Tokyo",
         "clues": ["Busiest pedestrian crossing", "Anime district"],
         "funFact": "Tokyo’s Shibuya Crossing is one of the busiest in the world.",
         "imageUrl": "https://example.com/images/tokyo-shibuya.jpg"
       }
       // Add 99 more destinations...
     ]
     ```
   - Import the data using `mongoimport`:
     ```bash
     mongoimport --uri mongodb+srv://globetrotterUser:<password>@globetrottercluster.mongodb.net/globetrotter --collection destinations --file destinations.json --jsonArray
     ```
   - Verify data in Atlas UI or shell:
     ```bash
     mongo "mongodb+srv://globetrotterUser:<password>@globetrottercluster.mongodb.net/globetrotter" --apiVersion 1
     use globetrotter
     db.destinations.find().pretty()
     ```

### Running the Project

1. **Start the Development Server** 🏃‍♂️
   Run the following command to start the app locally:
   ```bash
   npm run dev
   ```

2. **Access the App** 🌐
   Open your browser and go to `http://localhost:3000`.
   - Enter a username on the home page and click “Start Game” to play.
   - Guess destinations based on image clues, track your score, and challenge friends!

3. **Test the Features** ✅
   - Verify image-based clues load correctly.
   - Test the 60-second timer or 3-wrong-answer limit to end the game.
   - Ensure scores update and fun facts display after guesses.
   - Try the “Challenge a Friend” button (currently a mock alert).

---

## 🏗️ Project Structure

```
globetrotter-challenge/
├── public/                  # Static assets (e.g., images, favicon)
├── src/                     # Source code
│   ├── app/                 # Next.js app directory (pages, API routes)
│   │   ├── api/             # Backend API routes (destinations, score, users)
│   │   ├── game/            # Game page
│   │   └── page.js          # Home page
│   ├── components/          # UI components (ClueDisplay, GuessForm, etc.)
│   ├── lib/                 # Utilities and models (db, destinationModel, userModel, utils)
│   └── styles/              # Global CSS with Tailwind
├── .env.local               # Environment variables (MongoDB URI)
├── package.json             # Project dependencies and scripts
├── README.md                # This file!
├── next.config.js           # Next.js configuration
└── tailwind.config.js       # Tailwind CSS configuration
```

---

## ⚙️ Development Commands

| Command              | Description                                  |
|----------------------|----------------------------------------------|
| `npm install`        | Installs all project dependencies.          |
| `npm run dev`        | Starts the development server at `localhost:3000`. |
| `npm run build`      | Builds the app for production.              |
| `npm run start`      | Starts the production server.               |
| `npx next clear-cache` | Clears the Next.js cache for a fresh build. |

---

## 🌈 Features and Functionality

- **Image-Based Clues** 🖼️: Guess destinations using images (e.g., Tokyo’s Shibuya Crossing) instead of text.
- **Game End Conditions** ⏱: Ends after 60 seconds or 3 wrong answers, showing a final score.
- **Score Tracking** 📊: Tracks correct and incorrect guesses, stored in MongoDB Atlas.
- **Engaging Feedback** 🎉: Confetti for correct guesses, sad face for incorrect, with fun facts.
- **Multiplayer Sharing** 🤝: Mock “Challenge a Friend” button (extend with WhatsApp sharing).
- **Secure Backend** 🔒: Uses Next.js API routes and MongoDB Atlas for data storage.

---

## 🛡️ Security and Scalability

- **MongoDB Atlas**: Cloud-hosted, scalable database with encryption and IP whitelisting.
- **Mongoose**: Ensures data validation and schema enforcement.
- **Environment Variables**: Securely stores sensitive data (e.g., `MONGODB_URI`).
- **Rate Limiting**: Can be added to API routes for production scalability.

---

## 🌍 Deployment

Deploy the app to Vercel for production:

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. Connect to Vercel:
   - Sign up/login at [vercel.com](https://vercel.com).
   - Import your GitHub repository and deploy.
   - Add `MONGODB_URI` as an environment variable in Vercel’s dashboard.

3. Access your live app at the Vercel URL (e.g., `globetrotter-challenge.vercel.app`).

---

## 🎉 Contributing

This project was built for the Greenhouse assignment, but feel free to fork, enhance, or contribute! Suggestions for features like leaderboards, more dynamic image clues, or real-time multiplayer are welcome. 😊

---

## 📝 License

This project is for educational purposes and part of a job application. No formal license is applied, but please respect Greenhouse’s intellectual property and use it responsibly.

---

## 🙌 Acknowledgements

- **Greenhouse**: For the exciting assignment opportunity! 🌱
- **MongoDB Atlas**: For providing a robust cloud database solution. 🗃️
- **Tailwind CSS**: For making the UI beautiful and responsive. 🎨
- **Next.js**: For an amazing full-stack framework. 🚀

Happy coding, and enjoy the Globetrotter Challenge! 🌍✨

---

This README is formatted with Markdown, includes emojis for visual appeal, and provides detailed, step-by-step instructions for setting up, running, and deploying the project. You can copy this directly into your `README.md` file in the `globetrotter-challenge` directory. Let me know if you want to tweak anything or add more sections!
