import { useState } from "react";
import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";
import Button from "./components/Button";
import DisplayStats from "./components/DisplayStats";
import NextAnecdote from "./components/NextAnecdote";
import Vote from "./components/Vote";

const App = () => {
  // const [good, setGood] = useState(0);
  // const [neutral, setNeutral] = useState(0);
  // const [bad, setBad] = useState(0);

  // const total = good + neutral + bad;

  // ANECDOTES -----------------------------------

  const [anecdotes, setAnectdotes] = useState([
    {
      id: 1,
      quote: "If it hurts, do it more often.",
      votes: 0,
    },
    {
      id: 2,
      quote: "Adding manpower to a late software project makes it later!",
      votes: 0,
    },
    {
      id: 3,
      quote:
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      votes: 0,
    },
    {
      id: 4,
      quote:
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      votes: 0,
    },
    {
      id: 5,
      quote: "Premature optimization is the root of all evil.",
      votes: 0,
    },
    {
      id: 6,
      quote:
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      votes: 0,
    },
    {
      id: 7,
      quote:
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
      votes: 0,
    },
    {
      id: 8,
      quote: "The only way to go fast, is to go well.",
      votes: 0,
    },
  ]);

  const [selected, setSelected] = useState(0);

  const updateVotes = () => {
    setAnectdotes(
      anecdotes.map((anecdote) => {
        if (anecdote.id === anecdotes[selected].id) {
          anecdotes[selected].votes += 1;
        }
        return anecdote;
      })
    );
  };

  const displayAnecdoteWithMostVotes = () => {
    const largest = anecdotes.reduce((acc, curVal) => {
      if (acc.votes > curVal.votes) {
        return acc;
      } else {
        return curVal;
      }
    });
    return largest;
  };

  return (
    <div>
      {/* <h1>Give Feedback</h1>
      <div>
        <Button text="good" handleClick={() => setGood(good + 1)} />
        <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
        <Button text="bad" handleClick={() => setBad(bad + 1)} />
      </div>
      <div>
        {total ? (
          <DisplayStats good={good} neutral={neutral} bad={bad} total={total} />
        ) : (
          <p>No feedback given</p>
        )}
      </div> */}
      <h1>Anecdote of the day</h1>
      {anecdotes[selected].quote}
      <p>has {anecdotes[selected].votes} votes.</p>
      <div style={{ display: "flex", gap: "5px" }}>
        <Vote handleClick={updateVotes} />
        <NextAnecdote
          handleClick={() =>
            setSelected(Math.floor(Math.random() * anecdotes.length))
          }
        />
      </div>
      <h2>Anecdote with most votes</h2>
      {displayAnecdoteWithMostVotes().votes !== 0 && (
        <div>{displayAnecdoteWithMostVotes().quote}</div>
      )}
    </div>
  );
};

export default App;
