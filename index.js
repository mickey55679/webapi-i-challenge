const express = require("express");

const server = express();
server.use(express.json()); // !! IMPORTANT this teaches express to parse req.body

let id = 0;
let getId = () => ++id; // helper function to create auto-incrementing ids

let hobbits = [
  // our fake hobbits database table
  { id: getId(), name: "Samwise Gamgee" },
  { id: getId(), name: "Frodo Baggins" },
];

server.get("/hobbits", (req, res) => {
  // GET ALL EXISTING HOBBITS
  res.status(200).json(hobbits); // 200 means "OK"
});
server.get("/hobbits/:id", (req, res) => {
  // GET EXISTING HOBBIT BY id
  // the desired id comes in the URL, and is found in `req.params.id`
  res.status(200).json(hobbits.find((hob) => hob.id == req.params.id));
});
server.post("/hobbits", (req, res) => {
  // POST NEW HOBBIT
  // the desired name comes in the body, and is found in `req.body.name`
  hobbits.push({ id: getId(), name: req.body.name });
  res.status(201).json(hobbits); // 201 means "Created"
});
server.put("/hobbits/:id", (req, res) => {
  // PUT EXISTING HOBBIT
  // the id to update is in `req.params.id` and the desired name in `req.body.name`
  hobbits = hobbits.map((hob) =>
    hob.id == req.params.id ? { ...hob, name: req.body.name } : hob
  );
  res.status(200).json(hobbits);
});
server.delete("/hobbits/:id", (req, res) => {
  // DELETE EXISTING HOBBIT
  hobbits = hobbits.filter((hob) => hob.id != req.params.id);
  res.status(200).json(hobbits);
});

server.listen(8000, () => console.log("API running on port 8000"));
