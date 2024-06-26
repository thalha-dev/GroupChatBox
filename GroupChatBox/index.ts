import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { ChatBox, ChatBoxProp } from "./components/ChatBox";
import * as React from "react";

import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class GroupChatBox
  implements ComponentFramework.ReactControl<IInputs, IOutputs>
{
  private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
  private notifyOutputChanged: () => void;

  /**
   * Empty constructor.
   */
  constructor() {}

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
  ): void {
    this.notifyOutputChanged = notifyOutputChanged;
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   * @returns ReactElement root react element for the control
   */
  public updateView(
    context: ComponentFramework.Context<IInputs>,
  ): React.ReactElement {
    const props: ChatBoxProp = {
      chatDataset: context.parameters.chatDataset,
      userEmail: context.parameters.userEmail.raw,
      projectId: context.parameters.projectId.raw,
      userEmailColumnName: context.parameters.userEmailColumnName.raw,
      projectIdColumnName: context.parameters.projectIdColumnName.raw,
      messageColumnName: context.parameters.messageColumnName.raw,
      timeZone: context.parameters.timeZone.raw,
      dateColumnName: context.parameters.dateColumnName.raw,
      userName: context.parameters.userName.raw,
      userNameColumnName: context.parameters.userNameColumnName.raw,
      controlWidth:context.parameters.controlWidth.raw,
      controlHeight: context.parameters.controlHeight.raw,
      messageBoxBackgroundColor: context.parameters.messageBoxBackgroundColor.raw,
      messageBoxBorderColor: context.parameters.messageBoxBorderColor.raw,
      userMessageBackgroundColor: context.parameters.userMessageBackgroundColor.raw,
      currentUserMessageBackgroundColor: context.parameters.currentUserMessageBackgroundColor.raw,
      userMessageColor: context.parameters.userMessageColor.raw,
      currentUserMessageColor: context.parameters.currentUserMessageColor.raw,
      messageFontSize: context.parameters.messageFontSize.raw,
      messageMetaDataFontSize:context.parameters.messageMetaDataFontSize.raw,
      userMetaMessageBackgroundColor: context.parameters.userMetaMessageBackgroundColor.raw,
      currentUserMetaMessageBackgroundColor: context.parameters.currentUserMetaMessageBackgroundColor.raw,
      userMetaMessageColor: context.parameters.userMetaMessageColor.raw,
      currentUserMetaMessageColor: context.parameters.currentUserMetaMessageColor.raw,
      userMessageBorderColor: context.parameters.userMessageBorderColor.raw,
      currentUserMessageBorderColor: context.parameters.currentUserMessageBorderColor.raw,
      inputBackgroundColor: context.parameters.inputBackgroundColor.raw,
      inputColor: context.parameters.inputColor.raw,
      inputBorderColor: context.parameters.inputBorderColor.raw,
      sendButtonBackgroundColor: context.parameters.sendButtonBackgroundColor.raw,
      sendButtonColor: context.parameters.sendButtonColor.raw,
      sendButtonBorderColor: context.parameters.sendButtonBorderColor.raw,
    };
    return React.createElement(ChatBox, props);
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
   */
  public getOutputs(): IOutputs {
    return {};
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
  }
}
