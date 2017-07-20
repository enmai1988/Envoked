export const styles = {
  nav: {
    title: {
      color: 'white',
      cursor: 'pointer'
    },
    authButton: {
      backgroundColor: 'rgb(59, 62, 60)'
    }
  },
  header: {
    height: '32px',
    backgroundColor: 'rgb(59, 62, 60)',
    width: '100%',
    borderRadius: '0px',
    border: '0px',
    left: '0px',
    display: 'block',
    position: 'fixed',
    zIndex: 100
  },
  loginModal: {
    marginTop: '5%'
  },
  signupMsg: {
    textAlign: 'center'
  },
  searchDiv: {
    width: '200px'
  },
  showcase: {
    height: '1650px',
    borderRadius: '0px'
  },
  footer: {
    button: {
      backgroundColor: 'Transparent',
      border: 'none',
      borderRadius: '0px',
      color: 'rgb(250, 250, 250)',
      outline: 'none'
    }
  },
  paymentForm: {
    iconStyle: 'solid',
    style: {
      base: {
        iconColor: '#8898AA',
        color: 'white',
        lineHeight: '36px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '19px',

        '::placeholder': {
          color: '#8898AA',
        },
      },
      invalid: {
        iconColor: '#e85746',
        color: '#e85746',
      }
    },
    classes: {
      focus: 'is-focused',
      empty: 'is-empty',
    },
  }
};
