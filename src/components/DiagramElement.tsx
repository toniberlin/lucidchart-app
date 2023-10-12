import { useDrag } from 'react-dnd';
import ModelDiagramElement from '../models/ModelDiagramElement';


interface DiagramElementProps {
  element: ModelDiagramElement;
}

const DiagramElement: React.FC<DiagramElementProps> = ({ element }) => {
    console.log('Drag triggered: Element position:', element.id, element.x, element.y);
 const [ , drag] = useDrag(() => ({
    type: 'DIAGRAM_ELEMENT',
    item: element,
  }));
 

  return (
    <div
    ref={(node) => drag(node)}
      style={{
        width: '100px',
        height: '100px',
        background: 'blue',
        position: 'absolute',
        left: element.x,
        top: element.y,
      }}
    >
      {element.type}
    </div>
  );
};

export default DiagramElement;
