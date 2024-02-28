import BaseSoap from "./baseSoap";

export default class Users extends BaseSoap {
  private path: string;

  constructor(username: string, password: string) {
    super(username, password);
    this.path = "http://api.payamak-panel.com/post/users.asmx?wsdl";
  }

  execute(funcName: string, params: any) {
    return super.executeAsync(this.path, funcName, params);
  }

  async addPayment(params: any): Promise<any> {
    return this.execute("AddPayment", {
      ...this.data,
      ...params,
    });
  }

  async add(params: any): Promise<any> {
    return this.execute("AddUser", {
      ...this.data,
      ...params,
    });
  }

  async addComplete(params: any): Promise<any> {
    return this.execute("AddUserComplete", {
      ...this.data,
      ...params,
    });
  }

  async addWithLocation(params: any): Promise<any> {
    return this.execute("AddUserWithLocation", {
      ...this.data,
      ...params,
    });
  }

  async authenticate(): Promise<any> {
    return this.execute("AuthenticateUser", this.data);
  }

  async changeCredit(
    amount: number,
    description: string,
    targetUsername: string,
    GetTax: boolean
  ): Promise<any> {
    return this.execute("ChangeUserCredit", {
      ...this.data,
      amount,
      description,
      targetUsername,
      GetTax,
    });
  }

  async forgotPassword(
    mobileNumber: string,
    emailAddress: string,
    targetUsername: string
  ): Promise<any> {
    return this.execute("ForgotPassword", {
      ...this.data,
      mobileNumber,
      emailAddress,
      targetUsername,
    });
  }

  async getBasePrice(targetUsername: string): Promise<any> {
    return this.execute("GetUserBasePrice", {
      ...this.data,
      targetUsername,
    });
  }

  async remove(targetUsername: string): Promise<any> {
    return this.execute("RemoveUser", {
      ...this.data,
      targetUsername,
    });
  }

  async getCredit(targetUsername: string): Promise<any> {
    return this.execute("GetUserCredit", {
      ...this.data,
      targetUsername,
    });
  }

  async getDetails(targetUsername: string): Promise<any> {
    return this.execute("GetUserDetails", {
      ...this.data,
      targetUsername,
    });
  }

  async getNumbers(): Promise<any> {
    return this.execute("GetUserNumbers", this.data);
  }

  async getProvinces(): Promise<any> {
    return this.execute("GetProvinces", this.data);
  }

  async getCities(provinceId: string): Promise<any> {
    return this.execute("GetCities", {
      ...this.data,
      provinceId,
    });
  }

  async getExpireDate(): Promise<any> {
    return this.execute("GetExpireDate", this.data);
  }

  async getTransactions(
    targetUsername: string,
    creditType: string,
    dateFrom: string,
    dateTo: string,
    keyword: string
  ): Promise<any> {
    return this.execute("GetUserTransactions", {
      ...this.data,
      targetUsername,
      creditType,
      dateFrom,
      dateTo,
      keyword,
    });
  }

  async get(): Promise<any> {
    return this.execute("GetUsers", this.data);
  }

  async hasFilter(text: string): Promise<any> {
    return this.execute("HasFilter", {
      ...this.data,
      text,
    });
  }
}
