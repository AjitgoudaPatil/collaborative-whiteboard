🎨 Collaborative Whiteboard
Welcome to Collaborative Whiteboard — a sleek, real-time, multi-user drawing experience that brings creativity to life! Built with React and powered by a Node.js WebSocket backend, this app lets users draw, erase, and collaborate instantly with others in a vibrant, interactive canvas. Unleash your inner artist and see what you and your friends can create together! 🚀
Live Demo (Link to deployed app coming soon!)

✨ Features

Real-Time Drawing: Draw and watch your strokes appear instantly for all users.  
Pen & Eraser Tools: Switch effortlessly between drawing and erasing modes.  
Customizable Brush:  
Color Picker: Choose from a vibrant palette or pick any custom color.  
Adjustable Size: Fine-tune the thickness of your brush or eraser for precision.


Multi-User Cursors: See other users' cursors dance across the canvas in real time.  
Clear Canvas: Wipe the board clean with a single click.  
Responsive Design: Create on any device, from desktops to tablets.


🛠️ Technologies Used
Frontend

React: For a dynamic and responsive UI.  
Tailwind CSS: For modern, utility-first styling.

Backend

Node.js: Powers the server for seamless communication.  
WebSocket (ws library): Enables real-time, bi-directional updates.

Development Tools

Vite: Lightning-fast frontend build tool.  
Nodemon: Auto-reloads the server during development.


🚀 Project Setup
Get this masterpiece running locally in just a few steps:
1. Clone the Repository
git clone https://github.com/your-username/collaborative-whiteboard.git
cd collaborative-whiteboard

2. Run the Backend Server
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Start the development server
npm run dev

The server will fire up at http://localhost:8080.
3. Run the Frontend Client
# Navigate to the client directory
cd client

# Install dependencies
npm install

# Start the development server
npm run dev

The client will launch at http://localhost:5173 (or another port if 5173 is occupied).

🌐 Deployment on Free Services
Take your whiteboard to the world with these free hosting options!
Frontend (Client)
Deploy the React client using Vercel or Netlify.  
Steps for Vercel:

Push your code to a GitHub repository.  
Sign up for a Vercel account and connect it to your GitHub.  
Import your project repository in Vercel.  
Vercel auto-detects Vite projects. Use these settings:  
Build Command: npm run build  
Output Directory: client/dist (or dist if root is set to client)  
Install Command: npm install


Deploy and share your masterpiece! 🎉

Backend (Server)
Host the Node.js WebSocket server on Render.  
Steps for Render:

Push your code to your GitHub repository.  
Sign up for a Render account.  
Create a new "Web Service" and connect it to your repository.  
Configure with these settings:  
Environment: Node  
Root Directory: server  
Build Command: npm install  
Start Command: npm start


Deploy the service.  
Important: Copy the Render service URL (e.g., https://your-whiteboard-server.onrender.com) and update the WebSocket connection URL in your Whiteboard.jsx file before deploying the frontend.


🌟 Why This Project Rocks
This collaborative whiteboard isn’t just a tool — it’s a canvas for creativity, connection, and fun. Whether you're brainstorming with a team, doodling with friends, or teaching a class, this app brings your ideas to life in real time.  
Got questions or want to contribute? Open an issue or pull request on GitHub! Let’s make this whiteboard even more awesome together. 💪