import React, { Component } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const List = ({handleRemove, handleEdit, groceries}) => {

  return (
    <div className='grocery-list'>
      {groceries.map((item, index) => {
        const {id, grocery} = item;
        return (
          <article key={id} className='grocery-item'>
            <p className='title'>{grocery}</p>
            <div className='btn-container'>
              <button type='button' className='edit-btn' onClick={() => handleEdit(id)}><FaEdit /></button>
              <button type='button' className='delete-btn' onClick={() => handleRemove(id)}><FaTrash /></button>
            </div>
          </article>
        )
      })}
    </div>
  )
};

export default List;