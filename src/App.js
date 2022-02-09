import React, { Component, useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import List from './list';
import Alert from './alert';

const getLocalStorage = () => {
  let list = localStorage.getItem('groceries');
  if(list) {
    list = JSON.parse(localStorage.getItem('groceries'));
    return list;
  } else {
    return []
  }
};

function App() {
  const [grocery, setGrocery] = useState('');
  const [groceries, setGroceries] = useState(getLocalStorage());
  const [editFlag, setEditFlag] = useState(false);
  const [editID, setEditID] = useState('');
  const [alert, setAlert] = useState({ show: false, type: '', text: ''});

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!grocery) {
      showAlert(true,'danger','Please enter value');
    }
    else if(!editFlag && grocery) {
      const newGrocery = {id: uuid(), grocery};
      setGroceries([...groceries, newGrocery]);
      // console.log(groceries);
      setGrocery('');
      showAlert(true, 'success', 'item added to the list')
    }
    else if(editFlag && grocery) {
      const newGroceries = groceries.map(item => {
        if(item.id === editID){
          return {...item, grocery}
        }
        return item
      });
      setGroceries(newGroceries);
      setGrocery('');
      setEditFlag(false);
      setEditID('');
      showAlert(true, 'success', 'value changed')
    }
  };

  const showAlert = (show = false, type = '', text = '') => {
    setAlert({ show: true, type, text });
  };

  const handleClear = () => {
    setGroceries([]);
    showAlert(true, 'danger', 'empty list')
  };

  const handleRemove = (id) => {
    const newGroceries = groceries.filter(item => item.id != id);
    setGroceries(newGroceries);
    showAlert(true, 'danger', 'item removed')
  };

  const handleEdit = (id) => {
    const editItem = groceries.find(item => item.id === id);
    setEditFlag(true);
    setGrocery(editItem.grocery);
    setEditID(id);
  }

  useEffect(() => {
    localStorage.setItem('groceries', JSON.stringify(groceries))
  }, [groceries]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} groceries={groceries}/>}
        <h3>grocery-bud</h3>
        <div className="form-control">
          <input type="text" id="grocery" name='grocery' placeholder="e.g. eggs" value={grocery} onChange={(e) => setGrocery(e.target.value)}/>
          <button type="submit" className="submit-btn">{editFlag ? 'edit' : 'submit'}</button>
        </div>
      </form>
      {groceries.length > 0 && (
        <div className="grocery-container">
          <List groceries={groceries} handleRemove={handleRemove} handleEdit={handleEdit} />
          <button type="button" className="clear-btn" onClick={handleClear}>clear items</button>          
        </div>
      )}
    </section>
  );
}

export default App;