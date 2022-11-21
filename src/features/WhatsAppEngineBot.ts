import { Client, LocalAuth } from "whatsapp-web.js";
import { Message, Query, WhatsAppEngineConfiguration } from "../adapters";
import qrcode from "qrcode-terminal";

export default class WhatsAppEngineBot {
  private client: Client;
  private queries: Query[];

  constructor(private readonly configuration: WhatsAppEngineConfiguration) {
    this.client = new Client({
      authStrategy: new LocalAuth(),
    });
    this.queries = [];

    this.client.on("qr", this.onReadQr);
    this.client.on("message", this.onMessage);
  }

  private resolveQueries() {
    const resolveClassMethods = this.configuration.queries.map((query) => {
      return Reflect.getOwnMetadata("design:type", query) as Query[];
    });
    this.queries = resolveClassMethods.flat();
  }

  private onMessage(message: Message) {
    const { body } = message;
    const transverseMessages = this.queries.map((query) => () => query({ message: body }));
    transverseMessages.forEach((fn) => {
      fn().then((response) => {
        if (response.matches && response.message) {
          message.reply(response.message);
        }
      });
    });
  }

  private onReadQr(qr: string) {
    qrcode.generate(qr, { small: true });
  }

  boostrap() {
    this.resolveQueries();
    this.client.initialize();
  }
}
