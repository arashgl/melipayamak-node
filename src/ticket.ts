import BaseSoap from "./baseSoap";

export default class Ticket extends BaseSoap {
  private path: string;

  constructor(username: string, password: string) {
    super(username, password);
    this.path = "http://api.payamak-panel.com/post/Tickets.asmx?wsdl";
  }

  execute(funcName: string, params: any) {
    return super.executeAsync(this.path, funcName, params);
  }

  add(title: string, content: string, alertWithSms = true) {
    return this.execute("AddTicket", {
      ...this.data,
      title,
      content,
      alertWithSms,
    });
  }

  getReceived(ticketOwner: string, ticketType: string, keyword: string) {
    return this.execute("GetReceivedTickets", {
      ...this.data,
      ticketOwner,
      ticketType,
      keyword,
    });
  }

  getReceivedCount(ticketType: string) {
    return this.execute("GetReceivedTicketsCount", {
      ...this.data,
      ticketType,
    });
  }

  getSent(ticketOwner: string, ticketType: string, keyword: string) {
    return this.execute("GetSentTickets", {
      ...this.data,
      ticketOwner,
      ticketType,
      keyword,
    });
  }

  getSentCount(ticketType: string) {
    return this.execute("GetSentTicketsCount", {
      ...this.data,
      ticketType,
    });
  }

  response(
    ticketId: string,
    type: string,
    content: string,
    alertWithSms = true
  ) {
    return this.execute("ResponseTicket", {
      ...this.data,
      ticketId,
      type,
      content,
      alertWithSms,
    });
  }
}
