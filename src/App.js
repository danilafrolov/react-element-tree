import React from "react";
import Tree from "./components/Tree.js";
import { data } from "./data/data.js";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Tree nodes={data} title="Tree"></Tree>
      </div>
    );
  }
}
export default App;
