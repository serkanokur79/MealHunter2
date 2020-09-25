import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Form = (props) => {
  return (
    <>
      <form class='navbar-form navbar-left'>
        <input
          onChange={props.getRecipe}
          className='form-control shadow  mb-3 bg-white rounded'
          class='form-control mr-sm-2'
          type='search'
          placeholder='food to search'
          name='searchName'
        />
        <button class='btn btn-outline-success my-2 my-sm-0' type='submit'>
          Search
        </button>
      </form>
    </>
  );
};

export default Form;
