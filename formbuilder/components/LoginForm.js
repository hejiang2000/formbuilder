import React, { Component } from "react";
import Form from "react-jsonschema-form";
import config from "../config";
import UserForm from "./UserForm";

const schema = {
  title: "用户登录",
  type: "object",
  required: ["username", "password"],
  properties: {
    username: { type: "string", title: "用户名" },
    password: { type: "string", title: "密码"   }
  }
};

const uiSchema = {
  username: {
  },
  password: {
    "ui:widget": "password"
  }
};

export default class LoginForm extends Component {
  render() {
    const origin = window.location.origin + window.location.pathname;
    const onSubmit = ({ formData }) => {
      this.props.accountLogin(formData, ()=>{
        this.props.history.pushState(null, "/builder");
      });
    };
    return (<div className="narrow">
      <Form schema={schema} uiSchema={uiSchema} onSubmit={onSubmit} />
      <p className="small">This form was created with the <a href={origin}>{config.projectName}</a>.</p>
    </div>
    );
  }
}
