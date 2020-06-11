const API_URL = "https://my.reflex.rip/api/v1/auth?cookie=true";
const DEV_API_PROXY = "http://localhost:8010/proxy";

export async function callApi(method, endpoint, requestData, setSpinning) {
  if (setSpinning != null) {
    setSpinning(true);
  }

  const result = await doRestCall(method, endpoint, requestData);

  if (result.error != null) {
    setSpinning(false);
  }

  return result;
}

async function doRestCall(method, endpoint, requestData) {
  try {
    const requireProxy = process.env.NODE_ENV === "development" && window.location.hostname === "localhost";
    const data = await fetch((requireProxy ? DEV_API_PROXY : API_URL) + endpoint, {
      method,
      body: JSON.stringify(requestData),
      credentials: requireProxy && 'include'
    }).then(response => response.json());

    return {data, error: extractError(data)};
  } catch (e) {
    console.error(e);
    return {error: "Internal error - " + e.message}
  }
}

function extractError({status, errorCode}) {
  if (status !== "error") return;

  switch (errorCode) {
    case "SESSION_INVALID": return "Invalid session";
    case "CREDENTIALS_INVALID": return "Invalid username or password, you fool";
    default: return "An unknown error occurred";
  }
}