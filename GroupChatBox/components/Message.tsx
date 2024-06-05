import * as React from "react";

export type MessageProp = {
  currentUserEmail: string | null;
  userEmailInRecord: string | null;
  userNameInRecord: string | null;
  createdDateTime: string | null;
  chatMessage: string | null;
  recordId: string | null;
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
};

const Message = ({
  currentUserEmail,
  userEmailInRecord,
  userNameInRecord,
  createdDateTime,
  recordId,
  chatMessage,
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
}: MessageProp) => {
  const isMessageBelongsToCurrentUser = userEmailInRecord === currentUserEmail;

  return (
    <div
      className={`message-container ${isMessageBelongsToCurrentUser ? "current-user-message-container" : ""}`}
      style={{
        backgroundColor: isMessageBelongsToCurrentUser
          ? (currentUserMessageBackgroundColor as string)
          : (userMessageBackgroundColor as string),
        color: isMessageBelongsToCurrentUser
          ? (currentUserMessageColor as string)
          : (userMessageColor as string),
        border: `2px solid ${
          isMessageBelongsToCurrentUser
            ? (currentUserMessageBorderColor as string)
            : (userMessageBorderColor as string)
        }`,
      }}
      key={recordId}
    >
      <div
        className="message-content"
        style={{
          fontSize: messageFontSize as string,
        }}
      >
        {chatMessage}
      </div>
      <div
        className="message-username-datetime-container"
        style={{
          backgroundColor: isMessageBelongsToCurrentUser
            ? (currentUserMetaMessageBackgroundColor as string)
            : (userMetaMessageBackgroundColor as string),
          color: isMessageBelongsToCurrentUser
            ? (currentUserMetaMessageColor as string)
            : (userMetaMessageColor as string),
        }}
      >
        {!isMessageBelongsToCurrentUser ? (
          <div
            className="message-useranme"
            style={{
              fontSize: messageMetaDataFontSize as string,
            }}
          >
            {userNameInRecord}
          </div>
        ) : (
          ""
        )}
        <div
          className="message-datetime"
          style={{
            fontSize: messageMetaDataFontSize as string,
          }}
        >
          {createdDateTime}
        </div>
      </div>
    </div>
  );
};

export default Message;
