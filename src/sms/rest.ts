import Base from "../base";
import https from "https";
import querystring from "querystring";

export default class Rest extends Base {
  constructor(username: string, password: string) {
    super(username, password);
  }

  private request(method: string, params: any): void {
    let data = Object.assign({}, this.data, params);
    var postdata = querystring.stringify(data);

    var options = {
      host: "rest.payamak-panel.com",
      port: 443,
      path: `/api/SendSMS/${method}`,
      method: "POST",
      headers: {
        "Content-Length": postdata.length,
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
    };

    var req = https.request(options, function (res) {
      console.log("STATUS: " + res.statusCode);
      res.setEncoding("utf8");
      res.on("data", function (chunk) {
        console.log(chunk);
      });
    });

    req.on("error", function (e) {
      console.log("problem with request: " + e.message);
    });

    req.write(postdata, "utf8");
    req.end();
  }

  send(to: string, from: string, text: string, isFlash = false): void {
    this.request("SendSMS", {
      to,
      from: from,
      text,
      isFlash,
    });
  }

  sendByBaseNumber(text: string, to: string, bodyId: string): void {
    this.request("BaseServiceNumber", {
      text,
      to,
      bodyId,
    });
  }

  isDelivered(recId: string): void {
    this.request("GetDeliveries2", {
      recId,
    });
  }

  getMessages(
    location: string,
    index: string,
    count: string,
    from: string = ""
  ): void {
    this.request("GetMessages", {
      location,
      index,
      count,
    });
  }

  getCredit(): void {
    this.request("GetCredit", {});
  }

  getBasePrice(): void {
    this.request("GetBasePrice", {});
  }

  getNumbers(): void {
    this.request("GetUserNumbers", {});
  }
}
