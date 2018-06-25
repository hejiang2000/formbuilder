import { connect } from "react-redux";

import SignupForm from "../../components/user/Home";
import { bindActionCreators } from "redux";
import * as AccountActions from "../../actions/user";


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
