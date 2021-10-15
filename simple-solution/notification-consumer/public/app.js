(function () {
  const messages = document.querySelector('#messages');
  const count = document.querySelector('#count');
  const nounce = document.querySelector('#nounce');
  const notification = document.querySelector('#notification');
  const resetBtn = document.querySelector('#resetBtn');

  function showMessage(message) {
    messages.textContent += `\n${message}`;
    messages.scrollTop = messages.scrollHeight;
  }

  const ws = new WebSocket(`ws://${location.host}`);

    ws.onmessage = function(event) {
      const data = JSON.parse(event.data);
      if (count.value != data.count) {
        count.value = data.count;
        showMessage(data.count+' '+data.info);
        nounce.value = data.body.nounce;
        notification.value = data.body.encodedMessage;
      }
    };

    resetBtn.onclick = function () {
      notification.value = '';
    };

  })();
