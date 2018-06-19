import React, { Component } from "react";
import Form from "react-jsonschema-form";
import config from "../config";
import UserForm from "./UserForm";
import { stringify } from "querystring";

export default class Login extends Component {
  componentDidMount() {
    // If the schema properties is empty, then try to load the schema from the
    if (Object.keys(this.props.schema.properties).length === 0) {
      this.props.loadSchema(this.props.params.id, (data) => {
        document.title = data.schema.title;
      });
    }
  }

  render() {
    const origin = window.location.origin + window.location.pathname;
    const onSubmit = ({ formData }) => {
      alert(stringify(formData));
    };
    return (<div className="narrow">
      <Form schema={this.props.schema} uiSchema={this.props.uiSchema}
        onSubmit={onSubmit} />
      <p className="small">This form was created with the <a href={origin}>{config.projectName}</a>.</p>
    </div>
    );
  }
}
