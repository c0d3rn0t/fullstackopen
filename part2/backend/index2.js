const express = require("express");
const app = express();

app.use(express.json());

let notes = [
  { id: 1, content: "HTML is easy", important: true },
  { id: 2, content: "Browser can execute only JavaScript", important: false },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

const requestLogger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("Body:  ", req.body);
  console.log("---");
  next();
};
app.use(requestLogger);

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "Unknown endpoint" });
};

app.get("/", (req, res) => {
  res.send("<h1>Hello Worlds</h1>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.post("/api/notes", (req, res) => {
  const body = req.body;

  if (Object.keys(body).length === 0) {
    return res.status(400).json({ error: "Content Missing" });
  }

  const id = notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;
  const note = req.body;
  note.id = id + 1;
  notes.concat(note);
  res.json(note);
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);

  res.status(204).end();
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
