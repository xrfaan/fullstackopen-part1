import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>give feedback</h2>
      <Feedback
        responses={[
          { name: "good", action: () => setGood(good + 1) },
          { name: "neutral", action: () => setNeutral(neutral + 1) },
          { name: "bad", action: () => setBad(bad + 1) },
        ]}
      />
      <h2>statistics</h2>
      <Statistics stats={{ good, neutral, bad }} />
    </div>
  );
};

const Feedback = ({ responses }) => {
  return (
    <>
      {responses.map((response) => (
        <Button
          key={response.name}
          text={response.name}
          onClick={response.action}
        />
      ))}
    </>
  );
};

const Button = ({ text, onClick }) => {
  return (
    <button style={{ marginRight: 2 }} onClick={onClick}>
      {text}
    </button>
  );
};

const Statistics = ({ stats }) => {
  const statNames = Object.keys(stats);
  const all = sum(statNames.map((stat) => stats[stat]));
  const average =
    sum(
      statNames.map((stat) => {
        const factor = stat == "good" ? 1 : stat == "bad" ? -1 : 0;
        return stats[stat] * factor;
      })
    ) / all;
  const positive = `${(100 * stats["good"]) / all} %`;

  if (all == 0) return <p>No feedback given</p>;

  return (
    <table>
      <tbody>
        {statNames.map((stat) => (
          <StatisticLine text={stat} value={stats[stat]} key={stat} />
        ))}
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const sum = (arr) => arr.reduce((acc, a) => acc + a);

export default App;
