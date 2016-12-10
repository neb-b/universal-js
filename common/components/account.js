import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
import { Link } from 'react-router'
import NewUserModal from './account/modal'

class Account extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalVisible: props.newUser
    }
  }

  toggleModal () {
    this.setState({
      modalVisible: !this.state.modalVisible
    })
  }

  render () {
    return (
      <div>
        {
          this.state.modalVisible && <NewUserModal toggleModal={this.toggleModal.bind(this)} />
        }
        <Link to='account/dashboard'>
          <div className={css(styles.button)}>View Event Dashboard</div>
        </Link>
        <p>show this link only if they are venues</p>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  lead: {
    fontSize: 18,
    lineHeight: '1.5',
    margin: '0 0 1.5rem',
    color: '#555'
  },
  button: {
    width: '50%',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    backgroundColor: '#242424',
    color: '#fff'
  }
})

export default Account
