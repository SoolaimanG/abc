"use client";

import { useReducer, createContext } from "react";

type StateProps = {
  messageType: "error" | "warning" | "message" | "loading" | "success" | "none";
  message: string;
};

type ActionProps = {
  type: "error" | "warning" | "message" | "loading" | "success" | "none";
  payload?: string;
};

const INITIAL_STATE: StateProps = {
  messageType: "none",
  message: "",
};

const reducer = (state: StateProps, action: ActionProps) => {
  switch (action.type) {
    case "error":
      return {
        ...state,
        messageType: "error",
        message: action.payload,
      };
    case "loading":
      return {
        ...state,
        messageType: "loading",
        message: action.payload,
      };
    case "message":
      return {
        ...state,
        messageType: "message",
        message: action.payload,
      };
    case "success":
      return {
        ...state,
        messageType: "success",
        message: action.payload,
      };
    case "warning":
      return {
        ...state,
        messageType: "warning",
        message: action.payload,
      };
    case "none":
      return {
        ...state,
        messageType: "none",
        message: action.payload,
      };
    default:
      return state;
  }
};

// Create the context
export const ContextAPI = createContext<{
  state: StateProps;
  dispatch: React.Dispatch<ActionProps>;
}>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

// Create the context provider
export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //@ts-ignore
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE); //TODO: Fix this req quirlling line

  return (
    <ContextAPI.Provider value={{ state, dispatch }}>
      {children}
    </ContextAPI.Provider>
  );
};
