import React from "react";
import { Link } from "react-router";


export default function Header(props) {
  return (
    <div className="navbar navbar-default navbar-static-top" role="navigation" style={{"min-height":"1em"}}>
    <div className="container">
      <div className="navbar-header">
        <a className="navbar-brand" href="#">壹采集问卷</a>
      </div>
      <div className="navbar-collapse collapse">
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/">首页</Link></li>
          <li><Link to="/faq">API</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
        </ul>
      </div>
    </div>
  </div>);
}
