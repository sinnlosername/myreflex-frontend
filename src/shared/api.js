import React from 'react';
import {Spin} from "antd";
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

function extractError({status, errorCode}) {
  if (status !== "error") return;

  switch (errorCode) {
    case "SESSION_INVALID": return "Invalid session";
    case "CREDENTIALS_INVALID": return "Invalid username or password, you fool";
    default: return "An unknown error occurred";
  }
}

export class ApiDataLoader extends React.Component {
  constructor(props) {
    super(props);

    if (props.endpoint == null)
      throw new Error("Property endpoint is missing");

    if (props.context == null)
      throw new Error("Property context is missing");

    this.state = {data: null};
    this.componentDidMount.bind(this);
  }

  componentDidMount() {
    callApi("GET", this.props.endpoint, undefined)
      .then(({data, error}) => {
        if (this.unmounted) return;
        if (error != null) {
          alert("Unable to fetch data from api");
          return;
        }

        this.setState({data});
      });
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  render() {
    const ContextProvider = this.props.context.Provider;
    return (
      <>
        {this.state.data != null ? (
          <ContextProvider value={this.state.data}>
            {this.props.children}
          </ContextProvider>
        ) : (
          <Spin />
        )}
      </>
    );
  }
}