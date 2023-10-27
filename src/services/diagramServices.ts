export const createRectangle = () => {
    return {
      id: Date.now().toString(),
      type: 'rectangle',
      x: 200,
      y: 200,
    };
};

export const createCircle = () => {
    return {
      id: Date.now().toString(),
      type: 'circle',
      x: 200,
      y: 200,
    };
};