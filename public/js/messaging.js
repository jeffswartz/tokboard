const USER_JWT = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MzY3ODU4OTAsImp0aSI6IjhlMzQ0YWIwLWI2Y2UtMTFlOC1hN2E2LTIzYTUzOWY1MDNhZCIsInN1YiI6ImphbWllIiwiZXhwIjoxNTM2ODcyMjg5LCJhY2wiOnsicGF0aHMiOnsiL3YxL3VzZXJzLyoqIjp7fSwiL3YxL2NvbnZlcnNhdGlvbnMvKioiOnt9LCIvdjEvc2Vzc2lvbnMvKioiOnt9LCIvdjEvZGV2aWNlcy8qKiI6e30sIi92MS9pbWFnZS8qKiI6e30sIi92My9tZWRpYS8qKiI6e30sIi92MS9hcHBsaWNhdGlvbnMvKioiOnt9LCIvdjEvcHVzaC8qKiI6e30sIi92MS9rbm9ja2luZy8qKiI6e319fSwiYXBwbGljYXRpb25faWQiOiJkMjA2M2Y3Ny1hNzVkLTQ1NWMtYmIxOS03NzhjZDBjYTFlMGUifQ.iKUkrBToDebCf8IgiZ3x0L-Fu9YYqGGp_ZLWHSJc-ybL6lTQvj1-eMrRR5k3_9T3SiHNvsN72zKtOnjIPh6Bt7NhssJrwetJ8KrpGnThhqcgieKtaY17UYiY7WBG5BrNCiMtUxW8X56InTXYZS-1kES9nsv1TG0xwP7z_RzgqE8bL_YvLPI2HFE6MBar5nRVtcYy47G5dQaRqUTBiayJHrK4q6NXlmmI6HaFe4PnGFNV1JR4R_MujAkcI2fAXWUFIIhQoUvnUDUTQSP9ZZ1c_vd4uB6f13PlKcmBFuZEKdkLcbdRAdfyNUBn8Abygi7GG2hIKYBKb9dfZTcbCjrWGQ';
const YOUR_CONVERSATION_ID = 'CON-67617129-e7fc-4d8a-b224-bfee58b7f0e3';
const voices = ['Salli', 'Joey', 'Naja', 'Mads', 'Marlene', 'Hans', 'Nicole', 'Russell', 'Amy', 'Brian', 'Emma', 'Geraint', 'Gwyneth', 'Raveena', 'Chipmunk', 'Eric', 'Ivy', 'Jennifer', 'Justin', 'Kendra', 'Kimberly', 'Conchita', 'Enrique', 'Penelope', 'Miguel', 'Chantal', 'Celine', 'Mathieu', 'Dora', 'Karl', 'Carla', 'Giorgio', 'Liv', 'Lotte', 'Ruben', 'Agnieszka', 'Jacek', 'Ewa', 'Jan', 'Maja', 'Vitoria', 'Ricardo', 'Cristiano', 'Ines', 'Carmen', 'Maxim', 'Tatyana', 'Astrid', 'Filiz', 'Mizuki', 'Seoyeon'];
const englishVoices = ['Salli', 'Joey', 'Marlene', 'Hans', 'Nicole', 'Russell', 'Amy', 'Brian', 'Emma', 'Geraint', 'Raveena', 'Chipmunk', 'Eric', 'Ivy', 'Jennifer', 'Justin', 'Kendra', 'Kimberly'];
var storage = {};

class ChatApp {
  constructor() {
    this.joinConversation(USER_JWT);
    this.audio = document.getElementById('audio');
  }

  setupConversationEvents(conversation) {
    this.conversation = conversation;
    conversation.media.enable().then(stream => {
      window.media = conversation.media;
      conversation.media.mute(true);
      // Older browsers may not have srcObject
      if ('srcObject' in this.audio) {
        this.audio.srcObject = stream;
      } else {
        // Avoid using this in new browsers, as it is going away.
        this.audio.src = window.URL.createObjectURL(stream);
      }

      this.audio.onloadedmetadata = () => {
        this.audio.play();
      }
    }).catch(err => {
      console.error('media.enable error', err);
    });

    conversation.on('text', (sender, message) => {
      const claims = message.body.text.split(':');
      const id = claims[0];
      const type = claims[1];
      const msg = claims[2];
      storage[id] = storage[id] || {};
      storage[id][type] = msg;
      if (type == 'question') {
        renderOujaQuestion(storage[id].question, () => {
          renderOuijaAnswer(storage[id].answer || 'Reply hazy, try again', () => {
            const voice = voices[Math.floor(Math.random() * englishVoices.length)];
            conversation.media.sayText({
              text: storage[id].answer || 'Reply hazy, try again',
              voice_name: voice
            });
          });
        });
      }
    });
  }

  joinConversation(userToken) {
    new ConversationClient({
        debug: false
      })
      .login(userToken)
      .then(app => {
        console.log('*** Logged into app', app);
        return app.getConversation(YOUR_CONVERSATION_ID);
      })
      .then(this.setupConversationEvents.bind(this))
      .catch((err) => {
        console.error(err);
      });
  }
}

new ChatApp();
