import React from 'react';
import { useState } from 'react';

function DrgDrpOnMosEv() {

  const [itemArr, setItemArr] = useState(
    [
      { id: 'item-1', name: 'Item 1', bcColor: '#1d5cb3' },
      { id: 'item-2', name: 'Item 2', bcColor: '#2a6948' },
      { id: 'item-3', name: 'Item 3', bcColor: '#b72828' },
      { id: 'item-4', name: 'Item 4', bcColor: '#8c8c4a' },
      { id: 'item-5', name: 'Item 5', bcColor: 'brown' },
      { id: 'item-6', name: 'Item 6', bcColor: 'purple' },
      { id: 'item-7', name: 'Item 7', bcColor: '#a74e5d' },
      { id: 'item-8', name: 'Item 8', bcColor: '#245869' },
      { id: 'item-9', name: 'Item 9', bcColor: '#595d49' },
      { id: 'item-10', name: 'Item 10', bcColor: '#5bc3de' },
      { id: 'item-11', name: 'Item 11', bcColor: '#1c3556' },
      { id: 'item-12', name: 'Item 12', bcColor: '#394c12' },
      { id: 'item-13', name: 'Item 13', bcColor: 'orange' },
      { id: 'item-14', name: 'Item 14', bcColor: 'purple' },
      { id: 'item-15', name: 'Item 15', bcColor: '#921149' }
    ]
  );
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isMouseMove, setIsMouseMove] = useState(false);
  const [currMovingItemId, setCurrMovingItemId] = useState(null);
  const [pointerDiff, setPointerDiff] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 100, height: 100 });

  const handleMouseMove = ev => {
    if (isMouseDown) {
      const switchWithItemId = ev.target.getAttribute('data-drag');
      setIsMouseMove(true);
      if (switchWithItemId) setPointerDiff({ x: ev.nativeEvent.offsetX - size.width / 2, y: ev.nativeEvent.offsetY - size.height / 2 });
      else setPointerDiff({ x: pointerDiff.x + ev.movementX, y: pointerDiff.y + ev.movementY });
      if (switchWithItemId && switchWithItemId !== currMovingItemId) {
        const currMovingIdx = itemArr.findIndex(item => item.id === currMovingItemId);
        const currOnIdx = itemArr.findIndex(item => item.id === switchWithItemId);
        setItemArr(replaceTwoIndexInArray(itemArr, currMovingIdx, currOnIdx));
      }
    }
  }

  const handleMouseDown = ev => {
    setCurrMovingItemId(ev.target.getAttribute('data-drag'));
    setIsMouseDown(true);
    setSize({ width: ev.target.offsetWidth, height: ev.target.offsetHeight });
    setPointerDiff({ x: ev.nativeEvent.offsetX - ev.target.offsetWidth / 2, y: ev.nativeEvent.offsetY - ev.target.offsetHeight / 2 });
  }

  const replaceTwoIndexInArray = (arr, fromIndex, toIndex) => {
    let newArr = [...arr];
    newArr.splice(fromIndex, 1);
    newArr.splice(toIndex, 0, arr[fromIndex]);
    return newArr;
  }
  const handleMouseUpOrLeave = () => {
    setIsMouseMove(false);
    setIsMouseDown(false);
    setCurrMovingItemId(null);
  };

  const list = itemArr.map(item => {
    const isDragging = currMovingItemId === item.id;
    return <div className={`item ${isDragging ? 'dragging' : ''}`} key={item.id}
      data-drag={item.id} style={{ backgroundColor: `${item.bcColor}` }} onMouseDown={handleMouseDown}>
      <span>{item.name}</span>
      {isMouseDown && isDragging && isMouseMove &&
        <div className="item-clone"
          style={{
            height: `${size.height}px`, width: `${size.width}px`,
            transform: `translate(${pointerDiff.x}px, ${pointerDiff.y}px)`,
            backgroundColor: `${item.bcColor}`
          }}>
          <span className="item dragging">{item.name}</span>
        </div>
      }
    </div>
  })

  return (
    <div className="DrgDrpOnMosEv" onMouseLeave={handleMouseUpOrLeave} onMouseUp={handleMouseUpOrLeave}>
      <h2>Is Mouse Down: {isMouseDown ? 'True' : 'False'}</h2>
      <div className="grid-drag-drop" onMouseMove={handleMouseMove}>
        {list}
      </div>
    </div>
  );
}

export default DrgDrpOnMosEv;
