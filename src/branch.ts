import BaseSoap from "./baseSoap";

export default class Branch extends BaseSoap {
  private path: string;

  constructor(username: string, password: string) {
    super(username, password);
    this.path = "http://api.payamak-panel.com/post/Actions.asmx?wsdl";
  }

  execute(funcName: string, params: any) {
    return super.execute(this.path, funcName, params);
  }

  get(owner: string) {
    return this.execute("GetBranchs", {
      ...this.data,
      owner,
    });
  }

  remove(branchId: string) {
    return this.execute("RemoveBranch", {
      ...this.data,
      branchId,
    });
  }

  add(branchName: string, owner: string) {
    return this.execute("AddBranch", {
      ...this.data,
      branchName,
      owner,
    });
  }

  addNumber(mobileNumbers: string, branchId: string) {
    return this.execute("AddNumber", {
      ...this.data,
      mobileNumbers,
      branchId,
    });
  }

  sendBulk(
    from: string,
    title: string,
    message: string,
    branch: string,
    DateToSend: string,
    requestCount: string,
    bulkType: string,
    rowFrom: string,
    rangeFrom: string,
    rangeTo: string
  ) {
    return this.execute("AddBulk", {
      ...this.data,
      from,
      title,
      message,
      branch,
      DateToSend,
      requestCount,
      bulkType,
      rowFrom,
      rangeFrom,
      rangeTo,
    });
  }

  sendBulk2(
    from: string,
    title: string,
    message: string,
    branch: string,
    DateToSend: string,
    requestCount: string,
    bulkType: string,
    rowFrom: string,
    rangeFrom: string,
    rangeTo: string
  ) {
    return this.execute("AddBulk2", {
      ...this.data,
      from,
      title,
      message,
      branch,
      DateToSend,
      requestCount,
      bulkType,
      rowFrom,
      rangeFrom,
      rangeTo,
    });
  }

  getBulkCount(branch: string, rangeFrom: string, rangeTo: string) {
    return this.execute("GetBulkCount", {
      ...this.data,
      branch,
      rangeFrom,
      rangeTo,
    });
  }

  getBulkReceptions(bulkId: string, fromRows: string) {
    return this.execute("GetBulkReceptions", {
      ...this.data,
      bulkId,
      fromRows,
    });
  }

  getBulkStatus(bulkId: string) {
    return this.execute("GetBulkStatus", {
      ...this.data,
      bulkId,
    });
  }

  getTodaySent() {
    return this.execute("GetTodaySent", this.data);
  }

  getTotalSent() {
    return this.execute("GetTotalSent", this.data);
  }

  removeBulk(bulkId: string) {
    return this.execute("RemoveBulk", {
      ...this.data,
      bulkId,
    });
  }

  sendMultipleSms(
    to: string,
    from: string,
    text: string,
    isflash: string,
    udh: string
  ) {
    const data = {
      ...this.data,
      to,
      from,
      text,
      isflash,
      udh,
    };
    return Array.isArray(from)
      ? this.execute("SendMultipleSMS2", data)
      : this.execute("SendMultipleSMS", data);
  }

  updateBulkDelivery(bulkId: string) {
    return this.execute("UpdateBulkDelivery", {
      ...this.data,
      bulkId,
    });
  }
}
