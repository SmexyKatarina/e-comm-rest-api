import './App.css';

function App() {

  const sendReq = async (path) => {
    await fetch(path, {
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      }
    })
    .then(res => res.json())
    .then(response => document.getElementById("output").innerHTML = JSON.stringify(response))
    .catch(err => console.log("Error: " + err));
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => { sendReq("/api/category/0"); }}>Send Req</button>
        <h3>Text output:</h3>
        <p id="output"></p>
      </header>
    </div>
  );
}

export default App;
