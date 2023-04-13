import Talk from "talkjs";
import { User } from "@/_unsorted/database/schemas";

Talk.ready.then(() => {
  Talk.init({
    appId: "tRh20og1",
    secretKey: "sk_test_Zi6YJIdpOa18lqjWfHNar0NhAJgpnlu2",
  });

  const me = new Talk.User({
    id: "USER_ID_1",
    name: "User 1",
    email: "user1@example.com",
    photoUrl: `https://randomuser.me/api/portraits/men/${this.id}.jpg`,
    welcomeMessage: "Hello, how can I help you?",
  });

  const user2 = new Talk.User({
    id: "USER_ID_2",
    name: "User 2",
    email: "user2@example.com",
    photoUrl: `https://randomuser.me/api/portraits/men/${this.id}.jpg`,
    welcomeMessage: "Hello, how can I help you?",
  });

  if (!window.talkSession) {
    window.talkSession = new Talk.Session({
      appId: "tRh20og1",
      me: me,
    });
  }

  const conversation = Talk.oneOnOneConversation(me, user2);

  conversation.setSubject("Private chat");

  conversation
    .start()
    .then(() => {
      console.log("Conversation started");
    })
    .catch((error) => {
      console.error("Error starting conversation", error);
    });
});
