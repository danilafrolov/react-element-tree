import React from "react";
import "../styles/Style.css";

class TreeNode extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const children = this.props.children;
    if (children) {
      return (
        <div className="Tree-node">
          <div>{this.props.name}</div>
          <div className="Tree-node-child">
            {children.map((node) => (
              <TreeNode
                key={node.id}
                name={node.name}
                children={node.children}
              ></TreeNode>
            ))}
          </div>
        </div>
      );
    } else {
      return <div className="Tree-node">{this.props.name}</div>;
    }
  }
}

export default TreeNode;
