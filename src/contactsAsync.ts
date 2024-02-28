import BaseSoap from "./baseSoap";

export default class ContactsAsync extends BaseSoap {
  path: string;

  constructor(username: string, password: string) {
    super(username, password);
    this.path = "http://api.payamak-panel.com/post/contacts.asmx?wsdl";
  }

  async execute(funcName: string, params: any): Promise<any> {
    return super.executeAsync(this.path, funcName, params);
  }

  async addGroup(
    groupName: string,
    Descriptions: string,
    showToChilds: boolean
  ): Promise<any> {
    return this.execute("AddGroup", {
      ...this.data,
      groupName,
      Descriptions,
      showToChilds,
    });
  }

  async add(params: any): Promise<any> {
    return this.execute("AddContact", {
      ...this.data,
      ...params,
    });
  }

  async checkMobileExist(mobileNumber: string): Promise<any> {
    return this.execute("CheckMobileExistInContact", {
      ...this.data,
      mobileNumber,
    });
  }

  async get(
    groupId: string,
    keyword: string,
    from: number,
    count: number
  ): Promise<any> {
    return this.execute("GetContacts", {
      ...this.data,
      groupId,
      keyword,
      from,
      count,
    });
  }

  async getGroups(): Promise<any> {
    return this.execute("GetGroups", this.data);
  }

  async change(params: any): Promise<any> {
    return this.execute("ChangeContact", {
      ...this.data,
      ...params,
    });
  }

  async remove(mobilenumber: string): Promise<any> {
    return this.execute("RemoveContact", {
      ...this.data,
      mobilenumber,
    });
  }

  async getEvents(contactId: string): Promise<any> {
    return this.execute("GetContactEvents", {
      ...this.data,
      contactId,
    });
  }
}
