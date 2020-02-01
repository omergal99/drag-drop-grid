import React from 'react';
import { useState } from 'react';

function DrgDrpDrgEv() {

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
  const [currMovingItemId, setCurrMovingItemId] = useState(null);

  const handleDragStart = ev => {
    setCurrMovingItemId(ev.target.getAttribute('data-drag'));
  }
  const handleDragEnter = ev => {
    const switchWithItemId = ev.target.getAttribute('data-drag');
    if (switchWithItemId && switchWithItemId !== currMovingItemId) {
      const currMovingIdx = itemArr.findIndex(item => item.id === currMovingItemId);
      const currOnIdx = itemArr.findIndex(item => item.id === switchWithItemId);
      setItemArr(replaceTwoIndexInArray(itemArr, currMovingIdx, currOnIdx));
    }
  };
  const handleDragOver = ev => ev.preventDefault();
  const handleDragEnd = () => setCurrMovingItemId(null);

  const replaceTwoIndexInArray = (arr, fromIndex, toIndex) => {
    let newArr = [...arr];
    newArr.splice(fromIndex, 1);
    newArr.splice(toIndex, 0, arr[fromIndex]);
    return newArr;
  }

  const list = itemArr.map(item => {
    const isDragging = currMovingItemId === item.id;
    return <div className={`item ${isDragging ? 'dragging' : ''}`} key={item.id}
      draggable="true"
      data-drag={item.id} style={{ backgroundColor: `${item.bcColor}` }}
      onDragStart={handleDragStart} onDragEnter={handleDragEnter} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      <span>{item.name}</span>
    </div>
  })

  return (
    <div className="DrgDrpDrgEv">
      <h2>Dragging with drag listener</h2>
      <div className="grid-drag-drop">
        {list}
      </div>
    </div>
  );
}

export default DrgDrpDrgEv;
