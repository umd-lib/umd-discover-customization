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
    // fixed stray quote in id attribute
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
        <iframe src="https://umd.libanswers.com/chat/widget/5cffd49b55d69387be9a6fa51e3c5fa59efa09ca025ffc7367db9b7d083f17ec?referer=https%3A%2F%2Fusmai-umcp.primo.exlibrisgroup.com%2Fdiscovery%2Fsearch%3Fquery%3Dany%2Ccontains%2Cfire%26tab%3DEverything%26search_scope%3DDN_and_CI%26vid%3D01USMAI_UMCP%3Aui_test%26lang%3Den" frameborder="0" id="cw-iframe-window"></iframe>
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
        const iframe = document.getElementById("cw-iframe-window");
        addRefererToIframe();
        iframe.src = iframe.src; // Explicitly reassign the src to reload the iframe
        console.log("iframe reloaded");
      }

      // add referer to the chat widget iframe
      function addRefererToIframe() {
        const iframe = document.getElementById("cw-iframe-window");
        const referer = window.location.href; // Get the current page URL

        iframe.src = iframe.src + "?referer=" + encodeURIComponent(referer);
      }

      // update the chat widget UI
      function updateChatWidgetStatus(status) {
        let widget = document.getElementById("chatwidget");
        let widgetStatus = document.getElementById("cw--status");

        if (status === true) {
          widgetStatus.innerText = "live";
          widget.classList.remove("offline");
          // console.log("chat widget is live");
        } else {
          widgetStatus.innerText = "offline";
          widget.classList.add("offline");
          // console.log("chat widget is offline");

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
              // console.log("server is live");
              // console.log(response);
              let data = response.json();
              // console.log(data);
              return data;
            } else {
              // console.log("server is down");
            }
          })
          // update the chat widget based on the service status
          .then((data) => {
            const awayValue = data.away;
            if (typeof awayValue !== "undefined") {
              // console.log("chat widget is live");
              updateChatWidgetStatus(true);
            } else {
              // console.log("chat widget is offline");
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

  // ===================================================================
  // FILTER EXTERNAL SEARCH OPTION MODULE
  // ===================================================================
  app.value("searchTargets", [
    {
      name: "WorldCat UMD",
      url: "https://umaryland.on.worldcat.org/search?queryString=",
      img: "/",
      mapping: function mapping(search) {
        if (Array.isArray(search)) {
          var ret = "";
          for (var i = 0; i < search.length; i++) {
            var terms = search[i].split(",");
            ret += " " + (terms[2] || "");
          }
          return ret.trim();
        } else {
          var terms = search.split(",");
          return terms[2] || "";
        }
      },
    },
  ]);

  app.component("prmFacetExactAfter", {
    bindings: { parentCtrl: "<" },
    template: `
        <div ng-if="$ctrl.showExternalSearch">
            <div ng-hide="$ctrl.parentCtrl.facetGroup.facetGroupCollapsed">
                <div class="section-content animate-max-height-variable">
                    <div class="md-chips md-chips-wrap">
                        <div ng-repeat="target in $ctrl.targets" aria-live="polite" class="md-chip animate-opacity-and-scale facet-element-marker-local4">
                            <div class="md-chip-content layout-row" role="button" tabindex="0">
                                <strong dir="auto" title="{{target.name}}">
                                    <a ng-href="{{$ctrl.getSearchUrl(target)}}" target="_blank">
                                        {{target.name}}
                                    </a>
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    controller: [
      "$scope",
      "$location",
      "searchTargets",
      function ($scope, $location, searchTargets) {
        var ctrl = this;
        this.$onInit = function () {
          ctrl.targets = searchTargets;
          ctrl.showExternalSearch =
            ctrl.parentCtrl.facetGroup.name === "Can't find what you need?";

          var query = $location.search().query;
          var filter = $location.search().pfilter;
          ctrl.queries = Array.isArray(query) ? query : query ? [query] : false;
          ctrl.filters = Array.isArray(filter)
            ? filter
            : filter
            ? [filter]
            : false;
        };

        this.getSearchUrl = function (target) {
          return (
            target.url + target.mapping(ctrl.queries || "", ctrl.filters || "")
          );
        };
      },
    ],
  });

  app.factory("externalSearchService", [
    "$interval",
    "$compile",
    "$rootScope",
    function ($interval, $compile, $rootScope) {
      return {
        get controller() {
          return this.prmFacetCtrl || false;
        },
        set controller(controller) {
          this.prmFacetCtrl = controller;
        },
        addExtSearch: function () {
          var sv = this;
          var checkExist = $interval(function () {
            if (
              sv.prmFacetCtrl &&
              sv.prmFacetCtrl.facetService.results[0] &&
              sv.prmFacetCtrl.facetService.results[0].name !=
                "Can't find what you need?"
            ) {
              if (
                !sv.prmFacetCtrl.facetService.results.find(
                  (facet) => facet.name === "Can't find what you need?"
                )
              ) {
                sv.prmFacetCtrl.facetService.results.unshift({
                  name: "Can't find what you need?",
                  displayedType: "exact",
                  limitCount: 0,
                  facetGroupCollapsed: false,
                  values: undefined,
                });
              }
              $interval.cancel(checkExist);
            }
          }, 100);

          var checksSpan = $interval(function () {
            const externalSearchElements = document.getElementsByClassName(
              "sidebar-section available-facets"
            );
            for (let i = 0; i < externalSearchElements.length; i++) {
              const externalSearch = externalSearchElements[i];
              const spanElement = externalSearch.querySelector("span");
              if (
                spanElement &&
                spanElement.innerText.trim() === "Can't find what you need?"
              ) {
                externalSearch.classList.add("move-up");
                $interval.cancel(checksSpan);
                break;
              }
            }
          }, 100);
        },
      };
    },
  ]);

  app.component("prmFacetAfter", {
    bindings: { parentCtrl: "<" },
    controller: [
      "externalSearchService",
      function (externalSearchService) {
        this.$onInit = function () {
          externalSearchService.controller = this.parentCtrl;
          externalSearchService.addExtSearch();
        };
      },
    ],
  });

  app.component("prmPageNavMenuAfter", {
    controller: [
      "externalSearchService",
      function (externalSearchService) {
        this.$onInit = function () {
          if (externalSearchService.controller) {
            externalSearchService.addExtSearch();
          }
        };
      },
    ],
  });

  // ===================================================================
  // NO SEARCH RESULTS PAGE CUSTOMIZATION MODULE
  // ===================================================================
  // Enhance No Results tile
  app.controller("prmNoSearchResultAfterController", [
    function () {
      var vm = this;
      vm.getSearchTerm = getSearchTerm;
      vm.pciSetting =
        vm.parentCtrl.searchStateService.searchObject.pcAvailability || "";
      function getSearchTerm() {
        return vm.parentCtrl.term;
      }
    },
  ]);

  // Update links in template line below to show the help information, etc.
  app.component("prmNoSearchResultAfter", {
    bindings: { parentCtrl: "<" },
    controller: "prmNoSearchResultAfterController",
    template: `
    <div class="no-results">
      <div class="title">
        <h2>No records found</h2>
        <p>
          <span>There are no results matching your search term.
          </span>
        </p>
      </div>
      <hr />
      <div class="refine-search">
        <h3>Refine Your Search</h3>
        <p>Try these strategies to improve your search results:</p>
        <div class="content">
          <ol>
            <li>
              Check your spelling
              <p>Ensure all words are spelled correctly.</p>
            </li>
            <li>
              Adjust your keywords
              <ul>
                <li>Use synonyms or related terms.</li>
                <li>Try more general keywords.</li>
                <li>Remove some keywords to broaden your search.</li>
              </ul>
            </li>
            <li>
              Use search techniques
              <ul>
                <li>Put phrases in quotes (e.g., "climate change").</li>
              </ul>
            </li>
            <li>
              Modify search scope
              <p>
                Expand or narrow your search to different collections or material
                types.
              </p>
            </li>
          </ol>
        </div>
        
      </div>
      <hr />
      <div class="additional">
          <h3>Additional Resources</h3>
          <div class="worldcat">
            <a
              href="https://umaryland.on.worldcat.org/discovery"
            >WorldCat UMD</a>
            <p>Search and request from other libraries.</p>
          </div>
          <div class="specialist">
            <a
              href="https://lib.guides.umd.edu/SubjectSpecialists/BySubject"
            >Subject Specialists</a>
            <p>
              Get personalized assistance from a librarian with expertise in your
              subject area.
            </p>
          </div>
        </div>
    </div>
  `,
  });

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
