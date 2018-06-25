import React, { Component } from "react";
import Form from "react-jsonschema-form";
import config from "../../config";
import UserForm from "../UserForm";

const schema = {
  title: "用户注册",
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

export default class SignupForm extends Component {
  componentDidMount() {
    this.props.accountCheck(() => {
      this.props.history.pushState(null, "/builder");
    });
  }

  render() {
    const origin = window.location.origin + window.location.pathname;
    const onSubmit = ({ formData }) => {
      this.props.accountSignup(formData, () => {
        this.props.history.pushState(null, "/builder");
      });
    };

    return (<div className="narrow">
      <Form schema={schema} uiSchema={uiSchema} onSubmit={onSubmit}>
        <div>
        <div>
          <button type="submit" className="btn btn-primary">注册</button>
          &nbsp;&nbsp;&nbsp;&nbsp;已有账号? 现在 <a href="#/account/login"> 登录 </a>
        </div>
        </div>
      </Form>
      <p className="small" style={{ "margin-top": "2em" }}>
        本表单由 <a href={origin}>{config.projectName}</a> 提供技术支持
      </p>
    </div>
    );
  }
}
