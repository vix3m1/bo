const logger = require('./utils/log');
const cron = require('node-cron');
const axios = require("axios")
module.exports = async ({ api }) => {
  const minInterval = 5;
  let lastMessageTime = 0;
  let messagedThreads = new Set();

  const config = {
    autoFriend: {
      status: true,
      time: 1
    },
    autoRestart: {
      status: false,
      time: 20,
      note: 'To avoid problems, enable periodic bot restarts',
    },
    acceptPending: {
      status: true,
      time: 30,
      note: 'Approve waiting messages after a certain time',
    },
    autoPost: {
      status: false,
      time: 20,
      note: "Automatically create a post to keep the bot running."
    }
  };

function autoFriend(config) {
		if (config.status) {
			cron.schedule(`*/${config.time} * * * *`, async () => {
				const form = {
					av: api.getCurrentUserID(),
					fb_api_req_friendly_name: "FriendingCometFriendRequestsRootQueryRelayPreloader",
					fb_api_caller_class: "RelayModern",
					doc_id: "4499164963466303",
					variables: JSON.stringify({input: {scale: 3}})
				};
				const listRequest = JSON.parse(await api.httpPost("https://www.facebook.com/api/graphql/", form)).data.viewer.friending_possibilities.edges;
				if (listRequest[0]) {
					const _form = {
						av: api.getCurrentUserID(),
						fb_api_caller_class: "RelayModern",
						variables: {
							input: {
								source: "friends_tab",
								actor_id: api.getCurrentUserID(),
								client_mutation_id: Math.round(Math.random() * 19).toString()
							},
							scale: 3,
							refresh_num: 0
						}
					};

					const success = [];
					const failed = [];

					_form.fb_api_req_friendly_name = "FriendingCometFriendRequestConfirmMutation";
					_form.doc_id = "3147613905362928";

					let targetIDs = [];
					const lengthList = listRequest.length;
					for (let i = 1; i <= lengthList; i++) targetIDs.push(i);

					const newTargetIDs = [];
					const promiseFriends = [];

					for (const stt of targetIDs) {
						const u = listRequest[parseInt(stt) - 1];
						if (!u) {
							failed.push(`Can't find stt ${stt} in the list`);
							continue;
						}
						_form.variables.input.friend_requester_id = u.node.id;
						_form.variables = JSON.stringify(_form.variables);
						newTargetIDs.push(u);
						promiseFriends.push(api.httpPost("https://www.facebook.com/api/graphql/", _form));
						_form.variables = JSON.parse(_form.variables);
					}

					const lengthTarget = newTargetIDs.length;
					for (let i = 0; i < lengthTarget; i++) {
						try {
							const friendRequest = await promiseFriends[i];
							if (JSON.parse(friendRequest).errors) failed.push(newTargetIDs[i].node.name);
							else success.push(newTargetIDs[i].node.name);
						} catch(e) {
							failed.push(newTargetIDs[i].node.name);
						}
					}

					let _names = '==👾Auto-Accepted👾==';
					let i = 0;
					for (const user of listRequest) {
						i++;
						api.sendMessage(`Friend Request was approved. (This is an auto message)`, user.node.id);
						_names += (`\n${i}. Name: ${user.node.name}` + `\nID: ${user.node.id}` + `\nUrl: ${user.node.url.replace("www.facebook", "fb")}`);
					}

					// Send report to the specified thread ID
					api.sendMessage(_names, reportThreadId);
				}
			});
		}
}

  
  async function autoPost(config) {
    if(config.status) {
      cron.schedule(`*/${config.time} * * * *`, async () => {
        logger.log(`Started autopost every ${config.time}!`, 'Auto Post')
        try {
          const {data: result} = await axios.get("https://dummyjson.com/quotes/random");
        
        await api.createPost(`[ ${result.author} ]\n\n— ${result.quote}`)
        } catch (e) {
          console.error(e)
        }
        
      })
    }
  }
  function autoRestart(config) {
    if (config.status) {
      cron.schedule(`*/${config.time} * * * *`, () => {
        logger.log('Start rebooting the system!', 'Auto Restart');
        process.exit(1);
      });
    }
  }

  function acceptPending(config) {
    if (config.status) {
      cron.schedule(`*/${config.time} * * * *`, async () => {
        const list = [
          ...(await api.getThreadList(1, null, ['PENDING'])),
          ...(await api.getThreadList(1, null, ['OTHER'])),
        ];
        if (list[0]) {
          api.sendMessage('You have been approved for the queue. (This is an automated message)', list[0].threadID);
        }
      });
    }
  }
  autoPost(config.autoPost)
  autoRestart(config.autoRestart);
  acceptPending(config.acceptPending);
  autoFriend(config.autoFriend);

  // AUTOGREET EVERY 10 MINUTES
  cron.schedule('*/10 * * * *', () => {
    const currentTime = Date.now();
    if (currentTime - lastMessageTime < minInterval) {
      console.log("Skipping message due to rate limit");
      return;
    }
    api.getThreadList(25, null, ['INBOX'], async (err, data) => {
      if (err) return console.error("Error [Thread List Cron]: " + err);
      let i = 0;
      let j = 0;

      async function message(thread) {
        try {
          console.log("Meh")
        } catch (error) {
          console.error("Error sending a message:", error);
        }
      }

      while (j < 20 && i < data.length) {
        if (data[i].isGroup && data[i].name != data[i].threadID && !messagedThreads.has(data[i].threadID)) {
          await message(data[i]);
          j++;
          const CuD = data[i].threadID;
          setTimeout(() => {
            messagedThreads.delete(CuD);
          }, 1000);
        }
        i++;
      }
    });
  }, {
    scheduled: false, // Set this to false to turn it off
    timezone: "Asia/Manila"
  });

  // AUTOGREET EVERY 30 MINUTES
  cron.schedule('*/30 * * * *', () => {
    const currentTime = Date.now();
    if (currentTime - lastMessageTime < minInterval) {
      console.log("Skipping message due to rate limit");
      return;
    }
    api.getThreadList(25, null, ['INBOX'], async (err, data) => {
      if (err) return console.error("Error [Thread List Cron]: " + err);
      let i = 0;
      let j = 0;

      async function message(thread) {
        try {
          api.sendMessage({
            body: `Hey There! How are you`
          }, thread.threadID, (err) => {
            if (err) return;
            messagedThreads.add(thread.threadID);

          });
        } catch (error) {
          console.error("Error sending a message:", error);
        }
      }


      while (j < 20 && i < data.length) {
        if (data[i].isGroup && data[i].name != data[i].threadID && !messagedThreads.has(data[i].threadID)) {
          await message(data[i]);
          j++;
          const CuD = data[i].threadID;
          setTimeout(() => {
            messagedThreads.delete(CuD);
          }, 1000);
        }
        i++;
      }
    });
  }, {
    scheduled: false, // Set this to false to turn it off
    timezone: "Asia/Manila"
  });
};


	
	