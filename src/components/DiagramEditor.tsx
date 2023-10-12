import React, { useState } from 'react';
import ModelDiagramElement from '../models/ModelDiagramElement';
import DiagramElement from './DiagramElement';
import {useDrop } from 'react-dnd';


export interface DiagramEditorProps {
  // Define any necessary props here
}


const DiagramEditor: React.FC<DiagramEditorProps> = (props) => {
  // State to keep track of diagram elements
  const [elements, setElements] = useState<ModelDiagramElement[]>([]);

  // Function to handle adding new elements
  const addElement = (element: ModelDiagramElement) => {
    setElements((prevElements) => [...prevElements, element]);
  };

  // Implement other necessary functions and UI here
  const handleAddRectangle = () => {
    const newRectangle: ModelDiagramElement = {
      id: Date.now().toString(),
      type: 'rectangle',
      x: 200,
      y: 200,
    };
    addElement(newRectangle);
  };

  const updateElementPosition = (droppedElement: ModelDiagramElement, newX: number, newY: number) => {
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
    drop: (droppedItem: ModelDiagramElement, monitor) => {
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

 

  return (
    <div 
    ref={(node) => {
      drop(node);
    }}
    
    style={{ position: 'relative', width: '1000px', height: '1200px', border: '1px solid #ccc' }}>
      <h2>Diagram Editor</h2>
      <button onClick={handleAddRectangle}>Add Rectangle</button>
      {/* Render your diagram elements and interaction UI */}
      {elements.map((element) => {
        return (
        <DiagramElement 
        key={element.id} 
        element={element}
        />
      );
      })}
      </div>
    );
};

export default DiagramEditor;
