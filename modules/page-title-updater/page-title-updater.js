(function () {
  ("use strict");

  // Use an empty dependency array (or list required modules). The empty string caused the "Module '' is not available" error.
  var app = angular.module("viewCustom", []);

  // ===================================================================
  // TAB TITLE UPDATER UTILITY MODULE
  // ===================================================================
  app.run([
    function () {
      function updateTabTitle() {
        var old = document.title;
        if (old.includes("Ex Libris Discovery")) {
          var newTitle = old.replace("Ex Libris Discovery", "UMD Discover");
          document.title = newTitle;
          console.log("Title updated to: " + newTitle);
        }
      }

      function handleUrlChange() {
        setTimeout(updateTabTitle, 100);
      }

      window.addEventListener("popstate", handleUrlChange);
      window.addEventListener("hashchange", handleUrlChange);

      var urlObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.type === "childList") {
            handleUrlChange();
          }
        });
      });

      urlObserver.observe(document.body, { childList: true, subtree: true });
      updateTabTitle();

      var originalPushState = history.pushState;
      var originalReplaceState = history.replaceState;

      history.pushState = function () {
        var result = originalPushState.apply(this, arguments);
        handleUrlChange();
        return result;
      };
      Object.setPrototypeOf(history.pushState, originalPushState);

      history.replaceState = function () {
        var result = originalReplaceState.apply(this, arguments);
        handleUrlChange();
        return result;
      };
      Object.setPrototypeOf(history.replaceState, originalReplaceState);
    },
  ]);
})();
