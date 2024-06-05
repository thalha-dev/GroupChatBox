import * as React from "react";
import { getDateTimeString } from "../utils/getDateTimeString";
import Message from "./Message";
import { IoMdArrowRoundUp } from "react-icons/io";

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
  controlWidth: string | null;
  controlHeight: string | null;
  messageBoxBackgroundColor: string | null;
  messageBoxBorderColor: string | null;
  userMessageBackgroundColor: string | null;
  currentUserMessageBackgroundColor: string | null;
  userMessageColor: string | null;
  currentUserMessageColor: string | null;
  messageFontSize: string | null;
  messageMetaDataFontSize: string | null;
  userMetaMessageBackgroundColor: string | null;
  currentUserMetaMessageBackgroundColor: string | null;
  userMetaMessageColor: string | null;
  currentUserMetaMessageColor: string | null;
  userMessageBorderColor: string | null;
  currentUserMessageBorderColor: string | null;
  inputBackgroundColor: string | null;
  inputColor: string | null;
  inputBorderColor: string | null;
  sendButtonBackgroundColor: string | null;
  sendButtonColor: string | null;
  sendButtonBorderColor: string | null;
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
    controlWidth,
    controlHeight,
    messageBoxBackgroundColor,
    userMessageBackgroundColor,
    currentUserMessageBackgroundColor,
    userMessageColor,
    currentUserMessageColor,
    messageFontSize,
    messageMetaDataFontSize,
    userMetaMessageBackgroundColor,
    currentUserMetaMessageBackgroundColor,
    userMetaMessageColor,
    currentUserMetaMessageColor,
    userMessageBorderColor,
    currentUserMessageBorderColor,
    inputBackgroundColor,
    inputColor,
    inputBorderColor,
    sendButtonBackgroundColor,
    sendButtonColor,
    sendButtonBorderColor,
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
            userMessageBackgroundColor={userMessageBackgroundColor}
            currentUserMessageBackgroundColor={
              currentUserMessageBackgroundColor
            }
            userMessageColor={userMessageColor}
            currentUserMessageColor={currentUserMessageColor}
            messageFontSize={messageFontSize}
            messageMetaDataFontSize={messageMetaDataFontSize}
            userMetaMessageBackgroundColor={userMetaMessageBackgroundColor}
            currentUserMetaMessageBackgroundColor={
              currentUserMetaMessageBackgroundColor
            }
            userMetaMessageColor={userMetaMessageColor}
            currentUserMetaMessageColor={currentUserMetaMessageColor}
            userMessageBorderColor={userMessageBorderColor}
            currentUserMessageBorderColor={currentUserMessageBorderColor}
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
      <div
        className="message-app-container"
        style={{
          width: controlWidth as string,
          height: controlHeight as string,
        }}
      >
        <div
          className="all-message-container"
          ref={messageContainerRef}
          style={{
            backgroundColor: messageBoxBackgroundColor as string,
            borderColor: userMessageBackgroundColor as string,
          }}
        >
          {chatMessageArray ? chatMessageArray : ""}
        </div>

        <div className="message-input-container">
          <input
            className="message-input"
            type="text"
            placeholder="Name"
            value={message}
            onChange={handleMessageChange}
            onKeyUp={handleKeyUp}
            style={{
              backgroundColor: inputBackgroundColor as string,
              color: inputColor as string,
              border: `2px solid ${inputBorderColor as string}`,
              fontSize: messageFontSize as string,
            }}
          />
          <button
            className="message-send-button"
            onClick={handleButtonClick}
            style={{
              backgroundColor: sendButtonBackgroundColor as string,
              color: sendButtonColor as string,
              border: `2px solid ${sendButtonBorderColor as string}`,
            }}
          >
            <IoMdArrowRoundUp />
          </button>
        </div>
      </div>
    );
  },
);

ChatBox.displayName = "ChatBox";
