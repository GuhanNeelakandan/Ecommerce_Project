import React, { useState } from 'react';
import './DropAndDrag.css'; // Create and import your own styles
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

// Sample data
const initialItems = [
 
];

const DropAndDrag = () => {
  const [items, setItems] = useState([
    { id: 'item-1', content: 'Item 1' },
    { id: 'item-2', content: 'Item 2' },
    { id: 'item-3', content: 'Item 3' },
    { id: 'item-4', content: 'Item 4' },
  ]);
  console.log(items)

  const handleOnDragEnd = (result) => {
    console.log(result)
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);

    setItems(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
    <Droppable droppableId="droppable-1-2">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{ padding: '8px', width: '250px', backgroundColor: '#f0f0f0' }}
        >
          {items.length>0 && items.map((item, index) => (
            <Draggable key={item?.id} draggableId={item?.id} index={index} >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    userSelect: 'none',
                    padding: '16px',
                    margin: '0 0 8px 0',
                    minHeight: '50px',
                    backgroundColor: '#fff',
                    color: '#333',
                    ...provided.draggableProps.style,
                  }}
                  draggable
                >
                  {item.content}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
      );
};

export default DropAndDrag;
