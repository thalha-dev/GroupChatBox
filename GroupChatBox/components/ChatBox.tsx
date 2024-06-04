import * as React from "react";
import { getDateTimeString } from "../utils/getDateTimeString";
import Message from "./Message";

type DataSet = ComponentFramework.PropertyTypes.DataSet;

export type ChatBoxProp = {
  chatDataset: DataSet;
  userEmail: string | null;
  projectId: string | null;
  userEmailColumnName: string | null;
  projectIdColumnName: string | null;
  messageColumnName: string | null;
  timeZone: string | null;
  dateColumnName: string | null;
  userName: string | null;
  userNameColumnName: string | null;
};

export const ChatBox: React.FC<ChatBoxProp> = React.memo(
  ({
    chatDataset,
    messageColumnName,
    userEmailColumnName,
    userEmail,
    projectId,
    projectIdColumnName,
    dateColumnName,
    timeZone,
    userNameColumnName,
    userName,
  }: ChatBoxProp): React.JSX.Element => {
    const [message, setMessage] = React.useState("");
    const messageContainerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (messageContainerRef.current) {
        messageContainerRef.current.scrollTop =
          messageContainerRef.current.scrollHeight;
      }
    }, [chatDataset]);

    const records: {
      [id: string]: ComponentFramework.PropertyHelper.DataSetApi.EntityRecord;
    } = chatDataset.records;

    const chatMessageArray = Object.keys(records)
      .filter((recordId) => {
        const record = records[recordId];

        const chatProjectId = record.getFormattedValue(
          projectIdColumnName as string,
        );

        if (chatProjectId === projectId) {
          return true;
        } else {
          return false;
        }
      })
      .map((recordId) => {
        const record = records[recordId];

        const chatMessage = record.getFormattedValue(
          messageColumnName as string,
        );
        const userNameInRecord = record.getFormattedValue(
          userNameColumnName as string,
        );

        const userEmailInRecord = record.getFormattedValue(
          userEmailColumnName as string,
        );

        const createdDateTime = record.getFormattedValue(
          dateColumnName as string,
        );

        return (
          <Message
            key={recordId}
            recordId={recordId}
            createdDateTime={createdDateTime}
            userNameInRecord={userNameInRecord}
            currentUserEmail={userEmail}
            userEmailInRecord={userEmailInRecord}
            chatMessage={chatMessage}
          />
        );
      });

    const handleMessageChange = (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      setMessage(event.target.value);
    };

    const addNewMessage = async () => {
      if (message === "") {
        return;
      }

      try {
        //@ts-ignore
        let record = await chatDataset.newRecord();
        //@ts-ignore
        await record.setValue(messageColumnName, message);
        //@ts-ignore
        await record.setValue(userEmailColumnName, userEmail);
        //@ts-ignore
        await record.setValue(projectIdColumnName, projectId);
        //@ts-ignore
        await record.setValue(dateColumnName, getDateTimeString(timeZone));
        //@ts-ignore
        await record.setValue(userNameColumnName, userName);

        // @ts-ignore
        await record.save();

        setMessage("");
      } catch (error) {
        console.log(error);
      }
    };

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        addNewMessage();
      }
    };

    const handleButtonClick = async () => {
      addNewMessage();
    };

    return (
      <div>
        <h2>Chat Messages</h2>
        <div className="all-message-container" ref={messageContainerRef}>
          {chatMessageArray ? chatMessageArray : ""}
        </div>

        <input
          type="text"
          placeholder="Name"
          value={message}
          onChange={handleMessageChange}
          onKeyUp={handleKeyUp}
        />
        <button onClick={handleButtonClick}>Create Record</button>
      </div>
    );
  },
);

ChatBox.displayName = "ChatBox";
