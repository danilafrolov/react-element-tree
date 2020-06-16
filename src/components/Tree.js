import React from "react";
import TreeNode from "./TreeNode";

class Tree extends React.Component {
  render() {
    const nodes = this.props.nodes;
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div>
          {nodes.map((node) => (
            <TreeNode
              key={node.id}
              name={node.name}
              children={node.children}
            ></TreeNode>
          ))}
        </div>
      </div>
    );
  }
}

export default Tree;
