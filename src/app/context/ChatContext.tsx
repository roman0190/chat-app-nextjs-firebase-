"use client";
import { createContext, useContext, useReducer, ReactNode } from "react";
import { AuthContext } from "./AuthContext";

interface ChatState {
  chatId: string | null;
  user: any;
}

interface ChatContextProviderProps {
  children: ReactNode;
}

interface ChatContextType {
  data: ChatState;
  dispatch: React.Dispatch<any>;
}

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

export const ChatContextProvider = ({ children }: ChatContextProviderProps) => {
  const { user } = useContext(AuthContext); // Use useContext to access the AuthContext

  const INITIAL_STATE: ChatState = {
    chatId: null,
    user: {},
  };

  const chatReducer = (state: ChatState, action: any) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            user.uid > action.payload.uid
              ? user.uid + action.payload.uid
              : action.payload.uid + user.uid,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
