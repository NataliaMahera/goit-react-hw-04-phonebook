import React from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ value, onChangeFilter }) => {
  return (
    <>
      <label className={css.filterLabel}>
        Find contacts by name
        <input
          type="text"
          name="filter"
          className={css.input}
          value={value}
          onChange={onChangeFilter}
        />
      </label>
    </>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  handleChangeFilter: PropTypes.func,
};
