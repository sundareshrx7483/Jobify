import { useState } from "react";
import Wrapper from "../assets/wrappers/ChartsContainer";
import AreaChart from "./Charts/AreaChart.jsx";
import BarChart from "./Charts/BarChart.jsx";

const ChartsContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true);

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button onClick={() => setBarChart(!barChart)}>
        {barChart ? "area chart" : "bar chart"}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};

export default ChartsContainer;