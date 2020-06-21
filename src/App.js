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
          resetSelectedNode={this.resetSelectedNode}
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
        <Tree
          title="Tree"
          copyNode={this.state.copyNode}
          resetCopyNode={this.resetCopyNode}
        ></Tree>
      </div>
    );
  }

  /**
   * Set selected node from the first tree
   * @param node - selected node from the first tree
   */
  setSelectedNode = (node) => {
    this.setState(() => ({ selectedNode: node }));
  };

  /**
   * Copy selected node to the second tree (passed as props)
   */
  copySelectedNode = () => {
    if (!this.state.selectedNode) {
      return;
    }
    let copyNode = clone(this.state.selectedNode);
    copyNode.selected = false;
    this.setState(() => ({ copyNode: copyNode }));
  };

  resetSelectedNode = () => {
    this.setState(() => ({ selectedNode: undefined }));
  };

  resetCopyNode = () => {
    this.setState(() => ({ copyNode: undefined }));
  };
}
export default App;
