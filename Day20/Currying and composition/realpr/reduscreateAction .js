const createAction = type => payload => ({
  type,
  payload
});

const addUser = createAction('ADD_USER');
const removeUser = createAction('REMOVE_USER');
const updateSettings = createAction('UPDATE_SETTINGS');

const action1 = addUser({ id: 1, name: 'Alice' });
const action2 = removeUser(1);
const action3 = updateSettings({ theme: 'dark' });

console.log(action1); 
console.log(action2);
console.log(action3);
