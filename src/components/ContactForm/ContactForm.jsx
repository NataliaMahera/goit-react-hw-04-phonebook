import React, { useState } from 'react';
import css from './ContactForm.module.css';

export const ContactForm = ({ onSubmitForm }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // Патерн 'контрольований компонент' після зміни state
  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const inputContact = {
      name,
      number,
    };

    // Піднімаємо дані з форми під час сабміту в компонент App
    // onSubmitForm приходить ззовні як props
    onSubmitForm(inputContact);
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label className={css.label}>
        Name
        <input
          type="text"
          name="name"
          className={css.input}
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          required
        />
      </label>

      <label className={css.label}>
        Number
        <input
          type="tel"
          name="number"
          className={css.input}
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          required
        />
      </label>

      <button type="submit" className={css.addBtn}>
        Add contact
      </button>
    </form>
  );
};
