import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [freq, setFreq] = useState(undefined);
  const [yAxis, setYAxis] = useState([]);

  const fetchNumbers = async () => {
    const url =
      "https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new";

    const result = await fetch(url);
    let data = await result.text();
    data = data.split("\n").filter(Boolean);
    const map = {};
    data.forEach((item) => {
      if (map[item]) {
        map[item] = map[item] + 1;
      } else {
        map[item] = 1;
      }
    });
    setFreq(map);
    console.log("data ", map);
  };

  useEffect(() => {
    if (freq) {
      console.log("data ", Math.max(...Object.values(freq)));
      const max = Math.max(...Object.values(freq));
      const maxVal = Math.ceil(max / 10) * 10;
      console.log("data ", maxVal);
      let arr = [];
      for (let i = maxVal / 10; i >= 0; i--) {
        arr.push(i * 10);
      }
      console.log("dataarr ", arr);
      setYAxis(arr);
    }
  }, [freq]);

  useEffect(() => {
    fetchNumbers();
  }, []);

  freq &&
    Object.entries(freq).map(([key, val]) => {
      console.log("itemitem ", key);
      console.log("itemitem ", val);
    });

  return (
    <div className="App">
      <div className="container">
        <div className="box">
          <div
            className="box-y-axis"
            style={{ height: `${yAxis && yAxis[0]}%` }}
          >
            {yAxis?.map((item, idx) => (
              <div key={idx}>{item}</div>
            ))}
          </div>

          {freq &&
            Object.entries(freq)?.map(([key, val]) => (
              <div className="box-x-axis">
                <div style={{ height: `${val}%` }} className="graph"></div>
                <div className="index">{key}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
