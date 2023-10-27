import { useDrag } from 'react-dnd';
import { ElementType } from '../types/elementTypes';
import './styles/elementStyles.css';
interface DiagramElementProps {
  key: string;
  element: ElementType;
}

  const DiagramElement = ({ element }: DiagramElementProps): JSX.Element => {
      console.log('Drag triggered: Element position:', element.id, element.x, element.y);
    const [ , drag] = useDrag(() => ({
      type: 'DIAGRAM_ELEMENT',
      item: element,
  }));
 
  const elementStlye = {
    left: element.x,
    top: element.y,
  };

  return (
    <div
      ref={(node) => drag(node)}
      className={`${element.type}`} // Each element can have a default style based on the type (see the CSS file)
      style={elementStlye} // But they can be styled individually as well. This styling will overwrite the CSS
    >
      {element.type}
    </div>
  );
};

export default DiagramElement;
