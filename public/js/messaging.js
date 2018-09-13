const USER_JWT = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MzY3ODU4OTAsImp0aSI6IjhlMzQ0YWIwLWI2Y2UtMTFlOC1hN2E2LTIzYTUzOWY1MDNhZCIsInN1YiI6ImphbWllIiwiZXhwIjoxNTM2ODcyMjg5LCJhY2wiOnsicGF0aHMiOnsiL3YxL3VzZXJzLyoqIjp7fSwiL3YxL2NvbnZlcnNhdGlvbnMvKioiOnt9LCIvdjEvc2Vzc2lvbnMvKioiOnt9LCIvdjEvZGV2aWNlcy8qKiI6e30sIi92MS9pbWFnZS8qKiI6e30sIi92My9tZWRpYS8qKiI6e30sIi92MS9hcHBsaWNhdGlvbnMvKioiOnt9LCIvdjEvcHVzaC8qKiI6e30sIi92MS9rbm9ja2luZy8qKiI6e319fSwiYXBwbGljYXRpb25faWQiOiJkMjA2M2Y3Ny1hNzVkLTQ1NWMtYmIxOS03NzhjZDBjYTFlMGUifQ.iKUkrBToDebCf8IgiZ3x0L-Fu9YYqGGp_ZLWHSJc-ybL6lTQvj1-eMrRR5k3_9T3SiHNvsN72zKtOnjIPh6Bt7NhssJrwetJ8KrpGnThhqcgieKtaY17UYiY7WBG5BrNCiMtUxW8X56InTXYZS-1kES9nsv1TG0xwP7z_RzgqE8bL_YvLPI2HFE6MBar5nRVtcYy47G5dQaRqUTBiayJHrK4q6NXlmmI6HaFe4PnGFNV1JR4R_MujAkcI2fAXWUFIIhQoUvnUDUTQSP9ZZ1c_vd4uB6f13PlKcmBFuZEKdkLcbdRAdfyNUBn8Abygi7GG2hIKYBKb9dfZTcbCjrWGQ';
<<<<<<< HEAD
const YOUR_CONVERSATION_ID = 'CON-67617129-e7fc-4d8a-b224-bfee58b7f0e3';
const voices = ['Salli', 'Joey', 'Naja', 'Mads', 'Marlene', 'Hans', 'Nicole', 'Russell', 'Amy', 'Brian', 'Emma', 'Geraint', 'Gwyneth', 'Raveena', 'Chipmunk', 'Eric', 'Ivy', 'Jennifer', 'Justin', 'Kendra', 'Kimberly', 'Conchita', 'Enrique', 'Penelope', 'Miguel', 'Chantal', 'Celine', 'Mathieu', 'Dora', 'Karl', 'Carla', 'Giorgio', 'Liv', 'Lotte', 'Ruben', 'Agnieszka', 'Jacek', 'Ewa', 'Jan', 'Maja', 'Vitoria', 'Ricardo', 'Cristiano', 'Ines', 'Carmen', 'Maxim', 'Tatyana', 'Astrid', 'Filiz', 'Mizuki', 'Seoyeon'];
const englishVoices = ['Salli', 'Joey', 'Marlene', 'Hans', 'Nicole', 'Russell', 'Amy', 'Brian', 'Emma', 'Geraint', 'Raveena', 'Chipmunk', 'Eric', 'Ivy', 'Jennifer', 'Justin', 'Kendra', 'Kimberly'];
var storage = {};

class ChatApp {
  constructor() {
    this.joinConversation(USER_JWT);
    this.audio = document.getElementById('audio');
=======

const YOUR_CONVERSATION_ID = 'CON-67617129-e7fc-4d8a-b224-bfee58b7f0e3';

const voices = ['Salli', 'Joey', 'Naja', 'Mads', 'Marlene', 'Hans', 'Nicole', 'Russell', 'Amy', 'Brian', 'Emma', 'Geraint', 'Gwyneth', 'Raveena', 'Chipmunk', 'Eric', 'Ivy', 'Jennifer', 'Justin', 'Kendra', 'Kimberly', 'Conchita', 'Enrique', 'Penelope', 'Miguel', 'Chantal', 'Celine', 'Mathieu', 'Dora', 'Karl', 'Carla', 'Giorgio', 'Liv', 'Lotte', 'Ruben', 'Agnieszka', 'Jacek', 'Ewa', 'Jan', 'Maja', 'Vitoria', 'Ricardo', 'Cristiano', 'Ines', 'Carmen', 'Maxim', 'Tatyana', 'Astrid', 'Filiz', 'Mizuki', 'Seoyeon'];

const englishVoices = ['Salli', 'Joey', 'Marlene', 'Hans', 'Nicole', 'Russell', 'Amy', 'Brian', 'Emma', 'Geraint', 'Raveena', 'Chipmunk', 'Eric', 'Ivy', 'Jennifer', 'Justin', 'Kendra', 'Kimberly'];

class ChatApp {
  constructor() {
    this.messageTextarea = document.getElementById('messageTextarea')
    this.messageFeed = document.getElementById('messageFeed')
    this.sendButton = document.getElementById('send')
    const userToken = this.authenticate()
    if (userToken) {
      this.joinConversation(userToken)
    }
    this.audio = document.getElementById('audio')
  }

  authenticate() {
    // Your authentication logic would go here.
    return USER_JWT
>>>>>>> fb93c114d43aa70980a5026475c02dac22718c34
  }

  setupConversationEvents(conversation) {
    this.conversation = conversation;
    conversation.media.enable().then(stream => {
<<<<<<< HEAD
      window.media = conversation.media;
      conversation.media.mute(true);
=======
>>>>>>> fb93c114d43aa70980a5026475c02dac22718c34
      // Older browsers may not have srcObject
      if ('srcObject' in this.audio) {
        this.audio.srcObject = stream;
      } else {
        // Avoid using this in new browsers, as it is going away.
        this.audio.src = window.URL.createObjectURL(stream);
      }

      this.audio.onloadedmetadata = () => {
<<<<<<< HEAD
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
=======
        this.audio.play().then(() => setTimeout(() => {
          this.sendMessage('This is a Team Voldemort demo.');
        }, 1000));
      }
    }).catch(err => console.error('media.enable error', err));

    conversation.on('text', (sender, message) => {
      console.log('*** Message received', sender.id, message.body.text);
      let dateStr = new Date(Date.parse(message.timestamp)).toString();
      dateStr = dateStr.substring(dateStr.indexOf('2018') + 4, dateStr.indexOf('GMT'));
      const voice = englishVoices[Math.floor(Math.random() * englishVoices.length)];
      conversation.media.sayText({
        text: 'Hello, I am ' + voice + '. ' + message.body.text + '. ' + dateStr,
        voice_name: voice
      });
>>>>>>> fb93c114d43aa70980a5026475c02dac22718c34
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
<<<<<<< HEAD
      .catch((err) => {
        console.error(err);
      });
  }
}

new ChatApp();
toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-center",
  "preventDuplicates": true,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

function renderOujaQuestion(questionString, cb) {
  toastr["success"]("asd");
  cb()
}

function renderOuijaAnswer(answerString, cb) {
  cb();
}
=======
      .catch(console.error)
  }

  sendMessage(message) {
    this.conversation.sendText(message).then(() => {
      console.log('Message sent: %s', message);
    }).catch(console.error);
  }
}

new ChatApp();
>>>>>>> fb93c114d43aa70980a5026475c02dac22718c34
