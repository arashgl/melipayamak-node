import Base from "../base";
import https from "https";
import querystring from "querystring";

interface RequestOptions {
  host: string;
  path: string;
}

export default class RestAsync extends Base {
  private options: RequestOptions;

  constructor(username: string, password: string) {
    super(username, password);
    this.options = {
      host: "rest.payamak-panel.com",
      path: "api/SendSMS",
    };
  }

  private async request(method: string, params: any): Promise<any> {
    const path = `https://${this.options.host}/${this.options.path}/${method}`;
    params = Object.assign({}, this.data, params);
    const postdata = querystring.stringify(params);
    const post_options = {
      host: this.options.host,
      port: "443",
      path: path,
      method: "POST",
      headers: {
        "Content-Length": postdata.length,
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
    };

    return new Promise((resolve, reject) => {
      const req = https.request(post_options, function (res) {
        let data = "";

        res.setEncoding("utf8");
        res.on("data", function (chunk) {
          data += chunk;
        });

        res.on("end", function () {
          resolve(JSON.parse(data));
        });
      });

      req.on("error", function (e) {
        reject(
          JSON.stringify({
            error: e.message,
          })
        );
      });

      req.write(postdata, "utf8");
      req.end();
    });
  }

  async send(
    to: string,
    from: string,
    text: string,
    isFlash = false
  ): Promise<any> {
    return this.request("SendSMS", {
      to,
      from,
      text,
      isFlash,
    });
  }

  async sendByBaseNumber(
    text: string,
    to: string,
    bodyId: string
  ): Promise<any> {
    return this.request("BaseServiceNumber", {
      text,
      to,
      bodyId,
    });
  }

  async isDelivered(recId: string): Promise<any> {
    return this.request("GetDeliveries2", {
      recId,
    });
  }

  async getMessages(
    location: string,
    index: string,
    count: string,
    from: string = ""
  ): Promise<any> {
    return this.request("GetMessages", {
      location,
      index,
      count,
      from,
    });
  }

  async getCredit(): Promise<any> {
    return this.request("GetCredit", {});
  }

  async getBasePrice(): Promise<any> {
    return this.request("GetBasePrice", {});
  }

  async getNumbers(): Promise<any> {
    return this.request("GetUserNumbers", {});
  }
}
