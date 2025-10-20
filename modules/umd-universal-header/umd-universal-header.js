(function () {
  ("use strict");

  // Use an empty dependency array (or list required modules). The empty string caused the "Module '' is not available" error.
  var app = angular.module("viewCustom", []);

  // ===================================================================
  // UMD UNIVERSAL HEADER MODULE
  // ===================================================================
  app.component("prmTopBarBefore", {
    bindings: { parentCtrl: `<` },
    template: `<umd-universal-header></umd-universal-header>`,
  });

  app.component("umdUniversalHeader", {
    template: `
      <div id="umd-universal-header"></div>`,
    bindings: { parentCtrl: "<" },
    controller: "UmdUtilityHeaderControllor",
  });

  app.controller("UmdUtilityHeaderControllor", [
    "$element",
    "$timeout",
    function ($element, $timeout) {
      // Wait until the component DOM is linked, then find the header div and attach shadow DOM.
      this.$postLink = function () {
        $timeout(function () {
          const hostContainer =
            $element[0].querySelector("#umd-universal-header") || $element[0];
          if (!hostContainer) {
            console.error("umd-universal-header element not found");
            return;
          }
          const shadowRoot = hostContainer.attachShadow({ mode: "open" });

          // original styling
          const flagIcon = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28"><title>Flag</title><path d="M5 4c0 .72-.39 1.36-1 1.72V25.5c0 .266-.234.5-.5.5h-1c-.266 0-.5-.234-.5-.5V5.72c-.61-.36-1-1-1-1.72 0-1.11.89-2 2-2s2 .89 2 2zm23 1v11.922c0 .578-.36.797-.812 1.03-1.766.954-3.72 1.814-5.766 1.814-2.875 0-4.25-2.188-7.656-2.188-2.484 0-5.094 1.125-7.25 2.28-.172.095-.328.142-.516.142-.547 0-1-.453-1-1V7.406c0-.375.187-.64.484-.86.375-.25.828-.468 1.234-.67 1.97-1 4.36-1.876 6.578-1.876 2.453 0 4.375.812 6.547 1.828.438.22.89.297 1.375.297C23.67 6.125 26.312 4 26.998 4c.548 0 1 .453 1 1z"></path></svg>`;
          const homeIcon = `<svg aria-hidden="true"  xmlns="http://www.w3.org/2000/svg" width="26" height="28" viewBox="0 0 26 28"><title>School</title><path d="M22 15.5V23c0 .547-.453 1-1 1h-6v-6h-4v6H5c-.547 0-1-.453-1-1v-7.5c0-.03.016-.063.016-.094L13 8l8.984 7.406c.016.03.016.063.016.094zm3.484-1.078l-.97 1.156c-.077.094-.202.156-.327.172h-.047c-.125 0-.234-.03-.328-.11L13 6.626 2.185 15.64c-.11.08-.234.126-.375.11-.124-.016-.25-.078-.327-.172l-.97-1.156c-.17-.203-.14-.53.064-.703L11.81 4.36c.657-.547 1.72-.547 2.376 0L18 7.547V4.5c0-.28.218-.5.5-.5h3c.28 0 .5.22.5.5v6.375l3.42 2.844c.204.17.235.5.064.702z"></path></svg>`;
          const starIcon = `<svg aria-hidden="true"  xmlns="http://www.w3.org/2000/svg" width="26" height="28" viewBox="0 0 26 28"><title>Star</title><path d="M26 10.11c0 .28-.203.546-.406.75l-5.672 5.53 1.344 7.812c.016.11.016.203.016.313 0 .406-.187.78-.64.78-.22 0-.44-.077-.626-.186L13 21.42 5.984 25.11c-.203.108-.406.186-.625.186-.454 0-.657-.375-.657-.78 0-.11.016-.204.03-.314L6.08 16.39.39 10.86c-.187-.204-.39-.47-.39-.75 0-.47.483-.657.874-.72l7.844-1.14 3.516-7.11c.14-.297.406-.64.766-.64s.625.343.766.64l3.516 7.11 7.844 1.14c.375.063.875.25.875.72z"></path></svg>`;
          const calendarIcon = `<svg aria-hidden="true"  xmlns="http://www.w3.org/2000/svg" width="26" height="28" viewBox="0 0 26 28"><title>Calendar</title><path d="M2 26h22V10H2v16zM8 7V2.5c0-.28-.22-.5-.5-.5h-1c-.28 0-.5.22-.5.5V7c0 .28.22.5.5.5h1c.28 0 .5-.22.5-.5zm12 0V2.5c0-.28-.22-.5-.5-.5h-1c-.28 0-.5.22-.5.5V7c0 .28.22.5.5.5h1c.28 0 .5-.22.5-.5zm6-1v20c0 1.094-.906 2-2 2H2c-1.094 0-2-.906-2-2V6c0-1.094.906-2 2-2h2V2.5C4 1.125 5.125 0 6.5 0h1C8.875 0 10 1.125 10 2.5V4h6V2.5C16 1.125 17.125 0 18.5 0h1C20.875 0 22 1.125 22 2.5V4h2c1.094 0 2 .906 2 2z"></path></svg>`;
          const mIcon = `<svg aria-hidden="true"  xmlns="http://www.w3.org/2000/svg" width="24" height="28" viewBox="0 0 35 28"><title>Gift</title><path d="M16 1.4C7.937 1.4 1.4 7.937 1.4 16S7.937 30.6 16 30.6c8.063 0 14.6-6.537 14.6-14.6S24.063 1.4 16 1.4zm3.38 22.66v-2.55h2L21 13l-4.68 8.36h-.38L11.11 13l-.27 8.55h2v2.55H6.08v-2.55H8l.45-11.5H6.42V7.5h4.54l5.16 9.19 5-9.27h4.51v2.55h-2.04l.61 11.49h2v2.55z"></path></svg>`;
          const searchIcon = `<svg aria-hidden="true"  xmlns="http://www.w3.org/2000/svg" width="26" height="28" viewBox="0 0 26 28"><title>Search</title><path d="M18 13c0-3.86-3.14-7-7-7s-7 3.14-7 7 3.14 7 7 7 7-3.14 7-7zm8 13c0 1.094-.906 2-2 2-.53 0-1.047-.22-1.406-.594l-5.36-5.344C15.408 23.328 13.22 24 11.002 24 4.924 24 0 19.076 0 13S4.924 2 11 2s11 4.92 11 11c0 2.218-.67 4.405-1.936 6.233l5.36 5.36c.358.358.577.874.577 1.405z"></path></svg>`;
          const chevronIcon = `<svg aria-hidden="true"  xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28"><title>Menu</title><path d="M26.297 12.625L14.703 24.203c-.39.39-1.016.39-1.406 0L1.703 12.625c-.39-.39-.39-1.03 0-1.422l2.594-2.578c.39-.39 1.016-.39 1.406 0L14 16.922l8.297-8.297c.39-.39 1.016-.39 1.406 0l2.594 2.578c.39.39.39 1.03 0 1.422z"></path></svg>`;
          const Colors = {
            white: "#fff",
            offWhite: "#f1f1f1",
            grayLight: "#e6e6e6",
            gray: "#222",
            grayDark: "#454545",
            red: "#e21833",
            redDark: "#951022",
            yellow: "#FFD200",
            green: "#70ebd6",
          };
          const Breakpoints = {
            largeMobileMax: 767,
            tabletMax: 1023,
            desktopMin: 1024,
          };
          const ELEMENT_NAME = "umd-utility-header";
          const ALERTS_URL = "https://umd.edu/api/alerts";
          const MOBILE_MENU_ID = "umd-global-mobile-menu";
          const SEARCH_FORM_ID = "umd-global-search";
          const ALERT_ELEMENT_ID = "umd-global-alert";
          const LOCK_CLASS = `umd-global-header-lock`;
          const MOBILE_BUTTON_CLASS = `umd-global-header-mobile_button`;
          const LOGO_CLASS = "umd-global-header-logo";
          const SR_ONLY_CLASS = "umd-global-sr-only";
          const ALERT_TIME_REF = "umd-alert-time";
          const ALERT_REF = "umd-alert";
          const ALERT_ID_REF = "umd-alert-id";
          const ANIMATION_IN_SPEED = 800;
          const ANIMATION_OUT_SPEED = 400;
          const isDesktop = () => window.innerWidth >= Breakpoints.desktopMin;

          const styleElement = document.createElement("style");

          const umdStyle = `

    :host {
      display: block !important;
      background-color: ${Colors.red} !important;
      position: relative !important;
      z-index: 999;
    }

    :host * {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }

    :host p {
      max-width: 800px;
      margin: 0 auto;
    }

    :host a {
      color: ${Colors.white};
      text-decoration: none;
      text-transform: uppercase;
    }

    :host svg {
      max-width: 15px;
      transition: fill ${ANIMATION_OUT_SPEED}ms;
    }

    @media (max-width: ${Breakpoints.tabletMax}px) {
      :host svg {
        fill: ${Colors.red};
        transition: fill ${ANIMATION_IN_SPEED}ms;
      }
    }

    @media (min-width: ${Breakpoints.desktopMin}px) {
      :host svg {
        fill: ${Colors.white};
      }
    }

    :host button {
      background: transparent;
      border: none;
      cursor: pointer;
    }

    :host input[type="text"] {
      width: calc(100% - 120px);
      display: block;
      padding: 0 10px;
      height: 44px;
      font-family: Source Sans 3,sans-serif;
      font-size: 13px;
      line-height: 1.3;
      border: 1px solid #ccc;
    }

    :host input[type="submit"] {
      border: none;
      background-color: ${Colors.red};
      color: ${Colors.white};
      font-weight: 700;
      font-size: 12px;
      transition: background ${ANIMATION_OUT_SPEED}ms;
      padding: 15px 30px;
      min-width: 120px;
      height: 44px;
    }

    :host input[type="submit"]:hover,
    :host input[type="submit"]:focus {
      background-color: ${Colors.redDark};
      transition: background ${ANIMATION_IN_SPEED}ms;
    }

    :host form#${SEARCH_FORM_ID} {
      margin: 0;
      display: none;
    }

    @media (max-width: ${Breakpoints.tabletMax}px) {
      :host form#${SEARCH_FORM_ID} {
        padding: 20px 15px;
        -webkit-box-ordinal-group: 2;
        -ms-flex-order: 1;
        order: 1;
        display: block !important;
        height: auto !important;
      }
    }

    @media (min-width: ${Breakpoints.desktopMin}px) {
      :host form#${SEARCH_FORM_ID} {
        position: absolute;
        top: 48px;
        right: 0;
        background-color: ${Colors.white};
        min-width: 420px;
        height: 0;
        overflow: hidden;
        transition: height ${ANIMATION_OUT_SPEED}ms;
      }

      :host form#${SEARCH_FORM_ID}[aria-hidden="true"] {
        transition: height ${ANIMATION_OUT_SPEED}ms;
      }

      :host form#${SEARCH_FORM_ID}[aria-hidden="false"] {
        transition: height ${ANIMATION_IN_SPEED}ms;
      }
    }

    :host form#${SEARCH_FORM_ID} > div {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
    }

    @media (min-width: ${Breakpoints.desktopMin}px) {
      :host form#${SEARCH_FORM_ID} > div {
        padding: 10px;
      }
    }

    :host .${SR_ONLY_CLASS} {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }

    :host .${LOCK_CLASS} {
      margin: 0 auto;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      position: relative;

      max-width: 1440px;
    }

    @media (min-width: ${Breakpoints.desktopMin}px) {
      :host .${LOCK_CLASS} {
        min-width: 960px;
      }
    }

    :host .${MOBILE_BUTTON_CLASS} {
      margin-left: auto;
    }

    @media (min-width: ${Breakpoints.desktopMin}px) {
      :host .${MOBILE_BUTTON_CLASS} {
        display: none !important;
      }
    }

    :host .${MOBILE_BUTTON_CLASS}:hover,
    :host .${MOBILE_BUTTON_CLASS}:focus {
      background-color: ${Colors.redDark};
    }

    @media (max-width: ${Breakpoints.tabletMax}px) {
      :host #${MOBILE_MENU_ID} {
        position: absolute;
        width: 100%;
        left: 0;
        top: 39px;
        box-shadow: 0 5px 5px 1px rgba(0, 0, 0, .2);
        height: 0;
        overflow: hidden;
        transition: height ${ANIMATION_OUT_SPEED}ms;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        background-color: ${Colors.white};
      }

      :host #${MOBILE_MENU_ID}[aria-hidden="true"] {
        transition: height ${ANIMATION_OUT_SPEED}ms;
        display: none;
      }

      :host #${MOBILE_MENU_ID}[aria-hidden="false"] {
        transition: height ${ANIMATION_IN_SPEED}ms;
      }
    }

    @media (min-width: ${Breakpoints.desktopMin}px) {
      :host #${MOBILE_MENU_ID} {
        display: -webkit-box !important;
        display: -ms-flexbox !important;
        display: flex !important;
        height: inherit !important;
        margin-left: auto;
        position: relative;
      }
    }

    :host #${MOBILE_MENU_ID} > a,
    :host button {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      padding: 10px 15px;
      background-color: transparent;
    }

    @media (max-width: ${Breakpoints.tabletMax}px) {
      :host #${MOBILE_MENU_ID} > a {
        border-top: 1px solid ${Colors.grayLight};
        color: ${Colors.red};
        -webkit-box-ordinal-group: 3;
        -ms-flex-order: 2;
        order: 2;
        transition: background ${ANIMATION_OUT_SPEED}ms, color ${ANIMATION_OUT_SPEED}ms;
      }

      :host #${MOBILE_MENU_ID} > a:first-of-type {
        border-top: none;
      }
    }

    @media (max-width: ${Breakpoints.tabletMax}px) {
      :host #${MOBILE_MENU_ID} > a:hover,
      :host #${MOBILE_MENU_ID} > a:focus {
        background-color: ${Colors.red};
        color: ${Colors.white};
        transition: background ${ANIMATION_IN_SPEED}ms, color ${ANIMATION_IN_SPEED}ms;
      }

      :host #${MOBILE_MENU_ID} > a:hover svg,
      :host #${MOBILE_MENU_ID} > a:focus svg {
        fill: ${Colors.white};
      }
    }

    @media (min-width: ${Breakpoints.desktopMin}px) {
      :host #${MOBILE_MENU_ID} > *,
      :host #${MOBILE_MENU_ID} > button {
        transition: background ${ANIMATION_OUT_SPEED}ms;
      }
    }

    @media (min-width: ${Breakpoints.desktopMin}px) {
      :host #${MOBILE_MENU_ID} > *:not(form):hover, 
      :host #${MOBILE_MENU_ID} > *:not(form):focus {
        background-color: ${Colors.redDark};
        transition: background ${ANIMATION_IN_SPEED}ms;
      }
    }

    :host #${MOBILE_MENU_ID} > * > span {
      margin-left: 10px;
    }

    :host #${MOBILE_MENU_ID} a {
      font-weight: 700;
      font-size: 13px;
    }

    @media (max-width: ${Breakpoints.tabletMax}px) {
      :host #${MOBILE_MENU_ID} button {
        display: none !important;
      }
    }

    :host .${LOGO_CLASS} {
      font-size: 14px;
      font-family: Crimson Text, Georgia, serif;
      font-weight: 400;
      font-style: normal;
      letter-spacing: 1px;
      padding: 10px 0;
    }

    @media (max-width: ${Breakpoints.tabletMax}px) {
      :host .${MOBILE_BUTTON_CLASS} svg {
        fill: ${Colors.white};
        max-width: 20px;
      }
    }

    @media (min-width: ${Breakpoints.desktopMin}px) {
      :host .${LOCK_CLASS} .${MOBILE_BUTTON_CLASS} {
        display: none;
      }
    }

    :host #${ALERT_ELEMENT_ID} {
      text-align: center;
      background-color: ${Colors.grayLight};
      transition: height ${ANIMATION_IN_SPEED}ms;
      overflow: hidden;
      position: relative;
    }

    :host #${ALERT_ELEMENT_ID}[data-type="general"] {
      background-color: ${Colors.grayLight};
    }

    :host #${ALERT_ELEMENT_ID}[data-type="open"] {
      background-color: ${Colors.yellow};
    }

    :host #${ALERT_ELEMENT_ID}[data-type="closed"] {
      background-color:  ${Colors.green};
    }

    :host #${ALERT_ELEMENT_ID} a {
      color: currentColor;
      text-transform: inherit;
      text-decoration: underline;
    }

    :host #${ALERT_ELEMENT_ID} .${LOCK_CLASS} {
      display: block ;
      padding: 10px;
    }

    @media (max-width: ${Breakpoints.tabletMax}px) {
      :host #${ALERT_ELEMENT_ID} .${LOCK_CLASS} {
        padding-top: 40px;
      }
    }

    :host #${ALERT_ELEMENT_ID} .alert-title {
      text-transform: uppercase;
      margin-bottom: 15px;
      font-weight: 700;
    }

    :host #${ALERT_ELEMENT_ID} button {
      position: absolute;
      top: 10px;
      right: 10px;
    }

    @media (max-width: ${Breakpoints.largeMobileMax}px) {
      :host #${ALERT_ELEMENT_ID} button {
        top: 5px;
        right: 5px;
      }
    }

    :host #${ALERT_ELEMENT_ID} button:before,
    :host #${ALERT_ELEMENT_ID} button:after {
      content: '';
      display: inline-block;
      width: 2px;
      height: 20px;
      background-color: ${Colors.gray};
    }

    :host #${ALERT_ELEMENT_ID} button:before {
      transform: rotate(135deg) translateX(-1px);
    }

    :host #${ALERT_ELEMENT_ID} button:after {
      transform: rotate(45deg) translateX(-1px);
    }
`;
          // inject style into shadow dom
          styleElement.textContent = umdStyle;
          shadowRoot.appendChild(styleElement);

          // original code
          const makeLinkElement = ({ name, icon, url }) => {
            const tag = document.createElement("a");
            tag.setAttribute("href", url);
            tag.setAttribute("target", "_blank");
            tag.setAttribute("rel", "noopener noreferrer");
            tag.innerHTML = `${icon} <span>${name}</span>`;
            return tag;
          };
          const toggleExpandElements = ({
            expandElement,
            elements,
            button,
          }) => {
            const isOpen =
              expandElement.getAttribute("aria-hidden") === "false";
            const elementToFocus = () => {
              const formElement = elements.find(
                (element) => element.nodeName === "DIV"
              );
              const isFirstNodeAnchor = elements[0].nodeName === "A";
              if (!formElement) return elements[0];
              if (!isFirstNodeAnchor && formElement) {
                const input = formElement.querySelector("input");
                return input;
              }
              return elements[0];
            };
            const eventKeyDown = (event) => {
              if (event.key === "Esc" || event.keyCode == 27) {
                close(true);
              }
            };
            const eventKeyUp = (event) => {
              const path = event.composedPath();
              const currentElement = path[0];
              if (!expandElement) return;
              if (event.key === "Tab" || event.keyCode == 9) {
                if (!expandElement.contains(currentElement)) {
                  close();
                }
              }
              if (event.key === "ArrowDown" || event.keyCode == 40) {
                const nextElement = currentElement.nextElementSibling;
                if (expandElement.contains(nextElement)) {
                  nextElement.focus();
                }
              }
              if (event.key === "ArrowUp" || event.keyCode == 38) {
                const previousElement = currentElement.previousElementSibling;
                if (expandElement.contains(previousElement)) {
                  previousElement.focus();
                }
              }
            };
            const eventClick = (event) => {
              const globalHeaderElement = event.target;
              if (globalHeaderElement.nodeName !== ELEMENT_NAME.toUpperCase()) {
                close();
              }
            };
            const open = () => {
              const focusElement = elementToFocus();
              expandElement.style.display =
                expandElement.nodeName === "FORM" ? "block" : "flex";
              setTimeout(() => {
                const size = elements.reduce((accumulator, currentValue) => {
                  return accumulator + currentValue.offsetHeight;
                }, 0);
                expandElement.setAttribute("aria-hidden", "false");
                expandElement.style.height = `${size}px`;
                focusElement.focus();
                window.addEventListener("keydown", eventKeyDown);
                window.addEventListener("keyup", eventKeyUp);
                window.addEventListener("click", eventClick);
              }, 100);
            };
            const close = (focus = false) => {
              expandElement.style.height = `0`;
              setTimeout(() => {
                expandElement.style.display = "none";
                expandElement.setAttribute("aria-hidden", "true");
                if (focus) {
                  button.focus();
                }
                window.removeEventListener("keydown", eventKeyDown);
                window.removeEventListener("keyup", eventKeyUp);
                window.removeEventListener("click", eventClick);
              }, ANIMATION_OUT_SPEED + 100);
            };
            isOpen ? close() : open();
          };
          const makeMobileMenuButton = ({ expandElement }) => {
            const button = document.createElement("button");
            const elements = Array.from(
              expandElement.querySelectorAll("a, form")
            );
            button.innerHTML = `${chevronIcon}`;
            button.setAttribute("type", "button");
            button.setAttribute("aria-label", "toggle mobile menu");
            button.setAttribute("aria-controls", MOBILE_MENU_ID);
            button.classList.add(MOBILE_BUTTON_CLASS);
            button.addEventListener("click", () => {
              toggleExpandElements({ expandElement, elements, button });
            });
            return button;
          };

          const makeLogoElement = () => {
            const logo = document.createElement("a");
            logo.innerHTML = "University of Maryland";
            logo.setAttribute("href", "https://umd.edu");
            logo.setAttribute("target", "_blank");
            logo.setAttribute("rel", "noopener noreferrer");
            logo.classList.add(LOGO_CLASS);
            return logo;
          };
          const checkAlertTime = () => {
            const alertDate = window.localStorage.getItem(ALERT_TIME_REF);
            const currentDate = new Date();
            const futureDate = new Date(currentDate.getTime() + 1000 * 60);
            const shouldCheckMessage = (alertDate) => {
              const storedDate = new Date(Date.parse(alertDate));
              if (storedDate instanceof Date && currentDate > storedDate) {
                localStorage.setItem(ALERT_TIME_REF, futureDate.toString());
                return true;
              }
              return false;
            };
            if (!alertDate) {
              localStorage.setItem(ALERT_TIME_REF, futureDate.toString());
              return true;
            }
            return shouldCheckMessage(alertDate);
          };
          const setAlertStorage = (alert) => {
            window.localStorage.setItem(ALERT_REF, JSON.stringify(alert));
          };
          const getAlertStorage = () => window.localStorage.getItem(ALERT_REF);
          const shouldAlertHide = ({ alert_id }) =>
            window.localStorage.getItem(ALERT_ID_REF) === alert_id;
          const makeAlert = (data) => {
            const wrapper = document.createElement("div");
            const lock = document.createElement("div");
            const titleElement = document.createElement("p");
            const textElement = document.createElement("div");
            const button = document.createElement("button");
            wrapper.setAttribute("data-type", data.alert_type);
            wrapper.setAttribute("id", ALERT_ELEMENT_ID);
            lock.classList.add(LOCK_CLASS);
            titleElement.classList.add("alert-title");
            titleElement.innerHTML = data.alert_title;
            textElement.innerHTML = data.alert_message;
            button.setAttribute("aria-label", "remove alert");
            button.addEventListener("click", () => {
              wrapper.style.height = `${wrapper.offsetHeight}px`;
              window.localStorage.setItem(ALERT_ID_REF, data.alert_id);
              setTimeout(() => {
                wrapper.style.height = "0px";
              }, 100);
              setTimeout(() => {
                wrapper.remove();
              }, ANIMATION_IN_SPEED + 100);
            });
            lock.appendChild(button);
            lock.appendChild(titleElement);
            lock.appendChild(textElement);
            wrapper.appendChild(lock);
            return wrapper;
          };

          // custom code for univrsal header
          let containerElement = document.createElement("div");
          let menuContainerElement = document.createElement("div");
          let logoElement = makeLogoElement();
          let menuElements = [];
          let paddingAmount = "20";

          let resizeElements = {};

          // UMD Lib customized - only gift option
          function makeGiftElement() {
            const element = makeLinkElement({
              name: "Make a Gift",
              url: "https://giving.umd.edu/giving",
              icon: mIcon,
            });
            menuElements.push({
              order: 1,
              element,
            });
          }
          makeGiftElement();

          // universal header element
          containerElement.classList.add(LOCK_CLASS);
          containerElement.appendChild(logoElement);

          // menu element creation
          function addMenuItems() {
            const items = menuElements
              .slice()
              .sort((a, b) => (a.order > b.order ? 1 : -1));
            const setPadding = ({ element }) => {
              const mobileButton =
                shadowRoot.querySelector(MOBILE_BUTTON_CLASS);
              const padding = parseInt(paddingAmount);
              const elementPadding = padding > 20 ? 20 : padding;
              element.style.paddingRight = `${elementPadding}px`;
              if (mobileButton)
                mobileButton.style.paddingRight = `${elementPadding}px`;
              if (padding > 20) {
                containerElement.style.paddingRight = `${padding - 20}px`;
              }
            };
            items.forEach(({ element }, i) => {
              if (i === items.length - 1) setPadding({ element });
              menuContainerElement.appendChild(element);
            });
          }
          addMenuItems();
          menuContainerElement.setAttribute("id", MOBILE_MENU_ID);
          menuContainerElement.setAttribute(
            "aria-hidden",
            (!isDesktop()).toString()
          );

          // menu
          containerElement.appendChild(
            makeMobileMenuButton({
              expandElement: menuContainerElement,
            })
          );

          containerElement.appendChild(menuContainerElement);
          resizeElements["menu"] = menuContainerElement;

          // resize event
          function resizeEvent({ menu }) {
            if (menu) {
              menu.setAttribute("aria-hidden", (!isDesktop()).toString());
            }
          }
          if (Object.keys(resizeElements).length > 0) {
            window.addEventListener("resize", () => {
              resizeEvent(resizeElements);
            });
          }

          // Padding
          containerElement.style.paddingLeft = `${paddingAmount}px`;

          // alert
          async function alert() {
            const shouldCheck = checkAlertTime();

            const setMarkup = (data) => {
              const domAlert = makeAlert(data);
              const styleNode = shadowRoot.querySelector("style");
              const containerNode = styleNode.nextElementSibling;
              if (shouldAlertHide({ alert_id: data.alert_id })) return;
              if (containerNode) {
                shadowRoot.insertBefore(domAlert, containerNode);
              } else {
                shadowRoot.appendChild(domAlert);
              }
            };

            const fetchAlerts = async () => {
              try {
                const params = {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                };
                const response = await fetch(ALERTS_URL, params);
                return response.json();
              } catch (ex) {
                throw ex;
              }
            };
            if (shouldCheck) {
              try {
                const { data = [] } = await fetchAlerts();
                if (data.length > 0) {
                  if (data[0] === "") return;
                  setMarkup(data[0]);
                  setAlertStorage(data[0]);
                } else {
                  const alertElement = shadowRoot.querySelector(
                    `#${ALERT_ELEMENT_ID}`
                  );
                  window.localStorage.setItem(ALERT_REF, "");
                  window.localStorage.removeItem(ALERT_REF);
                  if (alertElement) {
                    alertElement.remove();
                  }
                }
              } catch (error) {
                console.error("Error fetching alerts:", error);
              }
            } else {
              const data = getAlertStorage();
              if (data) {
                setMarkup(JSON.parse(data));
              }
            }
          }

          alert();

          shadowRoot.appendChild(containerElement);
        }, 0);
      };
    },
  ]);
})();
