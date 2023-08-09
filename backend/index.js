const express = require("express"); //express server
const http = require("http");
const mongoose = require("mongoose");
const socket = require("socket.io");
// const { connectToMongo } = require("./db");
const codeRoutes = require("./routes/codeRouter");
const cors = require("cors");
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/code", codeRoutes);

const PORT = process.env.PORT || 8000;
const MAX_STUDENTS_PER_CLASS = 1;

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

const server = http.createServer(app); //http server with express app
const io = socket(server, {
  cors: {
    origin: "http://localhost:8000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Store the socket id of the mentor connected to each code block
const connectedMentors = {
  "code-block-1": null,
  "code-block-2": null,
  "code-block-3": null,
  "code-block-4": null,
};

// Store the socket ids of the clients connected to each code block
const connectedClients = {
  "code-block-1": [],
  "code-block-2": [],
  "code-block-3": [],
  "code-block-4": [],
};

const addClientToClass = (codeBlockId, socketId) => {
  // If there is no mentor connected to the code block, the first client to join will be the mentor
  if (!connectedMentors[codeBlockId]) {
    connectedMentors[codeBlockId] = socketId;
    console.log(
      "A mentor joined a room: ",
      codeBlockId + "id:",
      connectedMentors[codeBlockId]
    );
  } else {
    // If there is already a mentor connected, the client will be added to the list of clients
    if (connectedClients[codeBlockId].length < MAX_STUDENTS_PER_CLASS) {
      connectedClients[codeBlockId].push(socketId);
      console.log(
        "A student joined a room ",
        codeBlockId + "id:",
        connectedClients[codeBlockId]
      );
    } else {
      console.log(
        "Maximum number of students reached for code block ",
        codeBlockId
      );
      // Optionally, you can emit a message to the client indicating that the class is full.
      io.to(socketId).emit("classFull");
    }
  }
};

const removeClientFromClass = (codeBlockId, socketId) => {
  if (connectedMentors[codeBlockId] === socketId) {
    connectedMentors[codeBlockId] = null;
  } else {
    connectedClients[codeBlockId] = connectedClients[codeBlockId].filter(
      (id) => id !== socketId
    );
  }
};

// Socket.io connection event
io.on("connection", (socket) => {
  console.log("A new user connected");

  socket.on("join", ({ id }) => {
    console.log("A user joined a room ", id);
    addClientToClass(id, socket.id);
    const isMentor = connectedMentors[id] === socket.id;
    socket.emit("role", { isMentor });
    isMentor &&
      io
        .to(connectedClients[id][0])
        .emit("mentorJoin", { message: "Mentor joined the room" });

    !isMentor &&
      io
        .to(connectedMentors[id])
        .emit("studentJoin", { message: "Student joined the room" });
  });
  // Handle socket events here

  socket.on("newCode", ({ id, code }) => {
    console.log("New code from client: ", code);
    // Send the new code to relevent Mentor
    const mentorSocketId = connectedMentors[id];
    io.to(mentorSocketId).emit("newCodeOfStudent", code);
  });

  socket.on("leave", ({ id }) => {
    console.log("A user left a room ", id);

    const isMentor = connectedMentors[id] === socket.id;
    isMentor &&
      io
        .to(connectedClients[id][0])
        .emit("mentorLeave", { message: "Mentor left the room" });

    !isMentor &&
      io
        .to(connectedMentors[id])
        .emit("studentLeave", { message: "Student left the room" });
    removeClientFromClass(id, socket.id);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://mika80666:iL30iQ2Y2R166ODw@cluster0.6skunbx.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB successfully");
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
