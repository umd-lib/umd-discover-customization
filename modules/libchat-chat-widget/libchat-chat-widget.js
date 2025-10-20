(function () {
  ("use strict");

  // Use an empty dependency array (or list required modules). The empty string caused the "Module '' is not available" error.
  var app = angular.module("viewCustom", []);

  // ===================================================================
  // SPRINGSHARE LIBCHAT CHAT WIDGET MODULE
  // ===================================================================
  app.component("prmTopbarAfter", {
    bindings: { parentCtrl: `<` },
    template: `<umd-chat-widget></umd-chat-widget>`,
  });

  app.component("umdChatWidget", {
    template: `
    <div class="umd-lib chat-widget offline closed" id="chatwidget">
      <button class="cw--header c-bg-primary" id="cw-service-status" 
        onclick="(function() {
          var chatwidget = document.getElementById('chatwidget');
          var chevron = document.getElementById('cw--chevron');
          if (chatwidget.classList.contains('closed')) {
            chatwidget.classList.remove('closed');
            chevron.classList.remove('chevron-ver');
          } else {
            chatwidget.classList.add('closed');
            chevron.classList.add('chevron-ver');
          }
        })()" 
        type="button" aria-label="Open chat with us chat widget">
        <div class="cw--header-info">
          <div class="cw--icon" id="cw--icon" aria-hidden="true"></div>
          <div class="cw--text">Chat With Us!</div>
        </div>
        <div class="cw--header-sub">
          <div class="cw--status" id="cw--status">offline</div>
          <div class="cw--chevron i-chevron-down chevron-ver" id="cw--chevron"></div>
        </div>
      </button>
      <div class="cw--iframe" id="cw--iframe">
        <iframe src="https://umd.libanswers.com/chat/widget/5cffd49b55d69387be9a6fa51e3c5fa59efa09ca025ffc7367db9b7d083f17ec" frameborder="0" id="cw-iframe-window"></iframe>
      </div>
    </div>
    `,
    controller: "UmdChatWidgetController",
  });

  app.controller("UmdChatWidgetController", [
    function () {
      // connect to dept: library chat
      const serviceURL =
        "https://chat-us.libanswers.com/widget_status?iid=450&rules=%5B%7B%22u%22%3A0%2C%22d%22%3A%5B1198%5D%2C%22c%22%3A%22%22%2C%22fallbackSeconds%22%3A0%7D%5D";

      const checkInterval = 30000; // 30 seconds in milliseconds

      // reload the iframe to show correct chatbox page
      function reloadIframe() {
        // addRefererToIframe will update iframe.src when necessary
        addRefererToIframe();
        // no need to reassign iframe.src = iframe.src;
      }

      // add referer to the chat widget iframe
      function addRefererToIframe() {
        const iframe = document.getElementById("cw-iframe-window");
        if (!iframe) return;
        const referer = window.location.href;

        try {
          const url = new URL(iframe.src, window.location.href);
          // Only update if the referer param differs
          if (url.searchParams.get("referer") !== referer) {
            url.searchParams.set("referer", referer);
            iframe.src = url.toString();
            console.log("iframe src updated with referer");
          }
        } catch (e) {
          // Fallback for older environments: only append if referer not present
          if (!/[?&]referer=/.test(iframe.src)) {
            iframe.src =
              iframe.src +
              (iframe.src.indexOf("?") === -1 ? "?" : "&") +
              "referer=" +
              encodeURIComponent(referer);
            console.log("iframe src updated (fallback) with referer");
          }
        }
      }

      // update the chat widget UI
      function updateChatWidgetStatus(status) {
        let widget = document.getElementById("chatwidget");
        let widgetStatus = document.getElementById("cw--status");

        if (status === true) {
          widgetStatus.innerText = "live";
          widget.classList.remove("offline");
        } else {
          widgetStatus.innerText = "offline";
          widget.classList.add("offline");

          // reload the iframe to show correct chat widget page, only reload if the chat widget is offline to prevent disconnecting the user during a chat session
          reloadIframe();
        }
      }

      // check the service status
      function checkServiceStatus() {
        fetch(serviceURL)
          //   check the server status and get the service status
          .then((response) => {
            if (response.status === 200) {
              let data = response.json();
              return data;
            } else {
            }
          })
          // update the chat widget based on the service status
          .then((data) => {
            const awayValue = data.away;
            if (typeof awayValue !== "undefined") {
              updateChatWidgetStatus(true);
            } else {
              updateChatWidgetStatus(false);
            }
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      }

      // initial check
      checkServiceStatus();
      // onely reload the iframe once on initial load, it should not be reloaded again if the chat widget is live to prevent disconnecting the user during a chat session
      reloadIframe();

      // set up a recurring check
      setInterval(checkServiceStatus, checkInterval);
    },
  ]);
})();
