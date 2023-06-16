import { useState, useEffect } from "react";
import Note from "./components/Note";
import Notification from "./components/Notification";
import axios from "axios";
import PersonItem from "./components/PersonItem";

const App = () => {
  // const [notes, setNotes] = useState([]);
  // const [newNote, setNewNote] = useState("");

  // useEffect(() => {
  //   axios.get("http://localhost:3001/notes").then((res) => {
  //     setNotes(res.data);
  //   });
  // }, []);

  // const addNote = (e) => {
  //   e.preventDefault();
  //   if (newNote) {
  //     const note = {
  //       id: Date.now(),
  //       content: newNote,
  //       important: false,
  //     };

  //     setNotes([...notes, note]);
  //     setNewNote("");
  //   }
  // };

  // const handleChange = (e) => {
  //   setNewNote(e.target.value);
  // };

  // const toggleImportance = (id) => {
  //   const url = `http://localhost:3001/notes/${id}`;
  //   const note = notes.find((n) => n.id === id);
  //   const changedNote = { ...note, important: !note.important };
  //   axios.put(url, changedNote).then((res) => {
  //     setNotes(notes.map((n) => (n.id !== id ? n : res.data)));
  //   });
  // };

  // mongodb+srv://codernot13:YNWzf622K09015Ii@react-blog.uvirfv8.mongodb.net/

  // -------------------- PHONEBOOK --------------- //

  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState("");
  const [errorMessage, setErrormessage] = useState(`some error happened...`);

  useEffect(() => {
    axios.get("http://localhost:5000/api/persons").then((res) => {
      setPersons(res.data);
    });
  }, []);

  const checkPerson = (p) => {
    return persons.find((person) => person.name === p);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleDele = (p) => {
    const res = window.confirm(`Delete ${p.name}?`);
    if (res) {
      setPersons(persons.filter((person) => person.id !== p.id));
      axios.delete(`http://localhost:5000/api/persons/${p.id}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName && newNumber) {
      const newPerson = {
        name: newName.charAt(0).toUpperCase() + newName.slice(1),
        number: newNumber,
      };
      if (checkPerson(newPerson.name)) {
        const findPerson = persons.find(
          (person) => person.name === newPerson.name
        );

        if (findPerson.number !== newPerson.number) {
          const res = window.confirm(
            `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
          );
          if (res) {
            setPersons(
              persons.map((p) => {
                if (p.name === newPerson.name) {
                  return { ...p, number: newPerson.number };
                }
                return p;
              })
            );
            axios
              .put(`http://localhost:5000/api/persons/${findPerson.id}`, {
                ...newPerson,
                number: newPerson.number,
              })
              .then((res) => console.log(res))
              .catch((err) => {
                console.log(err);
                setNotification(
                  `Information of ${newPerson.name} has already been removed from server.`
                );
                return;
              });
          }
        } else {
          return;
        }
        setNewName("");
        setNewNumber("");
        return;
      }

      axios.post("http://localhost:5000/api/persons", newPerson).then((res) => {
        setPersons([...persons, { ...res.data }]);
        setNewName("");
        setNewNumber("");
        setNotification(`Added ${res.data.name}!`);
        setTimeout(() => {
          setNotification(null);
        }, 2000);
      });
    }
  };

  const filteredPersons = persons.filter((person) => {
    return person.name.toLowerCase().includes(search);
  });

  const displayPersons = filteredPersons.map((person) => {
    return (
      <PersonItem person={person} key={person.id} handleDele={handleDele} />
    );
  });

  return (
    <div className="App">
      {/* <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleChange} />
        <button type="submit">save</button>
      </form> */}

      {/* /-------------------- PHONEBOOK --------------- */}

      <h1>Phonebook</h1>
      {notification && <Notification message={notification} />}
      <h3>Search Person:</h3>
      <input type="text" value={search} onChange={handleSearch} />
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <div>
          Name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
          <p>
            Number:{" "}
            <input
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
            />
          </p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>{displayPersons}</ul>
    </div>
  );
};

export default App;

// {
//   "notes": [
//     {
//       "id": 1,
//       "content": "HTML is easy",
//       "important": false
//     },
//     {
//       "id": 2,
//       "content": "Browser can execute only JavaScript",
//       "important": true
//     },
//     {
//       "id": 3,
//       "content": "GET and POST are the most important methods of HTTP protocol",
//       "important": false
//     }
//   ]
// }
