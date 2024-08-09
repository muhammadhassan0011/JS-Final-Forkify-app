// The goal of this file/module is to contain a couple of functions that we reuse over and over again in our Project...
import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (Error) {
    throw Error;
  }
};

/*
// Using async func__ which will do fetching and also converting to JSON all in one step...
export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (Error) {
    // console.log(Error);
    // let: we want to get the error message inside of modele :==>  So we can do :==>
    throw Error; // Now with this, the promise that's being returned from getJSON will actually reject.

    // So we basically propagated the error down from one async func__ to the other by re-throwing the error here in this catch block ___>
  }
  // Adding some timeOut : setting a time after which we make the request fail:> (IMP for bad internetConnections)
};

export const sendJSON = async function (url, uploadData) {
  // Learn : How we can send data to APT using Fetch fuc___ ==:
  try {
    const fetchPro = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (Error) {
    throw Error;
  }
};
*/
