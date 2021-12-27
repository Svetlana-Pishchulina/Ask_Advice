import { Component } from 'react'
// import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Form from './Components/Form'
import Advise from './Components/Advice'
import styles from './App.module.css'

class App extends Component {
  state = {
    searchWord: '',
  }

  handleFormSubmit = (searchWord) => {
    this.setState({
      searchWord,
    })
  }

  render() {
    const { searchWord } = this.state
    return (
      <>
        {/* <ToastContainer /> */}
        <div className={styles.App}>
          <Form onFormSubmit={this.handleFormSubmit} />
          <Advise query={searchWord} />
        </div>
      </>
    )
  }
}

export default App
