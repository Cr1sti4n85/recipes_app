import { TIMEOUT_SEC } from "./config.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async (url) => {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`${data.message} ${res.status}`);
    }
    return data;
  } catch (error) {
    //throw para enviar el error a la otra async function que llame a esta
    throw error;
  }
};
