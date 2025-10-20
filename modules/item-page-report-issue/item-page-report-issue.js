(function () {
  ("use strict");

  // Use an empty dependency array (or list required modules). The empty string caused the "Module '' is not available" error.
  var app = angular.module("viewCustom", []);

  // ===================================================================
  // ITEM PAGE REPORT ISSUE MODULE
  // ===================================================================
  app.component("prmFullViewServiceContainerAfter", {
    bindings: { parentCtrl: "<" },
    controller: [
      "$timeout",
      function ($timeout) {
        var ctrl = this;

        function getMmsID() {
          try {
            const url = new URL(window.location.href);
            const mms = url.searchParams.get("docid");
            return mms && mms.startsWith("alma")
              ? mms.substring(4)
              : mms || "MMS ID not found";
          } catch (error) {
            console.error("Error parsing URL:", error);
            return "Invalid URL";
          }
        }

        function getCleanItemUrl() {
          try {
            const url = new URL(window.location.href);
            // Keep only essential parameters
            const essentialParams = ["docid", "context", "vid"];
            const cleanUrl = new URL(url.origin + url.pathname);

            essentialParams.forEach((param) => {
              const value = url.searchParams.get(param);
              if (value) {
                cleanUrl.searchParams.append(param, value);
              }
            });

            return cleanUrl.href;
          } catch (error) {
            console.error("Error cleaning URL:", error);
            return window.location.href;
          }
        }

        function getTitle(maxAttempts = 10) {
          return new Promise((resolve) => {
            let attempts = 0;

            function tryGetTitle() {
              try {
                const h3Element = document.querySelector(
                  "prm-full-view h3.item-title"
                );
                if (!h3Element) {
                  throw new Error("Title element not found");
                }

                const spanElement = h3Element.querySelector(
                  "a span[data-field-selector='::title'] prm-highlight span"
                );

                if (!spanElement) {
                  throw new Error("Title span not found");
                }

                const title = spanElement.textContent.trim();
                resolve(title);
              } catch (error) {
                attempts++;
                if (attempts < maxAttempts) {
                  $timeout(tryGetTitle, 300);
                } else {
                  resolve("");
                }
              }
            }

            tryGetTitle();
          });
        }

        function generateSurveyLink(title) {
          const baseUrl =
            "https://umdsurvey.umd.edu/jfe/form/SV_6tAaaE94aXz86hw";
          try {
            const surveyLink = new URL(baseUrl);
            const mms = getMmsID();
            const itemUrl = getCleanItemUrl();

            if (mms === "Invalid URL" || mms === "MMS ID not found") {
              return baseUrl;
            }

            if (!itemUrl || itemUrl === window.location.href) {
              return baseUrl;
            }

            const responseData = {
              QID13: title || "Title not available",
              QID16: mms,
              QID17: itemUrl,
            };

            surveyLink.searchParams.set(
              "Q_PopulateResponse",
              JSON.stringify(responseData)
            );

            return surveyLink.href;
          } catch (error) {
            return baseUrl;
          }
        }

        ctrl.$onInit = function () {
          ctrl.surveyUrl = generateSurveyLink("");

          getTitle().then((title) => {
            if (title) {
              ctrl.surveyUrl = generateSurveyLink(title);
            }
          });
        };
      },
    ],
    template: `
        <div id="issue-report">
            <div class="section-head">
                <div layout="row" layout-align="center center" class="layout-align-center-center layout-row">
                    <h4 class="section-title md-title light-text">Report an Issue</h4>
                    <md-divider flex="" class="md-primoExplore-theme flex"></md-divider>
                </div>
            </div>
            <div class="section-body">
                <p>
                    Encountered a problem with this item? Let us know so we can address it.
                </p>
                <a
                    ng-href="{{$ctrl.surveyUrl}}"
                    target="_blank"
                    id="report-issue-link"
                >Report an Issue
                    <svg
                        id="open-in-new_cache129"
                        width="16px"
                        height="24px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fit=""
                        focusable="false"
                    >
                        <path
                            fill="#e21833"
                            d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                        ></path>
                    </svg>
                </a>
            </div>
        </div>
    `,
  });
})();
