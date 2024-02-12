import { UserIdType, UserType } from '@/types';

class DB {
  users: UserType[];

  constructor() {
    this.users = [];
  }

  _checkUserId(id: UserIdType) {
    const usersIds = this.getUserIds();
    if (usersIds.includes(id)) throw Error('User id already exist');
  }

  getUsers() {
    return this.users;
  }

  setUsers(users: UserType[]) {
    this.users = users;
  }

  getUser(userId: UserIdType) {
    return this.users.find(({ id }) => id === userId);
  }

  addUser(user: UserType) {
    this._checkUserId(user.id);
    this.users = [...this.users, user];
  }

  updateUser(userToUpdate: UserType) {
    const user = this.getUser(userToUpdate.id);

    if (!user) return;

    if (user) {
      this.users = [...this.users.filter(({ id }) => id !== userToUpdate.id), userToUpdate];
      return userToUpdate;
    }
  }

  deleteUser(userId: UserIdType) {
    const user = this.getUser(userId);

    if (!user) return;

    if (user) {
      this.users = this.users.filter(({ id }) => id !== userId);
      return user;
    }
  }

  getUserIds() {
    return this.users.map(({ id }) => id);
  }
}

export default DB;
