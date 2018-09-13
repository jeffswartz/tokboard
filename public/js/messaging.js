const USER_JWT = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MzY4NjcxMjQsImp0aSI6ImIxY2ViMDEwLWI3OGItMTFlOC1iNDU3LTJiZTJiNzZkNzNmOCIsInN1YiI6ImphbWllIiwiZXhwIjoxNTM2OTUzNTI0LCJhY2wiOnsicGF0aHMiOnsiL3YxL3VzZXJzLyoqIjp7fSwiL3YxL2NvbnZlcnNhdGlvbnMvKioiOnt9LCIvdjEvc2Vzc2lvbnMvKioiOnt9LCIvdjEvZGV2aWNlcy8qKiI6e30sIi92MS9pbWFnZS8qKiI6e30sIi92My9tZWRpYS8qKiI6e30sIi92MS9hcHBsaWNhdGlvbnMvKioiOnt9LCIvdjEvcHVzaC8qKiI6e30sIi92MS9rbm9ja2luZy8qKiI6e319fSwiYXBwbGljYXRpb25faWQiOiJkMjA2M2Y3Ny1hNzVkLTQ1NWMtYmIxOS03NzhjZDBjYTFlMGUifQ.WaNEJDW_o0QuNFjkMLblRgaBpAlT1P8TF84MWPI8Ga2EGEwYzfQv4P8LpTJ4JCI0zsQNEJ7U3Fu1F1vkJo96ElGmjSwZYli6Ej4RrxV3qHoU5QLWqBSvubLQcUtGJVRifMQxXCk9Cr_zFyHw6DaSrnnwMTOrHowW3a7m5P05pcR78n6hu1XvxqjH6B66ioXImX6htwRwmwwprLBgg8EOjrf6kPAgwQT2V3ncyxIa4-88c8IY8JDx6jV0Th9oGd2MLyP3XnhdoSjBsGt_0lqdJ2K6yMvt8lLccjTQoh-nReJcGcyl6ZsnxGNMhnFN5JjQPh7KdP2l9FnrLjZhYq5Slw';
const YOUR_CONVERSATION_ID = 'CON-67617129-e7fc-4d8a-b224-bfee58b7f0e3';
const voices = ['Salli', 'Joey', 'Marlene', 'Hans', 'Nicole', 'Russell', 'Eric', 'Brian', 'Emma', 'Geraint', 'Raveena', 'Chipmunk', 'Ivy', 'Jennifer', 'Justin', 'Kendra', 'Kimberly'];
var storage = {};
var isRunning = false;

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
      if (type == 'question' && !isRunning) {
        isRunning = true;
        renderOujaQuestion(storage[id].question, () => {
          conversation.media.sayText({
            text: storage[id].question,
            voice_name: voices[Math.floor(Math.random() * voices.length)]
          })
        });
        setTimeout(() => {
          renderOuijaAnswer(storage[id].answer || 'Reply hazy, try again', () => {
            toastr.success(storage[id].answer, 'Answer From The Spirits:');
            conversation.media.sayText({
              text: storage[id].answer || 'Reply hazy, try again',
              voice_name: 'Amy'
            });
          });
          isRunning = false;
        }, 3000);
      }
    });
  };

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
toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-center",
  "preventDuplicates": true,
  "onclick": null,
  "showDuration": "5000",
  "hideDuration": "1000",
  "timeOut": "8000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

function renderOujaQuestion(questionString, cb) {
  toastr.success(questionString, 'New Question For the Spirits:');
  cb();
}

function renderOuijaAnswer(answerString, cb) {
  renderOuijaAnswer(answerString, cb);
}

function updateAnswerToast(char) {

}
