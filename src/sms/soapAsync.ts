import BaseSoap from "../baseSoap";

interface SendMessage {
  string: string;
}

export default class SoapAsync extends BaseSoap {
  private sendUrl: string;
  private receiveUrl: string;
  private voiceUrl: string;
  private scheduleUrl: string;

  constructor(username: string, password: string) {
    super(username, password);
    this.sendUrl = this.getPath("send");
    this.receiveUrl = this.getPath("receive");
    this.voiceUrl = this.getPath("Voice");
    this.scheduleUrl = this.getPath("Schedule");
  }

  getCredit() {
    return this.executeAsync(this.sendUrl, "GetCredit", this.data);
  }

  isDelivered(id: string | string[]) {
    const data = {
      recId: id,
    };
    const funcName = Array.isArray(id) ? "GetDeliveries3" : "GetDelivery2";
    return this.executeAsync(this.sendUrl, funcName, {
      ...this.data,
      ...data,
    });
  }

  send(_to: string | string[], from: string, text: string, isflash = false) {
    const funcName = Array.isArray(_to) ? "SendSimpleSMS" : "SendSimpleSMS2";
    const to = Array.isArray(_to) ? [{ string: _to }] : _to;
    return this.executeAsync(this.sendUrl, funcName, {
      ...this.data,
      to,
      from,
      text,
      isflash,
    });
  }

  send2(_to: string[], from: string, text: string, isflash = false, udh = "") {
    const to: SendMessage[] = [{ string: _to.join() }];
    return this.executeAsync(
      this.sendUrl,
      "SendSms",
      {
        ...this.data,
        to,
        from,
        text,
        isflash,
        udh,
      },
      false
    );
  }

  sendWithDomain(
    to: string[],
    from: string,
    text: string,
    isflash: boolean,
    domainName: string
  ) {
    return this.executeAsync(this.sendUrl, "SendWithDomain", {
      ...this.data,
      to,
      from,
      text,
      isflash,
      domainName,
    });
  }

  getMessages(location: string, index: string, count: string, from = "") {
    return this.executeAsync(this.sendUrl, "getMessages", {
      ...this.data,
      location,
      index,
      count,
      from,
    });
  }

  getMessagesStr(location: string, index: string, count: string, from = "") {
    return this.executeAsync(this.receiveUrl, "GetMessageStr", {
      ...this.data,
      location,
      index,
      count,
      from,
    });
  }

  getMessagesByDate(
    location: string,
    index: string,
    count: string,
    from: string,
    dateFrom: string,
    dateTo: string
  ) {
    return this.executeAsync(this.receiveUrl, "GetMessagesByDate", {
      ...this.data,
      location,
      index,
      count,
      dateFrom,
      dateTo,
      from,
    });
  }

  getMessagesReceptions(msgId: string, fromRows: string) {
    return this.executeAsync(this.receiveUrl, "GetMessagesReceptions", {
      ...this.data,
      msgId,
      fromRows,
    });
  }

  getUsersMessagesByDate(
    location: string,
    index: string,
    count: string,
    from: string,
    dateFrom: string,
    dateTo: string
  ) {
    return this.executeAsync(this.receiveUrl, "GetUsersMessagesByDate", {
      ...this.data,
      location,
      index,
      count,
      dateFrom,
      dateTo,
      from,
    });
  }

  remove(msgIds: string[]) {
    return this.executeAsync(this.receiveUrl, "RemoveMessages2", {
      ...this.data,
      msgIds,
    });
  }

  getPrice(
    irancellCount: string,
    mtnCount: string,
    from: string,
    text: string
  ) {
    return this.executeAsync(this.sendUrl, "GetSmsPrice", {
      ...this.data,
      irancellCount,
      mtnCount,
      from,
      text,
    });
  }

  getInboxCount(isRead = false) {
    return this.executeAsync(this.sendUrl, "GetInboxCount", {
      ...this.data,
      isRead,
    });
  }

  sendWithSpeech(
    to: string[],
    from: string,
    smsBody: string,
    speechBody: string
  ) {
    return this.executeAsync(this.voiceUrl, "SendSMSWithSpeechText", {
      ...this.data,
      to,
      from,
      smsBody,
      speechBody,
    });
  }

  sendWithSpeechSchduleDate(
    to: string[],
    from: string,
    smsBody: string,
    speechBody: string,
    scheduleDate: string
  ) {
    return this.executeAsync(
      this.voiceUrl,
      "SendSMSWithSpeechTextBySchduleDate",
      {
        ...this.data,
        to,
        from,
        smsBody,
        speechBody,
        scheduleDate,
      }
    );
  }

  getSendWithSpeech(recId: string) {
    return this.executeAsync(this.voiceUrl, "GetSendSMSWithSpeechTextStatus", {
      ...this.data,
      recId,
    });
  }

  getMultiDelivery(recId: string) {
    return this.executeAsync(this.sendUrl, "GetMultiDelivery2", {
      ...this.data,
      recId,
    });
  }

  sendMultipleSchedule(
    to: string[],
    from: string,
    text: string,
    isflash: boolean,
    scheduleDateTime: string,
    period: string
  ) {
    return this.executeAsync(this.scheduleUrl, "AddMultipleSchedule", {
      ...this.data,
      to,
      from,
      text,
      isflash,
      scheduleDateTime,
      period,
    });
  }

  sendSchedule(
    to: string[],
    from: string,
    text: string,
    isflash: boolean,
    scheduleDateTime: string,
    period: string
  ) {
    return this.executeAsync(this.scheduleUrl, "AddSchedule", {
      ...this.data,
      to,
      from,
      text,
      isflash,
      scheduleDateTime,
      period,
    });
  }

  getScheduleStatus(scheduleId: string) {
    return this.executeAsync(this.scheduleUrl, "GetScheduleStatus", {
      ...this.data,
      scheduleId,
    });
  }

  removeSchedule(scheduleId: string) {
    return this.executeAsync(this.scheduleUrl, "RemoveSchedule", {
      ...this.data,
      scheduleId,
    });
  }

  addUsance(
    to: string[],
    from: string,
    text: string,
    isflash: boolean,
    scheduleStartDateTime: string,
    repeatAfterDays: string,
    scheduleEndDateTime: string
  ) {
    return this.executeAsync(this.scheduleUrl, "AddUsance", {
      ...this.data,
      to,
      from,
      text,
      isflash,
      scheduleStartDateTime,
      repeatAfterDays,
      scheduleEndDateTime,
    });
  }
}
