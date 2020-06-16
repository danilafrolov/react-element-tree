import React from "react";
import TreeNode from "./TreeNode";

class Tree extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "Tree" };
  }
  render() {
    const nodes = this.getNodes();
    return (
      <div>
        <h1>{this.state.title}</h1>
        <div>
          {nodes.map((node) => (
            <TreeNode name={node.name}></TreeNode>
          ))}
        </div>
      </div>
    );
  }

  getNodes() {
    const nodes = [
      {
        id: 1,
        name: "Node1",
      },
      {
        id: 2,
        name: "Node2",
      },
      {
        id: 3,
        name: "Node3",
      },
    ];
    return nodes;
  }
}

export default Tree;
