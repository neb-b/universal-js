import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

class Purchase extends React.Component {
  onToken = (token) => {
    axios('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token)
    })
  }

  render () {
    const PUSBLISHABLE_STRIPE_KEY = 'pk_test_kIRQpdzXFM1dggeICkMkeSOZ'
    return (
      <div>
        <h3>Purchase Tickets</h3>
        <StripeCheckout
          name='Sergios Dance House'
          description='dance till the sunrise'
          token={this.onToken}
          stripeKey={PUSBLISHABLE_STRIPE_KEY}
        />
      </div>
    )
  }
}

export default Purchase
