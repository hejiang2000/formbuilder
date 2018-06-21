import React from "react";


export default function Welcome(props) {
  const createNewForm = () => {
    props.resetForm(() => {
      props.history.pushState(null, "/account/login");
    });
  };

  return (
    <div>
      <div className="jumbotron background">
        <div className="container">
          <h1>快速构建并使用表单</h1>
          <p>
            用于市场研究、社会调查、客户反馈、投票统计、人才招聘...
        </p>
          <p> 嵌入APP、网页，或者添加为网站链接，发送到聊天群、朋友圈...</p>
          <p> 完全免费，永久免费。</p>
          <p><button type="button" onClick={createNewForm} className="btn btn-primary btn-lg">开始使用</button></p>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h3><i className="glyphicon glyphicon-book"></i> 标准表单格式</h3>
            <p>我们使用标准 <a href="http://json-schema.org/">json-schema</a> 格式储存表单。该格式已被 IETF 发布为 Internet 标准草案:</p>
            <ul>
              <li><a href="https://datatracker.ietf.org/doc/draft-handrews-json-schema/" target="_blank">JSON Schema (core)</a></li>
              <li><a href="https://datatracker.ietf.org/doc/draft-handrews-json-schema-validation/" target="_blank">JSON Schema Validation</a></li>
              <li><a href="https://datatracker.ietf.org/doc/draft-handrews-json-schema-hyperschema/" target="_blank">JSON Hyper-Schema</a></li>
              <li><a href="https://datatracker.ietf.org/doc/draft-handrews-relative-json-pointer/" target="_blank">Relative JSON Pointers</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h3><i className="glyphicon glyphicon-equalizer"></i> 内置数据分析</h3>
            <p>我们了解您不仅需要数据本身的统计分析，更关心用户填写表单过程分析和行为追踪。另外，您也可以下载数据并使用第三方工具进行分析。</p>
          </div>
          <div className="col-md-4">
            <h3><i className="glyphicon glyphicon-eye-close"></i> 私密数据保护</h3>
            <p>您可以在这里进行表单设计，然后嵌入到您的应用中并使用我们开源 <a href="https://github.com/mozilla-services/react-jsonschema-form">react-jsonschema-form</a> 表单引擎进行渲染。没有任何数据上传到我们或第三方服务器！</p>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-default navbar-fixed-bottom" style={{"min-height": "3em"}}>
        <div className="container text-center text-default">
          © 2018 壹采集表单网
        </div>
      </nav>
    </div>
  );
}
