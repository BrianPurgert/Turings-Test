import clsx from 'clsx';
import Balancer from 'react-wrap-balancer';

import { Button, Skeleton } from '@mantine/core';


const BalancerWrapper = (props: any) => <Balancer {...props} />;

export type Message = {
  who: 'bot' | 'user' | undefined;
  message?: string;
};

// loading placeholder animation for the chat line
export const LoadingChatLine = () => (
  <div className="flex min-w-full animate-pulse px-4 py-5 sm:px-6">
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} width="70%" radius="xl" />
  </div>
);

// util helper to convert new lines to <br /> tags
const convertNewLines = (text: string) =>
  text.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));

export function ChatLine({ who = 'bot', message }: Message) {
  if (!message) {
    return null;
  }
  const formatteMessage = convertNewLines(message);

  return (
    <div className={who != 'bot' ? 'float-right clear-both' : 'float-left clear-both'}>
      <BalancerWrapper>
        <div className="float-right mb-5 rounded-lg bg-white px-4 py-5 shadow-lg ring-1 ring-zinc-100 sm:px-6">
          <div className="flex space-x-3">
            <div className="flex-1 gap-4">
              <p className="font-large text-xxl text-gray-900">
                <a href="#" className="hover:underline">
                  {who == 'bot' ? 'AI' : 'You'}
                </a>
              </p>
              <p className={clsx('text ', who == 'bot' ? 'font-semibold font- ' : 'text-gray-400')}>
                {formatteMessage}
              </p>
            </div>
          </div>
        </div>
      </BalancerWrapper>
    </div>
  );
}
