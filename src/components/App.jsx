import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Section } from './Section/Section';
import { Container } from './Container/Container';
import { Notification } from './Notification/Notification';

export const App = () => {
  //При ініціалізації стейту те що поверне callback функція з useState(()=>{parsedContacts}) запишеться в масив contacts
  const [contacts, setContacts] = useState(() => {
    const stringifiedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(stringifiedContacts) ?? [];

    return parsedContacts;
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    // Синхронізація стейту з локальним сховищем при оновленні масиву даних (стейту contacts)
    // цю перевірку реакт робить самостійно під капотом - if (prevState.contacts !== this.state.contacts)
    const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringifiedContacts);
  }, [contacts]);

  // Форма віддає свій state через props onSubmitForm в компоненті, щоб при сабміті віддати в апп тільки свої дані.
  const addContactOnSubmit = inputContact => {
    // перевірка на дублікат імені, чи імя яке хочемо додати співпадає з тим яке вже є
    const isExist = contacts.some(
      ({ name }) => name.toLowerCase() === inputContact.name.toLowerCase()
    );

    // якщо хоч один елемент співпаде то в isExist буде true
    if (isExist) {
      alert(`${inputContact.name} is already in contacts.`);
      return;
    }

    const finalInputContact = {
      ...inputContact,
      id: nanoid(),
    };

    // Оновлюємо масив contacts, встановлюємо новий масив куди копіюємо всі з-ня з попереднього і додамо новий обєкт з новими контактами
    setContacts(prevContacts => [finalInputContact, ...prevContacts]);
  };

  const onChangeFilter = event => {
    setFilter({ filter: event.currentTarget.value });
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const onDeleteContact = contactId => {
    //В масив контактів записуємо новий масив без видаленого імені
    setContacts(contacts.filter(({ id }) => id !== contactId));
  };

  return (
    <Container>
      <Section title="Phonebook">
        <ContactForm onSubmitForm={addContactOnSubmit} />
      </Section>

      <Section title="Contacts">
        {contacts.length > 0 ? (
          <Filter value={filter} onChangeFilter={onChangeFilter} />
        ) : (
          <Notification message="Your phonebook is empty. Please add your contact!" />
        )}

        {contacts.length > 0 && (
          <ContactList
            contacts={getVisibleContacts()}
            onDeleteContact={onDeleteContact}
          />
        )}
      </Section>
    </Container>
  );
};
