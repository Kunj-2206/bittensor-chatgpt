import { IModel } from './models.types';

export const Models: Array<IModel> = [
  {
    id: 'bitapai',
    name: 'BitAPAI',
    endpoint: 'https://api.bitapai.io/v1/conversation',
    requestBuilder: (secret, data) => {
      return {
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': secret,
        },
        method: 'POST',
        body: JSON.stringify(data),
      };
    },
    responseExtractor: (json: any) => {
      return json?.assistant || '';
    },
    errorExtractor: (json: any) => {
      return `BitAPAI Error: ${json || 'Unknown error'}`;
    },
    defaultPrompt:
      "You are an AI assistant. Follow the user's instructions carefully. Respond using markdown.",
  },
  {
    id: 'validator-endpoint',
    name: 'Validator Endpoint',
    endpoint: 'https://d509-65-108-32-175.ngrok-free.app/chat',
    requestBuilder: (data) => {
      return {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer O8yseMhTnZxdHJgnLV-aHsAzZG1CdL9UBCAmLZJlUk5FpGQVYuXZMkqxW95BWoRb',
          'Endpoint-Version': '2023-05-19'
        },
        method: 'POST',
        body: JSON.stringify({ messages: data, top_n: 1 }),
      };
    },
    responseExtractor: (json: any) => {
      return json?.['choices'][0]['message']['content'] || '';
    },
    errorExtractor: (json: any) => {
      return `Validator Endpoint Error: ${json?.detail || 'Unknown error'}`;
    },
    defaultPrompt:
      "You are an AI assistant. Follow the user's instructions carefully.",
  },
];
