import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateInput } from '../actions/inputActions.js';
import { submitForm } from '../actions/formActions.js';
import { styles } from '../styles';
import css from '../../../public/css/payment.css';
import axios from 'axios';

// force https address for stripe payments
// if (location.protocol ==='http:') {
//   location.href = location.href.replace(/^http:/, 'https:');
// }

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.stripe = Stripe('pk_test_01qGTTxV9m6rilCgqGcYzcXn');
    this.handlePaymentSubmit = this.handlePaymentSubmit.bind(this);
  }

  componentDidMount() {
    console.log('Payment: ', this.props);

    this.card = this.stripe.elements().create('card', styles.paymentForm);
    this.card.mount('#card-element');
    this.card.on('change', e => this.validatePayment(e));

    let inputs = document.querySelectorAll('input.field');
    Array.prototype.forEach.call(inputs, input => {
      input.addEventListener('focus', () => input.classList.add('is-focused'));
      input.addEventListener('blur', () => input.classList.remove('is-focused'));
      input.addEventListener('keyup', () => {
        input.value.length === 0 ? input.classList.add('is-empty') : input.classList.remove('is-empty');
      });
    });
  }

  showCharge(response) {
    let successElement = document.querySelector('.success');
    successElement.classList.remove('visible');

    if (response.data) {
      successElement.textContent = response.data;
      successElement.classList.add('visible');
    }
  }

  sendPayment(result) {
    //console.log('SendPayment Result:', result);
    var that = this;
    axios.post('/api/payment', {
      token: result.token,
      amount: result.amount,
      currency: result.currency,
      source: result.token.id,
      description: result.description,
      projectId: this.props.projectPage.content.id,
      projectFunded: this.props.projectPage.content.currentFunding
    })
      .then(function (response) {
        that.showCharge(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  validatePayment(result) {
    let errorElement = document.querySelector('.error');
    errorElement.classList.remove('visible');
    if (result.token) {
      this.sendPayment(result);
    } else if (result.error) {
      errorElement.textContent = result.error.message;
      errorElement.classList.add('visible');
    }
  }

  handlePaymentSubmit(e) {
    e.preventDefault();
    this.stripe.createToken(this.card).then(result => {
      result.name = document.getElementById('cardholder-name').value;
      result.amount = document.getElementById('payment-amount').value;
      result.currency = 'usd';
      result.description = 'Charge for TechStarter';

      this.validatePayment(result);
    });
  }

  render() {
    return (
      <div className='payment-body'>
        <form>
          <label>
            <input id='cardholder-name' className='field is-empty' placeholder='Jane Doe' />
            <span><span>Name</span></span>
          </label>
          <label>
            <input id='payment-amount' className='field is-empty' placeholder='$0.00' type='number' min='0' step='0.01' />
            <span><span>Amount</span></span>
          </label>
          <label>
            <div id='card-element' className='field is-empty'></div>
            <span><span>Card</span></span>
          </label>
          <button onClick={this.handlePaymentSubmit}>Support this project</button>
          <div className='outcome'>
            <div className='error' role='alert'></div>
            <div className='success'></div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({ projectPage: state.projectPage });

export default withRouter(connect(mapStateToProps)(Payment));
