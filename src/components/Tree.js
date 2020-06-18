import React from "react";
import TreeNode from "./TreeNode";
import cloneDeep from "lodash/cloneDeep";

class Tree extends React.Component {
  constructor(props) {
    super(props);
    let nodes = cloneDeep(this.props.nodes);
    this.state = {
      nodes: this.flatNodes(nodes),
      selectedNode: undefined,
    };
    this.getNextId = this.getNextId.bind(this);
  }
  render() {
    const nodes = this.state.nodes.filter((node) => !node.parentId);
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div className="tree">
          {nodes.map((node) => (
            <TreeNode
              key={node.id}
              node={node}
              selected={false}
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
    const id = this.getNextId();
    const item = {
      id: id,
      name: "Node" + id,
    };
    const nodes = cloneDeep(this.state.nodes);
    if (this.state.selectedNode) {
      const selectedId = this.state.selectedNode.id;
      const selected = nodes.find((node) => node.id === selectedId);
      if (selected) {
        if (!selected.children) {
          selected.children = [];
        }
        item.parentId = selected.id;
        selected.children.push(item);
      }
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

  deleteNode(node) {
    if (!this.state.selectedNode) {
      return;
    }
    const parentId = this.state.selectedNode.parentId;
    let nodes = cloneDeep(this.state.nodes);
    if (parentId) {
      // if parentId is set, this is inner level node
      const parent = nodes.find((node) => node.id === parentId);
      if (parent) {
        parent.children = parent.children.filter(
          (node) => node.id !== this.state.selectedNode.id
        );
      }
    } else {
      // upper level node
      nodes = nodes.filter((node) => node.id !== this.state.selectedNode.id);
    }
    this.updateState(nodes);
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

  flatNodes(nodes) {
    const flat = [];
    nodes.forEach((item) => {
      flat.push(item);
      if (Array.isArray(item.children)) {
        flat.push(...this.flatNodes(item.children));
      }
    });
    return flat;
  }

  getNextId() {
    const items = this.state.nodes;
    if (items) {
      const id = Math.max(...items.map((i) => i.id)) + 1;
      return id;
    }
    return 0;
  }
}

export default Tree;
