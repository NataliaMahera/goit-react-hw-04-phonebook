import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Section } from './Section/Section';
import { Container } from './Container/Container';
import { Notification } from './Notification/Notification';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const stringifiedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(stringifiedContacts) ?? [];

    this.setState({ contacts: parsedContacts });
  }

  // Синхронізація з локальним сховищем при оновленні масиву даних

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      const stringifiedContacts = JSON.stringify(this.state.contacts);

      localStorage.setItem('contacts', stringifiedContacts);
    }
  }

  // Форма віддає свій state через props onSubmitForm в компоненті, щоб при сабміті віддати в апп тільки свої дані.

  addContactOnSubmit = inputContact => {
    const { contacts } = this.state;
    const isExist = contacts.some(
      ({ name }) => name.toLowerCase() === inputContact.name.toLowerCase()
    );

    if (isExist) {
      alert(`${inputContact.name} is already in contacts.`);
      return;
    }

    const finalInputContact = {
      ...inputContact,
      id: nanoid(),
    };

    this.setState(({ contacts }) => ({
      contacts: [...contacts, finalInputContact],
    }));
  };

  onChangeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  onDeleteContact = contactId => {
    this.setState(({ contacts }) => {
      return {
        contacts: contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  render() {
    const { filter, contacts } = this.state;

    return (
      <Container>
        <Section title="Phonebook">
          <ContactForm onSubmitForm={this.addContactOnSubmit} />
        </Section>

        <Section title="Contacts">
          {contacts.length > 0 ? (
            <Filter value={filter} onChangeFilter={this.onChangeFilter} />
          ) : (
            <Notification message="Your phonebook is empty. Please add your contact!" />
          )}

          {contacts.length > 0 && (
            <ContactList
              contacts={this.getVisibleContacts()}
              onDeleteContact={this.onDeleteContact}
            />
          )}
        </Section>
      </Container>
    );
  }
}
