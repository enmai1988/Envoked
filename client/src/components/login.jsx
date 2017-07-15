import React from 'react';
import { styles } from '../styles';

class Login extends React.Component {
  render() {
    return (
      <div id='login-dp'>
        <div className="row">
          <div className="col-md-12">
            Login via
            <div className="social-buttons">
              <a href="/auth/facebook" className="btn btn-fb"><i className="fa fa-facebook"></i> Facebook</a>
              <a href="/auth/google" className="btn btn-google"><i className="fa fa-google-plus"></i> Google</a>
            </div>
            or
            <form className="form" role="form" acceptCharset="UTF-8" id="login-nav">
              <div className="form-group">
                <label className="sr-only" htmlFor="exampleInputEmail2">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail2" placeholder="Email address" required></input>
              </div>
              <div className="form-group">
                <label className="sr-only" htmlFor="exampleInputPassword2">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Password" required></input>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">Sign in</button>
              </div>
            </form>
          </div>
          <div className="bottom text-center">
            New here ? <a href="/auth/signup"><b>Join Us</b></a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
