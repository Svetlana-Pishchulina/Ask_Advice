import React, { Component } from 'react'
// import { toast } from 'react-toastify'
import styles from './Form.module.css'

class Form extends Component {
  state = {
    inputValue: '',
  }

  handleChangeInput = (e) => {
    this.setState({ inputValue: e.target.value.toLowerCase() })
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    // if (!this.state.inputValue) {
    //   toast('Введите ключевое слово')
    // }
    this.props.onFormSubmit(this.state.inputValue)
    this.setState({
      inputValue: '',
    })
  }

  render() {
    const isButtonDisable = !this.state.inputValue
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Ask for advice!</h1>
        <form className={styles.form} onSubmit={this.onFormSubmit}>
          <input
            className={styles.input}
            onChange={this.handleChangeInput}
            value={this.state.inputValue}
          ></input>
          <button
            className={styles.button}
            type="submit"
            disabled={isButtonDisable}
          >
            Seek advice
          </button>
        </form>
      </div>
    )
  }
}

export default Form
