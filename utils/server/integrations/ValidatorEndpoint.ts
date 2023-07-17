import { VALIDATOR_ENDPOINT_API_HOST } from '@/utils/app/const';

import { Message } from '@/types/chat';

export class ValidatorEndpointError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidatorEndpointError';
    this.message = message;
  }
}

export const ValidatorEndpointConversation = async (
  key: string,
  messages: Message[],
  systemPrompt: string,
) => {
  const url = 'https://d509-65-108-32-175.ngrok-free.app/chat' ;

  const res = await fetch(url, {
      headers: {
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer O8yseMhTnZxdHJgnLV-aHsAzZG1CdL9UBCAmLZJlUk5FpGQVYuXZMkqxW95BWoRb',
      'Endpoint-Version' : '2023-05-19'
    },
    method: 'POST',
    body: JSON.stringify({
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        ...messages,
      ],
      top_n: 1,
    }),
  });

  const json = await res.json();

  if (res.status !== 200) {
    throw new ValidatorEndpointError(
      Validator Endpoint Error: ${json.detail},
    );
  }

  return json?.['choices'][0]['message']['content'] || '';
};
