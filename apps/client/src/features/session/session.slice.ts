import { QnASlice } from 'src/features/session/qna';
import { StateCreator } from 'zustand/index';

import { ChattingSlice } from '@/features/session/chatting';
import { Session } from '@/features/session/session.type';

export interface SessionSlice {
  session?: Session;
  sessionId?: string;
  sessionToken?: string;
  isHost: boolean;
  reset: () => void;
  setSession: (session: Session) => void;
  setSessionId: (sessionId: string) => void;
  setSessionToken: (sessionToken: string) => void;
  setIsHost: (isHost: boolean) => void;
}

export const createSessionSlice: StateCreator<
  SessionSlice & QnASlice & ChattingSlice,
  [],
  [],
  SessionSlice
> = (set, get) => ({
  isHost: false,
  reset: () => {
    get().resetQuestions();
    get().resetChatting();
    set({ session: undefined, sessionToken: undefined, isHost: false });
  },
  setSession: (session) => set({ session }),
  setSessionId: (sessionId) => set({ sessionId }),
  setSessionToken: (sessionToken) => set({ sessionToken }),
  setIsHost: (isHost) => set({ isHost }),
});
