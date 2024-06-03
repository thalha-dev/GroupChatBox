import * as React from "react";

type DataSet = ComponentFramework.PropertyTypes.DataSet;

export type ChatBoxProp = {
  chatDataset: DataSet;
  userEmail: string | null;
  projectId: string | null;
};

export const ChatBox = (props: ChatBoxProp): React.JSX.Element => {
  return <div></div>;
};
