import { connect } from "react-redux";

import LoginForm from "../../components/account/LoginForm";
import { bindActionCreators } from "redux";
import * as AccountActions from "../../actions/account";


function mapDispatchToProps(dispatch) {
  return bindActionCreators(AccountActions, dispatch);
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
