import css from './ContactListItem.module.css';

export const ContactListItem = ({ id, name, number, onDeleteContact }) => {
  return (
    <div className={css.wrapper}>
      <li key={id} className={css.contactListItem}>
        {name}: {number}
      </li>
      <button
        type="button"
        className={css.deleteBtn}
        onClick={() => onDeleteContact(id)}
      >
        Delete
      </button>
    </div>
  );
};
