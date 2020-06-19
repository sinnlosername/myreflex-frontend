import React from "react";
import {Redirect} from "react-router-dom";
import {Spin} from "antd";
import {callApi} from "./api";

export default class ApiDataLoader extends React.Component {
  constructor(props) {
    super(props);

    if (props.endpoint == null)
      throw new Error("endpoint must be set");

    if (props.context == null && props.inline == null)
      throw new Error("Either inline or context must be set");

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

  getContextChild() {
    const ContextProvider = this.props.context.Provider;

    return (<ContextProvider value={{
      reloadData: this.reloadData.bind(this),
      data: this.state.data
    }}>
      {this.props.children}
    </ContextProvider>);
  }

  getInlineChild() {
    return (<>
      {this.props.children({
        reloadData: this.reloadData.bind(this),
        data: this.state.data
      })}
    </>);
  }

  render() {
    return (
      <>
        {this.state.data != null
          ? (this.props.inline ? this.getInlineChild() : this.getContextChild())
          : (this.state.error != null ? this.state.error : (<Spin style={{width: "100%"}}/>))}
      </>
    );
  }
}