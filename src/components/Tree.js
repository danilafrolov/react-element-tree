import React from "react";
import TreeNode from "./TreeNode";
import cloneDeep from "lodash/cloneDeep";

class Tree extends React.Component {
  constructor(props) {
    super(props);
    const nodes = this.props.nodes ? cloneDeep(this.props.nodes) : [];
    this.state = {
      nodes: nodes,
      selectedNode: undefined,
    };
    this.getNextId = this.getNextId.bind(this);
  }
  render() {
    const nodes = this.state.nodes.filter((node) => !node.parentId);
    return (
      <div className="tree-container">
        <h1>{this.props.title}</h1>
        <div className="tree">
          {nodes.map((node) => (
            <TreeNode
              key={node.id}
              node={node}
              selected={false}
              getChildren={this.getChildren.bind(this)}
              onClick={this.selectNode.bind(this)}
            ></TreeNode>
          ))}
        </div>
        <div>
          <button className="button" onClick={this.addNode.bind(this)}>
            Add
          </button>
          <button className="button" onClick={this.deleteNode.bind(this)}>
            Remove
          </button>
          <button className="button" onClick={this.editNode.bind(this)}>
            Edit
          </button>
          <button className="button" onClick={this.resetData.bind(this)}>
            Reset
          </button>
        </div>
      </div>
    );
  }

  selectNode(node) {
    if (this.state.selectedNode) {
      const items = this.state.nodes;
      const selectedItem = items.find(
        (item) => item.id === this.state.selectedNode.id
      );
      if (selectedItem) {
        selectedItem.selected = false;
      }
    }
    node.selected = true;
    this.setState(() => ({ selectedNode: node }));
  }

  addNode() {
    const nodes = cloneDeep(this.state.nodes);
    const id = this.getNextId();
    const item = {
      id: id,
      name: "Node" + id,
    };
    if (this.state.selectedNode) {
      item.parentId = this.state.selectedNode.id;
    }
    nodes.push(item);
    this.updateState(nodes);
  }

  editNode() {
    if (!this.state.selectedNode) {
      return;
    }
    let name = prompt(
      "Type the new name for selected item:",
      this.state.selectedNode.name
    );
    if (name) {
      const nodes = cloneDeep(this.state.nodes);
      const selectedNode = nodes.find(
        (node) => node.id === this.state.selectedNode.id
      );
      if (selectedNode) {
        selectedNode.name = name;
      }
      this.updateState(nodes);
    }
  }

  deleteNode() {
    if (!this.state.selectedNode) {
      return;
    }
    const selectedNodeId = this.state.selectedNode.id;

    let nodes = cloneDeep(this.state.nodes);
    const selectedNode = nodes.find((node) => node.id === selectedNodeId);
    if (!selectedNode) {
      return;
    }
    const descendants = this.getAllDescendants(selectedNodeId, nodes);
    const deletedNodes = [selectedNode, ...descendants];
    nodes = nodes.filter((node) => !deletedNodes.includes(node));
    this.setState(() => ({
      nodes: nodes,
      selectedNode: undefined,
    }));
  }

  getAllDescendants(nodeId, nodes) {
    let children = [];
    children.push(...nodes.filter((node) => node.parentId === nodeId));
    children.forEach((item) => {
      children.push(...this.getAllDescendants(item.id, nodes));
    });
    return children;
  }

  resetData() {
    const nodes = cloneDeep(this.props.nodes);
    this.setState(() => ({
      nodes: nodes,
      selectedNode: undefined,
    }));
  }

  updateState(nodes) {
    this.setState(() => ({
      nodes: nodes,
    }));
  }

  getChildren(nodeId) {
    const items = this.state.nodes;
    return items.filter((i) => i.parentId === nodeId);
  }

  getNextId() {
    const items = this.state.nodes;
    if (!items || items.length === 0) {
      return 0;
    }
    const id = Math.max(...items.map((i) => i.id)) + 1;
    return id;
  }
}

export default Tree;
