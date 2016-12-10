import React, { Component } from 'react'
import { css, StyleSheet } from 'aphrodite'

class NewUserModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
      sellerInit: false
    }
  }

  _renderSellerInfo (toggleModal) {
    return (
      <div>
        <div className={css(styles.modalText)}>
          <h3>Are you sure?</h3>
          <p>We will review your account before allowing you to sell ticekts</p>
        </div>
        <div className={css(styles.modalActions)}>
          <button
            className={css(styles.modalButton)}
            onClick={() => this.setState({sellerInit: false})}
            >
            Cancel
          </button>
          <button
            className={css(styles.modalButton)}
            onClick={() => {
              console.log('send request to create club')
              toggleModal()
            }}>
            Yes
          </button>
        </div>
      </div>
    )
  }

  _renderInitialView (toggleModal) {
    return (
      <div>
        <div className={css(styles.modalText)}>
          <h3>Thanks for signing up</h3>
          <p>Do you want to buy or sell tickets?</p>
        </div>
        <div className={css(styles.modalActions)}>
          <button
            className={css(styles.modalButton)}
            onClick={toggleModal}
            >
            Buy
          </button>
          <button
            className={css(styles.modalButton)}
            onClick={() => this.setState({sellerInit: true})}
            >
            Sell
          </button>
        </div>
      </div>
    )
  }

  render () {
    const { toggleModal } = this.props
    return (
      <div>
        <div className={css(styles.modal)}>
          {
            this.state.sellerInit
            ? this._renderSellerInfo(toggleModal)
            : this._renderInitialView(toggleModal)
          }
        </div>
        <div className={css(styles.overlay)} />
      </div>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    zIndex: 1,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    minWidth: '300px',
    height: '18em',
    backgroundColor: '#fff'
  },
  overlay: {
    zIndex: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: '#454545',
    opacity: 0.7
  },
  modalText: {
    textAlign: 'center',
    paddingTop: '5rem'
  },
  modalActions: {
    textAlign: 'center',
    cursor: 'poiner'
  },
  modalButton: {
    border: 'none',
    height: '5em',
    width: '8em',
    margin: '1em',
    cursor: 'pointer'
  }
})

export default NewUserModal
