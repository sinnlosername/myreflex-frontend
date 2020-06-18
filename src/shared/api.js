const API_URL = "https://my.reflex.rip/api/v1";

export async function callApi(method, endpoint, requestData, setSpinning) {
  if (setSpinning != null) {
    setSpinning(true);
  }

  const result = await doRestCall(method, endpoint, requestData);

  if (result.error != null) {
    if (setSpinning != null) {
      setSpinning(false);
    }
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

//TODO translate
function extractError({status, errorCode}) {
  if (status !== "error") return;

  switch (errorCode) {
    case "SESSION_INVALID":
      return "Invalid session";
    case "CREDENTIALS_INVALID":
      return "Invalid username or password, you fool";
    case "OLD_PASSWRD_IS_THE_SAME_AS_NEW":
      return "The passwords are identical."
    case "OLD_PASSWORD_IS_INCORRECT":
      return "The old password is incorrect."
    default:
      return "An unknown error occurred";
  }
}