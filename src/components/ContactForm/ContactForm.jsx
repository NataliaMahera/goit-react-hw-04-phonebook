import React, { Component } from 'react';
import css from './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  // Патерн 'контрольований компонент' після зміни state
  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const inputContact = {
      name: this.state.name,
      number: this.state.number,
    };

    // Піднімаємо дані з форми під час сабміту в компонент App
    this.props.onSubmitForm(inputContact);

    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={css.form}>
        <label className={css.label}>
          Name
          <input
            type="text"
            name="name"
            className={css.input}
            value={name}
            onChange={this.handleChange}
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
            onChange={this.handleChange}
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            required
          />
        </label>

        <button type="submit" className={css.addBtn}>
          Add contact
        </button>
      </form>
    );
  }
}
