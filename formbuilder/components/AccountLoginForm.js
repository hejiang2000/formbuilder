import React, { Component } from "react";
import Form from "react-jsonschema-form";
import config from "../config";

const schema = {
  title: "用户登录",
  type: "object",
  required: ["email", "password"],
  properties: {
    email: { type: "string", title: "电子邮件" },
    password: { type: "string", title: "登录密码" }
  }
};

const uiSchema = {
  email: {
  },
  password: {
    "ui:widget": "password"
  }
};

export default class LoginForm extends Component {
  componentDidMount() {
    this.props.accountCheck(() => {
      this.props.history.pushState(null, "/builder");
    });
  }

  render() {
    const origin = window.location.origin + window.location.pathname;
    const onSubmit = ({ formData }) => {
      this.props.accountLogin(formData, () => {
        this.props.history.pushState(null, "/builder");
      });
    };

    return (<div className="narrow">
      <Form schema={schema} uiSchema={uiSchema} onSubmit={onSubmit}>
        <div>
          <button type="submit" className="btn btn-primary">登录</button>
          &nbsp;&nbsp;&nbsp;&nbsp;没有账号? 现在 <a href="#/account/signup"> 注册 </a>
        </div>
      </Form>
      <p className="small" style={{ "margin-top": "2em" }}>本表单由 <a href={origin}>{config.projectName}</a> 提供技术支持</p>
    </div>
    );
  }
}
