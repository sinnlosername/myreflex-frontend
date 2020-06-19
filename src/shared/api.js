const API_URL = "https://my.reflex.rip/api/v1";

export async function callApi(method, endpoint, requestData, setSpinning = () => {}, getTranslation) {
  if (getTranslation == null) {
    throw new Error("Translation function missing");
  }

  setSpinning(true);

  const result = await doRestCall(method, endpoint, requestData, getTranslation);

  if (result.error != null) {
    setSpinning(false);
  }

  return result;
}

async function doRestCall(method, endpoint, requestData, getTranslation) {
  try {
    const isLocalTest = process.env.NODE_ENV === "development";
    const data = await fetch(API_URL + endpoint, {
      method,
      body: JSON.stringify(requestData),
      credentials: (isLocalTest ? 'include' : undefined)
    }).then(response => response.json());

    return {data, errorCode: data.errorCode, error: extractError(data, getTranslation)};
  } catch (e) {
    console.error(e);
    return {error: "Internal error - " + e.message}
  }
}

function extractError({status, errorCode}, getTranslation) {
  if (status !== "error") return;

  switch (errorCode) {
    case "SESSION_INVALID":
      return getTranslation("errors.sessionInvalid");
    case "CREDENTIALS_INVALID":
      return getTranslation("errors.credentialsInvalid");
    case "OLD_PASSWRD_IS_THE_SAME_AS_NEW":
      return getTranslation("errors.oldPasswordIsEqualToNew");
    case "OLD_PASSWORD_IS_INCORRECT":
      return getTranslation("errors.oldPasswordIsIncorrect");
    default:
      return getTranslation("errors.default");
  }
}