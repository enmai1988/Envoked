import React from 'react';
import { Modal, Fade } from 'react-bootstrap';
import { styles } from '../styles';

class Login extends React.Component {
  render() {
    return (
      <Fade in={true}>
        <div className='login'>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>
                Please login
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="omb_login">
                <h3 className="omb_authTitle">Login or <a href="/signup">Sign up</a></h3>
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
                    <form className="omb_loginForm" action="" autoComplete="off" method="POST">
                      <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-user"></i></span>
                        <input type="text" className="form-control" name="username" placeholder="email address"></input>
                      </div>
                      <span className="help-block"></span>

                      <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                        <input type="password" className="form-control" name="password" placeholder="Password"></input>
                      </div>
                      <span className="help-block">Password error</span>

                      <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
                    </form>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
          </Modal.Dialog>
        </div>
      </Fade>
    );
  }
}

export default Login;
