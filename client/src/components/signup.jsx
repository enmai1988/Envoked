import React from 'react';
import { Modal } from 'react-bootstrap';
import { styles } from '../styles';

class Signup extends React.Component {
  render() {
    return (
      <div className='login'>
        <Modal.Dialog style={styles.loginModal}>
          <Modal.Body>
            <div className="omb_login">
              <h3 className="omb_authTitle">Sign up with</h3>
              <div className="row omb_row-sm-offset-3 omb_socialButtons">
                <div className="social_login_button">
                  <a href="/auth/facebook" className="btn btn-lg btn-block omb_btn-facebook">
                    <i className="fa fa-facebook visible-xs"></i>
                    <span className="hidden-xs">Facebook</span>
                  </a>
                </div>
                <div className="social_login_button">
                  <a href="/auth/linkedin" className="btn btn-lg btn-block omb_btn-twitter">
                    <i className="fa fa-twitter visible-xs"></i>
                    <span className="hidden-xs">Linkedin</span>
                  </a>
                </div>
                <div className="social_login_button">
                  <a href="/auth/google" className="btn btn-lg btn-block omb_btn-google">
                    <i className="fa fa-google-plus visible-xs"></i>
                    <span className="hidden-xs">Google+</span>
                  </a>
                </div>
              </div>

              <div className="row omb_row-sm-offset-3 omb_loginOr">
                <div className="col-xs-12 col-sm-6">
                  <hr className="omb_hrOr"></hr>
                  <span className="omb_spanOr">or</span>
                </div>
              </div>

              <div className="row omb_row-sm-offset-3">
                <div className="col-xs-12 col-sm-6">
                  <form className="omb_loginForm" autoComplete="off">

                    <div className="input-group">
                      <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                      <input type="text" className="form-control" name="username" placeholder="First Name"></input>
                    </div>
                    <span className="help-block"></span>

                    <div className="input-group">
                      <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                      <input type="text" className="form-control" name="username" placeholder="Last Name"></input>
                    </div>
                    <span className="help-block"></span>

                    <div className="input-group">
                      <span className="input-group-addon"><i className="glyphicon glyphicon-envelope"></i></span>
                      <input type="text" className="form-control" name="username" placeholder="Email address"></input>
                    </div>
                    <span className="help-block"></span>

                    <div className="input-group">
                      <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                      <input type="password" className="form-control" name="password" placeholder="Password"></input>
                    </div>
                    <span className="help-block">Password error</span>

                    <div className="input-group">
                      <span className="input-group-addon"><i className="glyphicon glyphicon-earphone"></i></span>
                      <input type="text" className="form-control" name="username" placeholder="Phone number"></input>
                    </div>
                    <span className="help-block"></span>

                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign me up</button>
                  </form>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer style={styles.signupMsg}>
            <span>Already have an account? <a href="/auth/login">Log in here</a></span>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  }
}

export default Signup;
