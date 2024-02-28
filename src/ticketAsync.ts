import BaseSoap from "./baseSoap";

export default class TicketAsync extends BaseSoap {
  private path: string;

  constructor(username: string, password: string) {
    super(username, password);
    this.path = "http://api.payamak-panel.com/post/Tickets.asmx?wsdl";
  }

  async execute(funcName: string, params: any): Promise<any> {
    return super.executeAsync(this.path, funcName, params);
  }

  async add(title: string, content: string, alertWithSms = true): Promise<any> {
    return this.execute("AddTicket", {
      ...this.data,
      title,
      content,
      alertWithSms,
    });
  }

  async getReceived(
    ticketOwner: string,
    ticketType: string,
    keyword: string
  ): Promise<any> {
    return this.execute("GetReceivedTickets", {
      ...this.data,
      ticketOwner,
      ticketType,
      keyword,
    });
  }

  async getReceivedCount(ticketType: string): Promise<any> {
    return this.execute("GetReceivedTicketsCount", {
      ...this.data,
      ticketType,
    });
  }

  async getSent(
    ticketOwner: string,
    ticketType: string,
    keyword: string
  ): Promise<any> {
    return this.execute("GetSentTickets", {
      ...this.data,
      ticketOwner,
      ticketType,
      keyword,
    });
  }

  async getSentCount(ticketType: string): Promise<any> {
    return this.execute("GetSentTicketsCount", {
      ...this.data,
      ticketType,
    });
  }

  async response(
    ticketId: string,
    type: string,
    content: string,
    alertWithSms = true
  ): Promise<any> {
    return this.execute("ResponseTicket", {
      ...this.data,
      ticketId,
      type,
      content,
      alertWithSms,
    });
  }
}
