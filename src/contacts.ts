import BaseSoap from "./baseSoap";

export default class Contacts extends BaseSoap {
  path: string;

  constructor(username: string, password: string) {
    super(username, password);
    this.path = "http://api.payamak-panel.com/post/contacts.asmx?wsdl";
  }

  execute(funcName: string, params: any) {
    return super.executeAsync(this.path, funcName, params);
  }

  addGroup(groupName: string, Descriptions: string, showToChilds: boolean) {
    return this.execute("AddGroup", {
      ...this.data,
      groupName,
      Descriptions,
      showToChilds,
    });
  }

  add(params: any) {
    return this.execute("AddContact", {
      ...this.data,
      ...params,
    });
  }

  checkMobileExist(mobileNumber: string) {
    return this.execute("CheckMobileExistInContact", {
      ...this.data,
      mobileNumber,
    });
  }

  get(groupId: string, keyword: string, from: number, count: number) {
    return this.execute("GetContacts", {
      ...this.data,
      groupId,
      keyword,
      from,
      count,
    });
  }

  getGroups() {
    return this.execute("GetGroups", this.data);
  }

  change(params: any) {
    return this.execute("ChangeContact", {
      ...this.data,
      ...params,
    });
  }

  remove(mobilenumber: string) {
    return this.execute("RemoveContact", {
      ...this.data,
      mobilenumber,
    });
  }

  getEvents(contactId: string) {
    return this.execute("GetContactEvents", {
      ...this.data,
      contactId,
    });
  }
}
