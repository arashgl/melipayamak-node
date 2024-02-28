export default class Base {
  username: string;
  password: string;
  data: { username: string; password: string };

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
    this.data = {
      username,
      password,
    };
  }
}
