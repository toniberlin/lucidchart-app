import React, { useState } from 'react';
import DiagramElement from './DiagramElement';
import { ElementType, ELEMENT_TYPES } from '../types/elementTypes';
import {useDrop } from 'react-dnd';
import { createRectangle, createCircle } from '../services/diagramServices';
import './styles/diagramEditor.css';

const DiagramEditor = (): JSX.Element => { 
  // State to keep track of diagram elements
  const [elements, setElements] = useState<ElementType[]>([]);

  // Function to handle adding new elements
  const addElement = (element: ELEMENT_TYPES) => {
    let newElement: ElementType;

    switch (element) {
      case ELEMENT_TYPES.RECTANGLE:
        newElement = createRectangle();
        break;
      case ELEMENT_TYPES.CIRCLE:
        newElement = createCircle();
        break;
      default:
        break;
    }
    setElements((prevElements) => [...prevElements, newElement]);
  };

  // Implement other necessary functions and UI here
  const updateElementPosition = (droppedElement: ElementType, newX: number, newY: number) => {
    console.log('Update element position triggered:', droppedElement);
    setElements((prevElements) => {
      return prevElements.map((element) => {
        //console.log('prevElements + element:', prevElements, element)
         if (element.id === droppedElement.id) {
          //console.log('true')
          return { ...element, x: newX, y: newY };
        }
        return element;
      });
    });
  };


  const [, drop] = useDrop({
    accept: 'DIAGRAM_ELEMENT',
    drop: (droppedItem: ElementType, monitor) => {
      console.log('Drop triggered' );
      // Access the last mouse position when the drag finishes
      const lastMousePosition = monitor.getClientOffset();
      const isOver = monitor.isOver();
      
      if (lastMousePosition && isOver) { 
        updateElementPosition(droppedItem, lastMousePosition.x, lastMousePosition.y);
        console.log('Last Mouse Position:', lastMousePosition);
      }
      
    },
  });

  const renderElements = () => {
    return elements.map((elem, index) => {
      return (
        <DiagramElement 
          key={elem.id}
          element={elem}
        />
      );
    });
  }

   // Render your diagram elements and interaction
  return (
    <div className='diagramWrapper'>
      <div className='diagramContainer'
          ref={(node) => {
            drop(node);
          }}
      >
        <h2 className='diagramTitle'>Diagram Editor</h2>
        <button className='addElementButton' onClick={() => addElement(ELEMENT_TYPES.RECTANGLE)}>Add Rectangle</button>
        <button className='addElementButton' onClick={() => addElement(ELEMENT_TYPES.CIRCLE)}>Add Circle</button>
        {renderElements()}
      </div>
    </div>
  );
};

export default DiagramEditor;
