const Color = require("color");

const THEMES = {
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
    foregroundColor: "#EDEDED",
    backgroundColor: "#171717"
  },
  salmonChallis: {
    colors: {
      black: "#211c1c",
      red: "#FF4848",
      green: "#9AE66E",
      yellow: "#FFC069",
      blue: "#82736b",
      cyan: "#EFEFEF",
      magenta: "#EFEFEF",
      white: "#9b887d",
      lightBlack: "#72696a",
      lightRed: "#FF4848",
      lightGreen: "#9AE66E",
      lightYellow: "#FFC069",
      lightBlue: "#82736b",
      lightMagenta: "#EFEFEF",
      lightCyan: "#EFEFEF",
      lightWhite: "#9b887d",
    },
    foregroundColor: "#9b887d",
    backgroundColor: "#4A403A"
  }
};

exports.decorateConfig = (config) => {
  const settings = config.hyperEverest || {};
  const theme = THEMES[settings.theme || "moonlight"] || THEMES["moonlight"];

  const accentColor = theme.colors[settings.accent || "yellow"];
  const colors = Object.values(theme.colors);
  const backgroundColor = Color(theme.backgroundColor).darken(0.4).rgb().string()
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
    cursorColor: Color(accentColor).rgb().string(),
    borderColor: backgroundColor,
    selectionColor: Color(accentColor).fade(0.7).rgb().string(),
    cursorAccentColor: Color(accentColor).rgb().string(),
    colors,
    css: `
      .tabs_nav {
        height: ${tabHeight};
        line-height: ${tabHeight};
      }
      .tabs_borderShim {
        display: "none";
        top: 0;
        bottom: 0;
        width: 76px;
        border: 0 !important;
        background: rgba(0, 0, 0, .1);
      }
      .tab_tab {
        border: 0;
        min-width: 90px;
        padding-left: 0;
        height: ${tabHeight};
        border: 0 !important;
        transition: border ease .1s, background ease .2s;
        background: rgba(0, 0, 0, 0.1);
      }
      .tab_tab.tab_active {
        z-index: 2;
        height: calc(${tabHeight} - 1px);
        background: rgba(0, 0, 0, 0);
        box-shadow: none;
      }
      .tab_tab.tab_active::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: -1px;
        display: block;
        height: 1px;
        box-shadow: none;
      }
      .tab_tab.tab_active:hover {
        background: "rgba(0, 0, 0, 0)";
      }
    `,
  };
};
