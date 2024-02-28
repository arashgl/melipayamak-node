import Soap from "./sms/soap";
import SoapAsync from "./sms/soapAsync";
import Rest from "./sms/rest";
import RestAsync from "./sms/restAsync";
import Branch from "./branch";
import BranchAsync from "./branchAsync";
import Contacts from "./contacts";
import ContactsAsync from "./contactsAsync";
import Ticket from "./ticket";
import TicketAsync from "./ticketAsync";
import Users from "./users";
import UsersAsync from "./usersAsync";

export default class MelipayamakApi {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  sms(method: string = "rest", type: string = "async") {
    if (method == "rest") {
      if (type == "async") return new RestAsync(this.username, this.password);
      else return new Rest(this.username, this.password);
    } else {
      if (type == "async") return new SoapAsync(this.username, this.password);
      else return new Soap(this.username, this.password);
    }
  }

  branch() {
    return new Branch(this.username, this.password);
  }

  branchAsync() {
    return new BranchAsync(this.username, this.password);
  }

  contacts() {
    return new Contacts(this.username, this.password);
  }

  contactsAsync() {
    return new ContactsAsync(this.username, this.password);
  }

  ticket() {
    return new Ticket(this.username, this.password);
  }

  ticketAsync() {
    return new TicketAsync(this.username, this.password);
  }

  users() {
    return new Users(this.username, this.password);
  }

  usersAsync() {
    return new UsersAsync(this.username, this.password);
  }
}
