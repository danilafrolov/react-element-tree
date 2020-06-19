import React from "react";
import Tree from "./components/Tree.js";
import { data } from "./data/data.js";
import clone from "lodash/clone";
import { Button } from "react-bootstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedNode: undefined, copyNode: undefined };
  }
  render() {
    return (
      <div className="App">
        <Tree
          nodes={data}
          title="Tree"
          setSelectedNode={this.setSelectedNode}
        ></Tree>
        <div className="tree-container">
          <Button
            variant="primary"
            className="tree-container-button"
            onClick={this.copySelectedNode}
          >
            Copy
          </Button>
        </div>
        <Tree title="Tree" copyNode={this.state.copyNode}></Tree>
      </div>
    );
  }

  setSelectedNode = (node) => {
    this.setState(() => ({ selectedNode: node }));
  };

  copySelectedNode = () => {
    if (!this.state.selectedNode) {
      return;
    }
    let copyNode = clone(this.state.selectedNode);
    copyNode.selected = false;
    this.setState(() => ({ copyNode: copyNode }));
  };
}
export default App;
