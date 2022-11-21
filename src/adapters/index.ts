import WAWebJS from "whatsapp-web.js";

export interface WhatsAppEngineConfiguration {
  queries: Query[];
}

export type Message = WAWebJS.Message;

export type Query = (params?: MatchParams) => Promise<MatchResponse>;

export type MatchParams = {
  message: string;
};

export type MatchResponse = {
  query: string;
  matches: boolean;
  message: string | null;
};
