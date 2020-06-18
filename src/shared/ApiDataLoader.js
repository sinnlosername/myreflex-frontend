import React from "react";
import {Redirect} from "react-router-dom";
import {Spin} from "antd";
import {callApi} from "./api";

export default class ApiDataLoader extends React.Component {
  constructor(props) {
    super(props);

    if (props.endpoint == null)
      throw new Error("Property endpoint is missing");

    if (props.context == null)
      throw new Error("Property context is missing");

    this.state = {data: null, error: null};
    this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.reloadData();
  }

  reloadData() {
    callApi("GET", this.props.endpoint, undefined)
      .then(({data, error, errorCode}) => {
        if (this.unmounted) return;
        if (error == null) {
          this.setState({data, error: null});
          return;
        }

        if (errorCode === "SESSION_INVALID") {
          this.setState({data: null, error: (<Redirect to="../login"/>)});
        } else {
          this.setState({data: null, error: "Unable to fetch data from api"});
        }
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
          <ContextProvider value={{
            reloadData: this.reloadData.bind(this),
            data: this.state.data
          }}>
            {this.props.children}
          </ContextProvider>
        ) : (this.state.error != null ? this.state.error : (<Spin style={{width: "100%"}}/>))}
      </>
    );
  }
}