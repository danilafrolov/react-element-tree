import React from "react";
import TreeNode from "./TreeNode";
import { clone, cloneDeep } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { Button } from "react-bootstrap";

class Tree extends React.Component {
  constructor(props) {
    super(props);
    const nodes = this.props.nodes ? cloneDeep(this.props.nodes) : [];
    this.state = {
      nodes: nodes,
      selectedNode: undefined,
    };
  }
  render() {
    const nodes = this.state.nodes.filter((node) => !node.parentId);
    return (
      <div className="tree-container">
        <h2>{this.props.title}</h2>
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
          <Button
            variant="outline-primary"
            size="sm"
            onClick={this.addNode.bind(this)}
          >
            Add
          </Button>{" "}
          <Button
            variant="outline-primary"
            size="sm"
            onClick={this.deleteNode.bind(this)}
          >
            {" "}
            Remove
          </Button>{" "}
          <Button
            variant="outline-primary"
            size="sm"
            onClick={this.editNode.bind(this)}
          >
            Edit
          </Button>{" "}
          <Button
            variant="outline-primary"
            size="sm"
            onClick={this.resetData.bind(this)}
          >
            Reset
          </Button>{" "}
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    // if copy node is changed in props, insert it into nodes' collection
    if (
      this.props.copyNode &&
      (!prevProps.copyNode || this.props.copyNode.id !== prevProps.copyNode.id)
    ) {
      this.insertCopyNode(this.props.copyNode);
    }
  }

  selectNode(node) {
    let prevCopy; // copy of previous selected node
    let nodes = this.state.nodes;
    if (this.state.selectedNode) {
      const prevSelected = nodes.find(
        (item) => item.id === this.state.selectedNode.id
      );
      prevCopy = clone(prevSelected);
      prevCopy.selected = false;
    }

    let currentCopy = clone(node);
    // node is selected when the previous selected node is 'undefined' or previous node wasn't the same one
    currentCopy.selected = !prevCopy || currentCopy.id !== prevCopy.id;
    if (!currentCopy.selected) {
      currentCopy = undefined;
    }

    nodes = nodes.map((node) => {
      if (currentCopy && currentCopy.selected && node.id === currentCopy.id) {
        return currentCopy;
      } else if (prevCopy && node.id === prevCopy.id) {
        return prevCopy;
      } else {
        return node;
      }
    });

    this.setState(() => ({
      nodes: nodes,
      selectedNode: currentCopy,
    }));

    if (this.props.setSelectedNode) {
      this.props.setSelectedNode(currentCopy);
    }
  }

  addNode() {
    let nodes = this.state.nodes;
    const orderNumber = nodes.length + 1;
    const id = uuidv4();
    const item = {
      id: id,
      name: "Node" + orderNumber,
    };
    if (this.state.selectedNode) {
      item.parentId = this.state.selectedNode.id;
    }
    nodes = nodes.concat(item);
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
      let nodes = this.state.nodes;
      const selectedNode = nodes.find(
        (node) => node.id === this.state.selectedNode.id
      );
      let copy = clone(selectedNode);
      copy.name = name;
      nodes = nodes.map((node) => {
        if (node.id === selectedNode.id) {
          return copy;
        } else {
          return node;
        }
      });
      this.updateState(nodes);
    }
  }

  deleteNode() {
    if (!this.state.selectedNode) {
      return;
    }
    const selectedNodeId = this.state.selectedNode.id;

    let nodes = this.state.nodes;
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

  resetData() {
    const nodes = this.props.nodes ? cloneDeep(this.props.nodes) : [];
    this.setState(() => ({
      nodes: nodes,
      selectedNode: undefined,
    }));
  }

  insertCopyNode(copyNode) {
    let nodes = this.state.nodes;
    if (nodes.some((node) => node.id === copyNode.id)) {
      alert("Node with the same ID already exists");
      return;
    }
    // if parentId is set, but there is no node with this id,
    // parentId becomes 'undefined' and node becomes upper level node
    if (
      copyNode.parentId &&
      !nodes.some((node) => node.id === copyNode.parentId)
    ) {
      copyNode.parentId = undefined;
    }
    nodes = nodes.concat(copyNode);
    this.updateState(nodes);
  }

  updateState(nodes) {
    this.setState(() => ({
      nodes: nodes,
    }));
  }

  /**
   * Get the first children of node
   * @param nodeId node's identifier
   */
  getChildren(nodeId) {
    const items = this.state.nodes;
    return items.filter((i) => i.parentId === nodeId);
  }

  /**
   * Get all descendants of node
   * @param nodeId node's identifier
   * @param nodes nodes' collection
   */
  getAllDescendants(nodeId, nodes) {
    let children = [];
    children.push(...nodes.filter((node) => node.parentId === nodeId));
    children.forEach((item) => {
      children.push(...this.getAllDescendants(item.id, nodes));
    });
    return children;
  }
}

export default Tree;
