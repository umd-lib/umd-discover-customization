(function () {
  ("use strict");

  // Use an empty dependency array (or list required modules). The empty string caused the "Module '' is not available" error.
  var app = angular.module("viewCustom", []);

  // ===================================================================
  // ACCOUNT LOAN ITEMS OVERVIEW MODULE
  // ===================================================================
  app.component("prmAccountOverviewAfter", {
    bindings: { parentCtrl: "<" },
    template: `<div class="dialog-container">
        <dialog class="umd-lib">
            <div class="dialog-header">
                <h1 id="dialog-title">Loan List</h1>
                <button 
                    type="button"
                    class="close-button"
                    aria-label="Close dialog"
                    id="close-dialog">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <path d="M18 6.5L6 18.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6 6.5L18 18.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                </button>
            </div>
            <div id="dialog-description" class="sr-only">
                This dialog displays all of your current library loans and their due dates
            </div>
            <section aria-label="Loan summary" role="region">
                <div id="status-message" aria-live="polite" aria-atomic="true"></div>
            </section>
            <div id="loan-list" role="main">
                <!-- Loan items will be dynamically inserted here -->
            </div>
        </dialog>
        <button
            id="open-dialog"
            class="umd-lib"
            aria-label="See all loans">View All Loans</button>
    </div>`,
    controller: "UmdLoanController",
  });

  app.controller("UmdLoanController", [
    "$timeout",
    "$interval",
    function ($timeout, $interval) {
      var ctrl = this;
      ctrl.apiResponses = [];
      ctrl.currentInstitution = null;

      $timeout(function () {
        const dialog = document.querySelector("dialog");
        const showButton = document.getElementById("open-dialog");
        const closeButton = document.getElementById("close-dialog");

        if (showButton) {
          showButton.addEventListener("click", () => {
            if (dialog) dialog.showModal();
            ctrl.clearAllData();
            document.getElementById("status-message").innerHTML =
              "<p>loading...</p><p>Please be patient while we are gathering information for you.</p>";
            ctrl
              .clickThroughWithApiMonitoring({
                delay: 3000,
                monitorApi: true,
              })
              .then((apiResponses) => {
                const extractedData = ctrl.extractLoanData(apiResponses);
                const statistics = ctrl.calculateLoanStatistics(extractedData);
                let summaryHtml = `
                                <div class="loan-summary">
                                    <h2>A summary of all your loan items.</h2>
                                    <div class="statistics" role="list" aria-label="Loan statistics">
                                        <div role="listitem" class="stat-items">
                                            <div class="stat-item total-items" aria-labelledby="total-items-label">
                                                <span>Total Loan Items</span>
                                                <span>${statistics.total}</span>
                                            </div>
                                            ${
                                              statistics.overdue > 0
                                                ? `<div class="stat-item overdue" aria-labelledby="overdue-label"><span>Items Past Due</span><span>${statistics.overdue}</span></div>`
                                                : ""
                                            }
                                            ${
                                              statistics.dueToday > 0
                                                ? `<div class="stat-item due-today" aria-labelledby="due-today-label"><span>Items Due Today</span><span>${statistics.dueToday}</span></div>`
                                                : ""
                                            }
                                        </div>
                                    </div>
                                </div>`;
                document.getElementById("status-message").innerHTML =
                  summaryHtml;
                const loanListDiv = document.getElementById("loan-list");
                if (loanListDiv) {
                  loanListDiv.innerHTML = ctrl.renderLoanItems(extractedData);
                }
              })
              .catch(() => {
                document.getElementById("status-message").innerHTML =
                  "<p>Error occurred while gathering loan information</p>";
              });
          });
        }

        if (closeButton) {
          closeButton.addEventListener("click", () => {
            ctrl.clearAllData();
            if (dialog) dialog.close();
          });
        }
      }, 100);

      ctrl.clickThroughActiveInstitutions = function (options = {}) {
        const {
          delay = 2000,
          onInstitutionClick = null,
          onComplete = null,
        } = options;
        const activeInstitutions = document.querySelectorAll(
          'md-list-item:has([aria-label="Has activity"]) .institution-name'
        );
        if (activeInstitutions.length === 0) return;
        let currentIndex = 0;
        const clickedInstitutions = [];
        function clickNextActive() {
          if (currentIndex >= activeInstitutions.length) {
            ctrl.currentInstitution = null;
            if (onComplete) onComplete(clickedInstitutions);
            return;
          }
          const button = activeInstitutions[currentIndex];
          const institutionName = button.textContent.trim();
          ctrl.currentInstitution = {
            name: institutionName,
            index: currentIndex,
          };
          clickedInstitutions.push({
            index: currentIndex,
            name: institutionName,
            element: button,
            hasActivity: true,
          });
          button.click();
          if (onInstitutionClick) {
            onInstitutionClick({
              index: currentIndex,
              name: institutionName,
              element: button,
              hasActivity: true,
            });
          }
          currentIndex++;
          $timeout(clickNextActive, delay);
        }
        clickNextActive();
      };

      ctrl.clickThroughWithApiMonitoring = function (options = {}) {
        const { delay = 1, monitorApi = true } = options;
        let apiCalls = [];
        let apiResponses = [];
        let originalFetch, originalXHR, originalXHRSend;
        return new Promise((resolve) => {
          if (monitorApi) {
            originalFetch = window.fetch;
            originalXHR = XMLHttpRequest.prototype.open;
            originalXHRSend = XMLHttpRequest.prototype.send;
            window.fetch = function (...args) {
              const url = args[0];
              let fetchPromise = originalFetch.apply(this, args);
              if (
                typeof url === "string" &&
                (url.includes("loan") || url.includes("primo"))
              ) {
                apiCalls.push({ type: "fetch", url, timestamp: Date.now() });
                fetchPromise = fetchPromise.then(async (response) => {
                  try {
                    const cloned = response.clone();
                    let data;
                    const contentType =
                      cloned.headers.get("content-type") || "";
                    if (contentType.includes("application/json")) {
                      data = await cloned.json();
                    } else {
                      data = await cloned.text();
                    }
                    const responseObj = {
                      type: "fetch",
                      url,
                      data,
                      timestamp: Date.now(),
                      institution: ctrl.currentInstitution
                        ? {
                            name: ctrl.currentInstitution.name,
                            index: ctrl.currentInstitution.index,
                          }
                        : null,
                    };
                    apiResponses.push(responseObj);
                    ctrl.apiResponses.push(responseObj);
                  } catch (e) {}
                  return response;
                });
              }
              return fetchPromise;
            };
            XMLHttpRequest.prototype.open = function (method, url) {
              this._umdLoanUrl = url;
              this._umdLoanMethod = method;
              return originalXHR.apply(this, arguments);
            };
            XMLHttpRequest.prototype.send = function () {
              if (
                this._umdLoanUrl &&
                (this._umdLoanUrl.includes("/loan") ||
                  this._umdLoanUrl.includes("primo"))
              ) {
                apiCalls.push({
                  type: "xhr",
                  method: this._umdLoanMethod,
                  url: this._umdLoanUrl,
                  timestamp: Date.now(),
                });
                this.addEventListener("load", function () {
                  let data = this.responseText;
                  try {
                    let parsed;
                    try {
                      parsed = JSON.parse(data);
                    } catch {
                      parsed = data;
                    }
                    const responseObj = {
                      type: "xhr",
                      url: this._umdLoanUrl,
                      data: parsed,
                      timestamp: Date.now(),
                      institution: ctrl.currentInstitution
                        ? {
                            name: ctrl.currentInstitution.name,
                            index: ctrl.currentInstitution.index,
                          }
                        : null,
                    };
                    apiResponses.push(responseObj);
                    ctrl.apiResponses.push(responseObj);
                  } catch (e) {}
                });
              }
              return originalXHRSend.apply(this, arguments);
            };
          }
          ctrl.clickThroughActiveInstitutions({
            delay,
            onInstitutionClick: () => {},
            onComplete: () => {
              if (monitorApi) {
                if (originalFetch) window.fetch = originalFetch;
                if (originalXHR) XMLHttpRequest.prototype.open = originalXHR;
                if (originalXHRSend)
                  XMLHttpRequest.prototype.send = originalXHRSend;
              }
              $timeout(() => {
                resolve(ctrl.apiResponses);
              }, 2000);
            },
          });
        });
      };

      ctrl.renderLoanItems = function (institutionData) {
        let html = "";
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        function getDueStatus(dueDateString) {
          if (!dueDateString) return { text: "Due", class: "due" };
          const dateParts = dueDateString.split("/");
          if (dateParts.length !== 3) return { text: "Due", class: "due" };
          const dueDate = new Date(
            dateParts[2],
            dateParts[0] - 1,
            dateParts[1]
          );
          dueDate.setHours(0, 0, 0, 0);
          if (today.getTime() === dueDate.getTime()) {
            return { text: "Due Today", class: "due-today" };
          } else if (today > dueDate) {
            return { text: "Past Due", class: "overdue" };
          } else {
            return { text: "Due Soon", class: "due" };
          }
        }
        institutionData.forEach((institutionObj) => {
          html += `
            <section class="institution-container" aria-labelledby="institution-heading">
                <h2>${institutionObj.institution.name}</h2>`;
          institutionObj.loans.forEach((loan) => {
            const dueStatus = getDueStatus(loan.duedate);
            html += `
            <article aria-labelledby="loan-title">
                <h3>${loan.title}</h3>
                <dl>
                    <dt class="${dueStatus.class}" aria-label="Loan status">${dueStatus.text}</dt>
                    <dd aria-label="Due date">${loan.duedate}</dd>
                </dl>
            </article>
            `;
          });
          html += `</section>`;
        });
        return html;
      };

      ctrl.extractLoanData = function (apiResponse) {
        const institutionMap = new Map();
        apiResponse.forEach((responseObj) => {
          const loans = responseObj?.data?.data?.loans?.loan;
          if (loans && Array.isArray(loans) && responseObj.institution) {
            function formatDueDate(dateString) {
              if (dateString && dateString.length === 8) {
                const year = dateString.substring(0, 4);
                const month = dateString.substring(4, 6);
                const day = dateString.substring(6, 8);
                return `${month}/${day}/${year}`;
              }
              return dateString;
            }
            const institutionKey = responseObj.institution.name;
            if (!institutionMap.has(institutionKey)) {
              institutionMap.set(institutionKey, {
                institution: responseObj.institution,
                loans: [],
              });
            }
            loans.forEach((loan) => {
              institutionMap.get(institutionKey).loans.push({
                title: loan.title,
                duedate: formatDueDate(loan.duedate),
              });
            });
          }
        });
        return Array.from(institutionMap.values());
      };

      ctrl.clickInstitutionByName = function (institutionName) {
        const institutions = document.querySelectorAll(".institution-name");
        for (let institution of institutions) {
          if (institution.textContent.includes(institutionName)) {
            ctrl.currentInstitution = {
              name: institution.textContent.trim(),
              index: -1,
            };
            institution.click();
            return true;
          }
        }
        return false;
      };

      ctrl.calculateLoanStatistics = function (institutionData) {
        let totalItems = 0;
        let overdueItems = 0;
        let dueTodayItems = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        function checkDueStatus(dueDateString) {
          if (!dueDateString) return "unknown";
          const dateParts = dueDateString.split("/");
          if (dateParts.length !== 3) return "unknown";
          const dueDate = new Date(
            parseInt(dateParts[2]),
            parseInt(dateParts[0]) - 1,
            parseInt(dateParts[1])
          );
          dueDate.setHours(0, 0, 0, 0);
          if (today.getTime() === dueDate.getTime()) {
            return "due-today";
          } else if (today > dueDate) {
            return "overdue";
          } else {
            return "due";
          }
        }
        institutionData.forEach((institutionObj) => {
          if (institutionObj.loans && Array.isArray(institutionObj.loans)) {
            institutionObj.loans.forEach((loan) => {
              totalItems++;
              const status = checkDueStatus(loan.duedate);
              if (status === "overdue") {
                overdueItems++;
              } else if (status === "due-today") {
                dueTodayItems++;
              }
            });
          }
        });
        return {
          total: totalItems,
          overdue: overdueItems,
          dueToday: dueTodayItems,
          upcomingOrUnknown: totalItems - overdueItems - dueTodayItems,
          byInstitution: institutionData.map((inst) => {
            let instOverdue = 0;
            let instDueToday = 0;
            let instTotal = inst.loans ? inst.loans.length : 0;
            if (inst.loans) {
              inst.loans.forEach((loan) => {
                const status = checkDueStatus(loan.duedate);
                if (status === "overdue") instOverdue++;
                else if (status === "due-today") instDueToday++;
              });
            }
            return {
              name: inst.institution.name,
              total: instTotal,
              overdue: instOverdue,
              dueToday: instDueToday,
              upcoming: instTotal - instOverdue - instDueToday,
            };
          }),
        };
      };

      ctrl.clearAllData = function () {
        ctrl.apiResponses = [];
        ctrl.currentInstitution = null;
        const statusMessage = document.getElementById("status-message");
        if (statusMessage) {
          statusMessage.innerHTML = "";
        }
        const loanListDiv = document.getElementById("loan-list");
        if (loanListDiv) {
          loanListDiv.innerHTML = "";
        }
      };

      $timeout(function () {
        window.umdLoanController = ctrl;
        window.clickThroughActiveInstitutions =
          ctrl.clickThroughActiveInstitutions;
        window.clickThroughWithApiMonitoring =
          ctrl.clickThroughWithApiMonitoring;
        window.clickInstitutionByName = ctrl.clickInstitutionByName;
      }, 500);
    },
  ]);
})();
