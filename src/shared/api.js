const API_URL = "https://my.reflex.rip/api/v1";

export async function callApi(method, endpoint, requestData, setSpinning = () => {}) {
  setSpinning(true);

  const result = await doRestCall(method, endpoint, requestData);

  if (result.error != null) {
    setSpinning(false);
  }

  return result;
}

async function doRestCall(method, endpoint, requestData) {
  try {
    const isLocalTest = process.env.NODE_ENV === "development";
    const data = await fetch(API_URL + endpoint, {
      method,
      body: JSON.stringify(requestData),
      credentials: (isLocalTest ? 'include' : undefined)
    }).then(response => response.json());

    return {data, errorCode: data.errorCode, error: extractError(data)};
  } catch (e) {
    console.error(e);
    return {error: "Internal error - " + e.message}
  }
}

const errorMapping = {
  "SESSION_INVALID": "errors.sessionInvalid",
  "CREDENTIALS_INVALID": "errors.credentialsInvalid",
  "OLD_PASSWORD_IS_THE_SAME_AS_NEW": "errors.oldPasswordIsEqualToNew",
  "OLD_PASSWORD_IS_INCORRECT": "errors.oldPasswordIsIncorrect",
  "NEW_PASSWORD_IS_WEAK": "errors.newPasswordIsWeak",
  "IP_IS_IN_PRIVATE_NETWORK": "errors.ipInfoUnavailable"
}

function extractError({status, errorCode}) {
  if (status !== "error") return;
  return errorMapping[errorCode] ?? "errors.default";
}