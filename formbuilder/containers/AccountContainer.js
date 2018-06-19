import { connect } from "react-redux";

import Login from "../components/Login";
import { bindActionCreators } from "redux";
import * as AccountActions from "../actions/account";

function mapDispatchToProps(dispatch) {
    return bindActionCreators(AccountActions, dispatch);
  }
  
  function mapStateToProps(state) {
    return {
      schema: state.form.schema,
      uiSchema: state.form.uiSchema,
      formData: state.form.formData,
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login);
  