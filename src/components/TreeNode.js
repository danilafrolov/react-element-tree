import React from "react";
import "../styles/Style.css";

class TreeNode extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const children = this.props.children;
    return (
      <div className="Tree-node">
        <div onClick={this.select.bind(this)}>{this.props.name}</div>
        {children && (
          <div className="Tree-node-child">
            {children.map((node) => (
              <TreeNode
                key={node.id}
                name={node.name}
                children={node.children}
              ></TreeNode>
            ))}
          </div>
        )}
      </div>
    );
  }
  }
}

export default TreeNode;
