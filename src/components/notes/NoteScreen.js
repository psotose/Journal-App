import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotesAppBar } from './NotesAppBar';
import { useForm } from '../../hooks/useForm';
import { activeNote, startDeletingNote } from '../../actions/notes';

export const NoteScreen = () => {
  
  const dispatch = useDispatch();
  const { active:note } = useSelector( state => state.notes );
  const [ formValues, handleInputChange, reset ] = useForm( note );
  const { body, title, id } = formValues;

  const activeId = useRef( note.id );

  //para saber si estamos en la misma nota activa
  useEffect(() => { 
    if ( note.id !== activeId.current ) {
      reset( note );
      activeId.current = note.id;
    }
  }, [note, reset]);
  //para escuchar los cambios
  useEffect(() => {
    dispatch( activeNote( formValues.id, {...formValues} ) );
  }, [formValues, dispatch]);

  const handleDelete = () => {
    dispatch( startDeletingNote( id ) );
  }

  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">

        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
          name="title"
          value={ title }
          onChange={ handleInputChange }
        />

        <textarea
          placeholder="What happened today?"
          className="notes__textarea"
          name="body"
          value={ body }
          onChange={ handleInputChange }
        ></textarea>

        {
          (note.url) 
          && (
            <div className="notes__image">
              <img
                src={note.url}
                alt="beauty dawn"
              />  
            </div>
          )  
        }
      </div>

      <button className="btn btn-danger" onClick={ handleDelete }>
        Delete
      </button>
    </div>
  )
}
