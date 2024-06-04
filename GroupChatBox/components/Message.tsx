import * as React from "react";

export type MessageProp = {
  currentUserEmail: string | null;
  userEmailInRecord: string | null;
  userNameInRecord: string | null;
  createdDateTime: string | null;
  chatMessage: string | null;
  recordId: string | null;
};

const Message = ({
  currentUserEmail,
  userEmailInRecord,
  userNameInRecord,
  createdDateTime,
  recordId,
  chatMessage,
}: MessageProp) => {
  const isMessageBelongsToCurrentUser = userEmailInRecord === currentUserEmail;

  return (
    <div
      className={`message-container ${isMessageBelongsToCurrentUser ? "current-user-message-container" : ""}`}
      key={recordId}
    >
      <div className="message-content">{chatMessage}</div>
      <div className="message-username-datetime-container">
        {!isMessageBelongsToCurrentUser ? (
          <div className="message-useranme">{userNameInRecord}</div>
        ) : (
          ""
        )}
        <div className="message-datetime">{createdDateTime}</div>
      </div>
    </div>
  );
};

export default Message;
