import { create } from "zustand";
import axios from "axios";
import { applyTokensToDom } from "../utils/cssVariables";

const deepMerge = (base, override) => {
  const result = JSON.parse(JSON.stringify(base));
  for (const key in override) {
    if (typeof override[key] === "object" && override[key] !== null) {
      result[key] = deepMerge(result[key] || {}, override[key]);
    } else {
      result[key] = override[key];
    }
  }
  return result;
};

export const useTokenStore = create((set, get) => ({
  siteId: null,
  url: "",
  status: "idle",
  errorMessage: "",
  extractedTokens: null,
  lockedTokens: {},
  computedTokens: null,
  history: [],

  scrapeUrl: async (url) => {
    try {
      set({ status: "loading", errorMessage: "" });

      const response = await axios.post(
        "https://stylesync-backend-huuo.onrender.com/api/scrape",
        { url },
        { headers: { "Content-Type": "application/json" } }
      );

      const siteId = response.data.siteId;

      const tokensRes = await axios.get(
        `https://stylesync-backend-huuo.onrender.com/api/tokens/${siteId}`
      );

      const { extracted, locked, computed } = tokensRes.data;

      set({
        siteId,
        url,
        extractedTokens: extracted,
        lockedTokens: locked || {},
        computedTokens: computed,
        status: "success",
      });

      applyTokensToDom(computed);
    } catch (err) {
      set({
        status: "error",
        errorMessage: err.message,
      });
    }
  },

  updateToken: (path, value) => {
    const { computedTokens } = get();

    const newTokens = JSON.parse(JSON.stringify(computedTokens));

    const keys = path.split(".");
    let obj = newTokens;

    keys.slice(0, -1).forEach((k) => (obj = obj[k]));
    obj[keys[keys.length - 1]] = value;

    set({ computedTokens: newTokens });

    applyTokensToDom(newTokens);
  },

  lockToken: async (path, value) => {
    const { lockedTokens, siteId, extractedTokens } = get();

    const newLocked = JSON.parse(JSON.stringify(lockedTokens));
    const keys = path.split(".");
    let obj = newLocked;

    keys.slice(0, -1).forEach((k) => {
      if (!obj[k]) obj[k] = {};
      obj = obj[k];
    });

    const lastKey = keys[keys.length - 1];

    if (obj[lastKey]) {
      delete obj[lastKey]; // unlock
    } else {
      obj[lastKey] = value; // lock
    }

    await axios.post(
      `http://localhost:5000/api/tokens/${siteId}/lock`,
      { lockedTokens: newLocked }
    );

    const merged = deepMerge(extractedTokens, newLocked);

    set({
      lockedTokens: newLocked,
      computedTokens: merged,
    });

    applyTokensToDom(merged);
  },

  fetchHistory: async () => {
    const { siteId } = get();

    const res = await axios.get(
      `http://localhost:5000/api/history/${siteId}`
    );

    set({
      history: res.data,
    });
  },

  resetState: () => {
    set({
      siteId: null,
      url: "",
      status: "idle",
      errorMessage: "",
      extractedTokens: null,
      lockedTokens: {},
      computedTokens: null,
      history: [],
    });
  },

  exportCss: async () => {
    const { siteId } = get();

    const res = await axios.get(
      `https://stylesync-backend-huuo.onrender.com/api/export/${siteId}/css`
    );

    const blob = new Blob([res.data], { type: "text/css" });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "stylesync.css";

    link.click();
  },
}));