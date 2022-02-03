import React from 'react';
import { observer } from 'mobx-react';
import store from '../stores/store';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProvided,
  DroppableStateSnapshot
} from 'react-beautiful-dnd';

const grid = 8;

// a little function to help us with reordering the result
const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = (isDraggingOver: any) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

const onDragEnd = (result: any) => {
  // dropped outside the list
  if (!result.destination) {
    return;
  }

  const items = reorder(
    store.games,
    result.source.index,
    result.destination.index
  );

  store.setGames(items);
}

interface IWrapperProps {
  provided: DroppableProvided,
  snapshot: DroppableStateSnapshot,
}

const Wrapper = observer(({ provided, snapshot }: IWrapperProps): JSX.Element => (
  <div
    {...provided.droppableProps}
    ref={provided.innerRef}
    style={getListStyle(snapshot.isDraggingOver)}
  >
    {store.games.map((item, index) => (
      <Draggable key={item.id} draggableId={item.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          >
            {item.id}
            {/*{item.name}*/}
            {/*{item.iconUrl}*/}
          </div>
        )}
      </Draggable>
    ))}
    {provided.placeholder}
  </div>
));

export default observer((): JSX.Element => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="droppable">
      {
        (provided, snapshot) => (
          <Wrapper provided={provided} snapshot={snapshot} />
        )
      }
    </Droppable>
  </DragDropContext>
));
