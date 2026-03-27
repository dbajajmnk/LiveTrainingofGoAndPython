const queryBuilder = table => fields => condition => {
  return `SELECT ${fields.join(', ')} FROM ${table} WHERE ${condition};`;
};

const userQuery = queryBuilder('users');

const getBasicUserInfo = userQuery(['id', 'username']);
const getFullUserInfo = userQuery(['id', 'username', 'email', 'created_at']);

const activeUsers = getBasicUserInfo("status = 'active'");
const adminUsers = getFullUserInfo("role = 'admin'");

console.log(activeUsers); 
console.log(adminUsers);
