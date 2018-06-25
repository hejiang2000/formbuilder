import { connect } from "react-redux";

import SignupForm from "../../components/account/SignupForm";
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
)(SignupForm);
