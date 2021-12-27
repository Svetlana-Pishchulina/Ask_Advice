import React, { Component } from 'react'

import adviceApi from '../../Services'
import styles from './Advice.module.css'
import startPicture from '../../pictures/advice_img2.jpg'
import notFoundPicture from '../../pictures/notFound2.png'
// import notFoundPicture from '../../pictures/notFound.jpg'
import Spinner from '../Spinner'

const Status = {
  IDLE: 'idle',
  PENDING: 'panding',
  RESOLVE: 'resolved',
  REJECTED: 'rejected',
}

class Advice extends Component {
  state = {
    advices: null,
    carrentAdviceNumber: null,
    status: Status.IDLE,
    error: null,
  }

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query
    const nextQuery = this.props.query

    if (prevQuery !== nextQuery) {
      this.setState({ status: Status.PENDING })

      adviceApi(nextQuery)
        .then((res) => {
          if (res.slips) {
            this.setState({
              advices: res,
              carrentAdviceNumber: 0,
              status: Status.RESOLVE,
              error: null,
            })
          } else {
            this.setState({
              advices: null,
              carrentAdviceNumber: null,
              error: res.message.text,
              status: Status.REJECTED,
            })
          }
        })
        .catch((err) =>
          this.setState({
            advices: null,
            carrentAdviceNumber: null,
            error: err,
            status: Status.REJECTED,
          })
        )
    }
  }

  onNextButtonClick = () => {
    const { advices, carrentAdviceNumber } = this.state
    if (advices.total_results - carrentAdviceNumber <= 1) {
      return
    }
    this.setState((prevState) => ({
      carrentAdviceNumber: prevState.carrentAdviceNumber + 1,
    }))
  }

  onPreviousButtonClick = () => {
    if (this.state.carrentAdviceNumber <= 0) {
      return
    }
    this.setState((prevState) => ({
      carrentAdviceNumber: prevState.carrentAdviceNumber - 1,
    }))
  }

  render() {
    const { advices, carrentAdviceNumber, status, error } = this.state

    if (status === 'idle') {
      return (
        <div className={styles.container}>
          <img className={styles.picture} src={startPicture} alt={'advice'} />
        </div>
      )
    }

    if (status === 'panding') {
      return (
        <div className={styles.container}>
          <Spinner loading={true} />
        </div>
      )
    }

    if (status === 'resolved') {
      const isManyAdvices = advices.total_results > 1
      return (
        <div className={styles.backgroundContainer}>
          <div>
            <span className={styles.adviceText}>
              {advices.slips[carrentAdviceNumber].advice}
            </span>
            {isManyAdvices && (
              <div className={styles.buttonContainer}>
                <button
                  className={styles.button}
                  onClick={this.onPreviousButtonClick}
                  disabled={carrentAdviceNumber <= 0}
                >
                  previous
                </button>
                <button
                  className={styles.button}
                  onClick={this.onNextButtonClick}
                  disabled={advices.total_results - carrentAdviceNumber <= 1}
                >
                  next
                </button>
              </div>
            )}
          </div>
        </div>
      )
    }

    if (status === 'rejected') {
      return (
        <div className={styles.container}>
          <div>
            <span className={styles.notFoundText}>{error}</span>
            <img
              className={styles.picture}
              src={notFoundPicture}
              alt={'not found'}
            />
          </div>
        </div>
      )
    }
  }
}

export default Advice
