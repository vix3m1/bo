module.exports = {
  config: {
    name: "antiout",
    eventType: ["log:unsubscribe"]
  },
  run: async function({api,event,box}) {
    const leftParticipantFbId = event.logMessageData.leftParticipantFbId;
    box.send("Anti Out event triggered. Adding user back...");
    await api.addUserToGroup(leftParticipantFbId, event.threadID);
  }
}