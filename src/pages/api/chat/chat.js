import Talk from "talkjs";
import { User } from "../../../_unsorted/database/schemas";

import { useEffect, useState } from 'react';

function MyChatComponent() {
  // wait for TalkJS to load

  const [talkLoaded, markTalkLoaded] = useState(false);

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));

    if (talkLoaded) {
      // Safe to use the SDK here
      const currentUser  = new Talk.User({
        id: "USER_ID_1",
        name: "User 1",
        photoUrl: `https://randomuser.me/api/portraits/men/${this.id}.jpg`,
        welcomeMessage: "Hello",
      });
    
      const otherUser = new Talk.User({
        id: "USER_ID_2",
        name: "User 2",
        email: "user2@example.com",
        photoUrl: `https://randomuser.me/api/portraits/men/${this.id}.jpg`,
        welcomeMessage: "Hello, how can I help you?",
      });

      const session = new Talk.Session({
        appId: 'TALKJS_APPID',
        me: currentUser,
      });

      const conversationId = Talk.oneOnOneId(currentUser, otherUser);
      const conversation = session.getOrCreateConversation(conversationId);
      conversation.setParticipant(currentUser);
      conversation.setParticipant(otherUser);

      conversation.setSubject("Private chat");

      conversation.start()
      .then(() => {
        console.log("Conversation started");
      })
      .catch((error) => {
        console.error("Error starting conversation", error);
      });

      return () => session.destroy();
      
    }
  }, [talkLoaded]);
}


  


