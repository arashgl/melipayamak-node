import Base from "./base";
import soap, { createClientAsync } from "soap";

export default class BaseSoap extends Base {
  async executeAsync(
    url: string,
    funcName: string,
    params: any,
    returnResult = true
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      createClientAsync(url)
        .then((client) => {
          return client[funcName + "Async"](params);
        })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  execute(url: string, funcName: string, params: any): void {
    soap.createClient(url, function (err: any, client: any) {
      client[funcName](params, function (err: any, result: any) {
        if (err) console.log(err);
        else console.log(result);
      });
    });
  }

  getPath(method: string): string {
    return `http://api.payamak-panel.com/post/${method}.asmx?wsdl`;
  }
}
