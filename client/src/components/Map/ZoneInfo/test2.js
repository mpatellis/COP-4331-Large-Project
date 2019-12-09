import React, { Component } from 'react';
import styled from 'styled-components';
import Tree, {
  mutateTree,
  moveItemOnTree,
  RenderItemParams,
  TreeItem,
  TreeData,
  ItemId,
  TreeSourcePosition,
  TreeDestinationPosition,
} from '@atlaskit/tree';

const PADDING_PER_LEVEL = 16;

const PreTextIcon = styled.span`
  display: inline-block;
  width: 16px;
  justify-content: center;
  cursor: pointer;
`;

type State = {
  tree: TreeData;
};

const getIcon = (
  item: TreeItem,
  onExpand: (itemId: ItemId) => void,
  onCollapse: (itemId: ItemId) => void,
) => {
  if (item.children && item.children.length > 0) {
    return item.isExpanded ? (
      <PreTextIcon onClick={() => onCollapse(item.id)}>-</PreTextIcon>
    ) : (
      <PreTextIcon onClick={() => onExpand(item.id)}>+</PreTextIcon>
    );
  }
  return <PreTextIcon>&bull;</PreTextIcon>;
};

export default class PureTree extends Component<void, State> {
  state = {
    tree:  {
      rootId: '1',
      items: {
        '1': {
          id: '1',
          children: ['1-1', '1-2'],
          hasChildren: true,
          isExpanded: true,
          isChildrenLoading: false,
          data: {
            title: 'root',
          },
        },
        '1-1': {
          id: '1-1',
          children: ['1-1-1', '1-1-2'],
          hasChildren: true,
          isExpanded: true,
          isChildrenLoading: false,
          data: {
            title: 'First parent',
          },
        },
        '1-2': {
          id: '1-2',
          children: ['1-2-1', '1-2-2'],
          hasChildren: true,
          isExpanded: true,
          isChildrenLoading: false,
          data: {
            title: 'Second parent',
          },
        },
        '1-1-1': {
          id: '1-1-1',
          children: [],
          hasChildren: false,
          isExpanded: false,
          isChildrenLoading: false,
          data: {
            title: 'Child one',
          },
        },
        '1-1-2': {
          id: '1-1-2',
          children: [],
          hasChildren: false,
          isExpanded: false,
          isChildrenLoading: false,
          data: {
            title: 'Child two',
          },
        },
        '1-2-1': {
          id: '1-2-1',
          children: [],
          hasChildren: false,
          isExpanded: false,
          isChildrenLoading: false,
          data: {
            title: 'Child three',
          },
        },
        '1-2-2': {
          id: '1-2-2',
          children: [],
          hasChildren: false,
          isExpanded: false,
          isChildrenLoading: false,
          data: {
            title: 'Child four',
          },
        },
      },
    }
  };

  renderItem = ({ item, onExpand, onCollapse, provided }: RenderItemParams) => {
    return (
      <div
        style={{color: "#FF0024"}}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <span>{getIcon(item, onExpand, onCollapse)}</span>
        <span style={{background: "#FF0024",  height: "20vh"}}>{item.data ? item.data.title : ''}</span>
      </div>
    );
  };

  onExpand = (itemId: ItemId) => {
    const { tree }: State = this.state;
    this.setState({
      tree: mutateTree(tree, itemId, { isExpanded: true }),
    });
  };

  onCollapse = (itemId: ItemId) => {
    const { tree }: State = this.state;
    this.setState({
      tree: mutateTree(tree, itemId, { isExpanded: false }),
    });
  };

  onDragEnd = (
    source: TreeSourcePosition,
    destination?: TreeDestinationPosition,
  ) => {
    const { tree } = this.state;

    if (!destination) {
      return;
    }
    const newTree = moveItemOnTree(tree, source, destination);
    this.setState({
      tree: newTree,
    });
  };

  render() {
    const { tree } = this.state;

    return (
      <Tree
        tree={tree}
        renderItem={this.renderItem}
        onExpand={this.onExpand}
        onCollapse={this.onCollapse}
        onDragEnd={this.onDragEnd}
        offsetPerLevel={PADDING_PER_LEVEL}
        isDragEnabled
        isCombineEnabled
      />
    );
  }
}