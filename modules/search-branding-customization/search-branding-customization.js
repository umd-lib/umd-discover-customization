(function () {
  ("use strict");

  // Use an empty dependency array (or list required modules). The empty string caused the "Module '' is not available" error.
  var app = angular.module("viewCustom", []);

  // ===================================================================
  // SEARCH BRANDING CUSTOMIZATIONS MODULE
  // ===================================================================
  var LocalViewID = void 0;
  var LocalViewPath = void 0;

  var curURL = new URL(window.location.href);
  var vid = curURL.searchParams.get("vid");
  if (vid != "") {
    LocalViewID = vid;
    LocalViewPath = "/discovery/custom/" + vid.replace(":", "-");
    console.log("View variables: " + LocalViewID + " and " + LocalViewPath);
  } else {
    LocalViewID = "01USMAI_UMCP:UMCP";
    LocalViewPath = "/discovery/custom/01USMAI_UMCP";
    console.log(
      "Warning: unable to deduce view variables; defaulting to " +
        LocalViewID +
        " and " +
        LocalViewPath
    );
  }

  // Make view variables globally available
  app.constant("LocalViewID", LocalViewID);
  app.constant("LocalViewPath", LocalViewPath);

  app.component("prmSearchBarAfter", {
    bindings: { parentCtrl: "<" },
    template: `
      <div id="umddiscoverLogoContainer" ng-class="(!$ctrl.parentCtrl.advancedSearch ? 'simple-mode' : 'advanced-mode')">
        <a href="/discovery/search?vid={{LocalViewID}}&lang=en" id="umddiscoverLogo" aria-label="Go to UMD Discover homepage">
            <span class="logo"></span>
        </a>
      </div>
    `,
    controller: function controller($scope, $element) {
      this.$onInit = function () {
        {
          /*
          The search scope DOM elements just can't be configured until they're
          loaded.
           Race condition hack - keep checking until the elements can be
          removed. We only do this every 500ms to avoid pegging CPU since Primo
          could change on us at any time and make this code just run forever.
        */
          if (!this.parentCtrl.advancedSearch) {
            var scopes_delay_hack = function scopes_delay_hack() {
              var elem = document.querySelectorAll(
                'md-option[value="JuvenileCollection"], md-option[value="SCUA"]'
              );
              if (elem.length > 0) {
                angular.element(elem).remove();
                clearInterval(scopeHackInterval);
              }
            };

            var scopeHackInterval = setInterval(scopes_delay_hack, 500);
          }
        }
      };

      this.$postLink = function () {
        var row = '<div layout="row" class="layout-row flex-100"></div>';
        row = angular.element(row);

        var link = $element.find("div");

        var flexes = $element
          .parent()[0]
          .querySelectorAll(".search-wrapper.layout-row>div");
        var flexFirst = angular.element(flexes[0]);
        var flexSecond = angular.element(flexes[1]);

        flexFirst.append(link);
        flexFirst.attr("flex", 100);
        flexFirst.addClass("flex-100");
        flexFirst.removeClass("flex-0");
        flexFirst.attr("flex-lg", 20);
        flexFirst.addClass("flex-lg-20");
        flexFirst.removeClass("flex-lg-10");
        flexFirst.attr("flex-xl", 20);
        flexFirst.addClass("flex-xl-20");
        flexFirst.removeClass("flex-xl-25");

        flexSecond.attr("flex-md", 85);
        flexSecond.addClass("flex-md-85");
        flexSecond.removeClass("flex-md-75");
        flexSecond.attr("flex-lg", 80);
        flexSecond.addClass("flex-lg-80");
        flexSecond.removeClass("flex-lg-65");
        flexSecond.attr("flex-xl", 65);
        flexSecond.addClass("flex-xl-65");
        flexSecond.removeClass("flex-xl-50");

        row.append(flexes[1]);
        row.append(flexes[2]);
        row.append(flexes[3]);
        flexFirst.after(row);

        flexFirst.parent().addClass("layout-md-column");
        flexFirst.parent().addClass("layout-sm-column");
        flexFirst.parent().addClass("layout-xs-column");
      };
    },
  });
})();
