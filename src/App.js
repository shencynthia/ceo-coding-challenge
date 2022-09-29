import "./App.css";
import { useState, useEffect } from "react";

function App() {
  var [data, setData] = useState([]);
  const [time, setTime] = useState('');
  const [disclaimer, setDisclaimer] = useState('');
  var [chartName, setChartName] = useState('');
  const array = []
  function getData(){
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then((response) => {
      return response.json();
    }).then((newData) => {
      const obj = newData.bpi
      var result = Object.keys(obj).map((key) => [String(key), obj[key]]);
      for(let i = 0; i < result.length; i++){
          array.push(result[i][1])
      }
      setData(array)
      setTime(newData.time.updated)
      setDisclaimer(newData.disclaimer)
      setChartName(newData.chartName)
      console.log(array)
  }, []);
  }

  function sortAscendingRate(){
    var newArray = data.sort((a, b) => b.rate_float - a.rate_float);
    data = [...newArray]
    setData(data)
  }
  function sortDescendingRate(){
    var newArray = data.sort((b, a) => b.rate_float - a.rate_float);
    data = [...newArray]
    setData(data)
  }

  function sortAscendingCode(){
    var newArray = data.sort((a, b) => a.code.localeCompare(b.code));
    data = [...newArray]
    setData(data)
  }

  function sortDescendingCode(){
    var newArray = data.sort((b, a) => a.code.localeCompare(b.code));
    data = [...newArray]
    setData(data)
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
    <div className="App">
      <div> 
      <table>
      <caption>
        <h1>{chartName}</h1>
        <div>Last Updated: {time}</div>
        </caption>
        <tr>
          <th> Code <button onClick={sortAscendingCode}>&#11014;</button><button onClick={sortDescendingCode}>&#11015;</button></th>
          <th>Description</th>
          <th>Rate</th>
          <th>Rate Float<button onClick={sortAscendingRate}>&#11014;</button><button onClick={sortDescendingRate}>&#11015;</button></th>
          <th>Symbol</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.code}</td>
              <td>{val.description}</td>
              <td>{val.rate}</td>
              <td>{val.rate_float}</td>
              <td>{val.symbol}</td>

            </tr>
          );
        })}
        <caption class="disclaimer">
          {disclaimer}
        <div><button onClick={getData}>Update</button> </div>
        </caption>

      </table>
    </div>
    </div>
      </>
  );

}

export default App;