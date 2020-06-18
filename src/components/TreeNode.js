import React from "react";
import "../styles/Style.css";

class TreeNode extends React.Component {
  constructor(props) {
    super(props);
    this.select = this.select.bind(this);
  }
  render() {
    const children = this.props.getChildren(this.props.node.id);
    const className = this.props.node.selected
      ? "tree-node-selected"
      : "tree-node";
    return (
      <div className="tree-node">
        <div className={className} onClick={this.select}>
          {this.props.node.name}
        </div>
        {children && (
          <div className="tree-node-child">
            {children.map((node) => (
              <TreeNode
                key={node.id}
                node={node}
                selected={false}
                getChildren={this.props.getChildren}
                onClick={this.props.onClick}
              ></TreeNode>
            ))}
          </div>
        )}
      </div>
    );
  }
  select() {
    this.props.onClick(this.props.node);
  }
}

export default TreeNode;
