const Color = require("color");

const THEMES = {
  aura: {
    colors: {
      black: "#211c1c",
      red: "#FF577F",
      green: "#2FDD92",
      yellow: "#FEC260",
      blue: "#767cd3",
      cyan: "#C996CC",
      magenta: "#ad88ff",
      white: "#9d93c6",
      lightBlack: "#72696a",
      lightRed: "#FF577F",
      lightGreen: "#2FDD92",
      lightYellow: "#FEC260",
      lightBlue: "#767cd3",
      lightMagenta: "#a8a9eb",
      lightCyan: "#C996CC",
      lightWhite: "#9d93c6",
    },
    defaultAccent: "magenta",
    backgroundColor: "#21202e",
    foregroundColor: "#9d93c6",
  },
  moonlight: {
    colors: {
      black: "#211c1c",
      red: "#FF577F",
      green: "#2FDD92",
      yellow: "#FEC260",
      blue: "#767cd3",
      cyan: "#C996CC",
      magenta: "#a8a9eb",
      white: "#9d93c6",
      lightBlack: "#72696a",
      lightRed: "#FF577F",
      lightGreen: "#2FDD92",
      lightYellow: "#FEC260",
      lightBlue: "#767cd3",
      lightMagenta: "#a8a9eb",
      lightCyan: "#C996CC",
      lightWhite: "#9d93c6",
    },
    defaultAccent: "blue",
    backgroundColor: "#2e2160",
    foregroundColor: "#9d93c6",
  },
  moss: {
    colors: {
      black: "#211c1c",
      red: "#C84B31",
      green: "#77D970",
      yellow: "#FFC069",
      blue: "#466875",
      cyan: "#96BAFF",
      magenta: "#C85C5C",
      white: "#D4ECDD",
      lightBlack: "#72696a",
      lightRed: "#C84B31",
      lightGreen: "#77D970",
      lightYellow: "#FFC069",
      lightBlue: "#466875",
      lightMagenta: "#C85C5C",
      lightCyan: "#96BAFF",
      lightWhite: "#D4ECDD",
    },
    defaultAccent: "green",
    foregroundColor: "#6e929e",
    backgroundColor: "#152D35"
  },
  dark: {
    colors: {
      black: "#211c1c",
      red: "#DA0037",
      green: "#9AE66E",
      yellow: "#FFC069",
      blue: "#7F7C82",
      cyan: "#B2B1B9",
      magenta: "#A45D5D",
      white: "#EDEDED",
      lightBlack: "#72696a",
      lightRed: "#DA0037",
      lightGreen: "#9AE66E",
      lightYellow: "#FFC069",
      lightBlue: "#7F7C82",
      lightMagenta: "#A45D5D",
      lightCyan: "#B2B1B9",
      lightWhite: "#EDEDED",
    },
    defaultAccent: "white",
    foregroundColor: "#EDEDED",
    backgroundColor: "#171717"
  },
  salmonChallis: {
    colors: {
      black: "#211c1c",
      red: "#FF4848",
      green: "#9AE66E",
      yellow: "#bf9354",
      blue: "#82736b",
      cyan: "#EFEFEF",
      magenta: "#EFEFEF",
      white: "#9b887d",
      lightBlack: "#72696a",
      lightRed: "#FF4848",
      lightGreen: "#9AE66E",
      lightYellow: "#ffcb77",
      lightBlue: "#82736b",
      lightMagenta: "#EFEFEF",
      lightCyan: "#EFEFEF",
      lightWhite: "#9b887d",
    },
    defaultAccent: "yellow",
    foregroundColor: "#9b887d",
    backgroundColor: "#4A403A"
  }
};

exports.decorateConfig = (config) => {
  const settings = config.hyperEverest || {};
  const theme = THEMES[settings.theme || "moonlight"] || THEMES["moonlight"];

  const accentColor = settings.accent ? theme.colors[settings.accent] : theme.defaultAccent;
  const cursorColor = theme.colors.white;
  const colors = Object.values(theme.colors);
  const backgroundColor = Color(theme.backgroundColor).darken(settings.darken ?? 0.4).rgb().string()
  const { foregroundColor } = theme;
  const tabHeight = "42px";

  if (settings.hideControls === true) {
    exports.decorateBrowserOptions = (defaults) => {
      return Object.assign({}, defaults, {
        titleBarStyle: "",
        transparent: true,
        frame: false,
      });
    };
  }

  // Generate other Colors
  return {
    ...config,
    foregroundColor,
    backgroundColor,
    cursorColor: Color(cursorColor).rgb().string(),
    borderColor: backgroundColor,
    selectionColor: Color(accentColor).fade(0.7).rgb().string(),
    cursorAccentColor: Color(cursorColor).rgb().string(),
    colors,
    css: `
      .wrapper {
        color: #ad88ff !important;
      }
      .line {
        font-size: 10px !important;
        font-weight: normal !important;
        height: 28px !important;
        box-shadow: 0px 0px 40px rgb(0 0 0 / 50%) !important;
        background: #1c1b22 !important;
      }
      .header_appTitle {
        display: none !important;
      }
      .splitpane_divider {
        background-color: rgb(46 44 65) !important;
      }
      .tabs_nav {
        height: ${tabHeight};
        width: max-content !important;
        display: flex !important;
        flex-direction: column !important;
        padding: 0px 50px !important;
      }
      .tabs_borderShim {
        top: 0;
        bottom: 0;
        width: 76px;
        background: red;
      }
      .tabs_list {
        max-height: unset !important;
      }
      .tab_tab {
        border: 0;
        height: ${tabHeight};
        transition: border ease .1s, background ease .2s;
        background: transparent;
        font-family: "Geist Mono", monospace;
        opacity: 0.3;
        color: ${accentColor};
        flex: 1 !important;
        min-width: 110px;
      }
      .tab_tab.tab_active {
        z-index: 2;
        height: calc(${tabHeight} - 1px);
        background: rgba(0, 0, 0, 0);
        box-shadow: none;
        border-bottom: 2px solid ${accentColor} !important;
        color: ${accentColor};
        opacity: 1;
      }
      .tab_tab:hover {
        opacity: 0.9
      }
    `,
  };
};
