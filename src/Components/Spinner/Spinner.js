import React from 'react'
import { css } from '@emotion/react'
import ClipLoader from 'react-spinners/ClipLoader'
import DotLoader from 'react-spinners/DotLoader'

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: auto;
  border-color: gold;
`

class AwesomeComponent extends React.Component {
  state = {
    loading: this.props.loading,
  }

  render() {
    return (
      <div className="sweet-loading">
        <DotLoader
          css={override}
          size={150}
          color={'gold'}
          loading={this.state.loading}
          speedMultiplier={2}
        />
      </div>
    )
  }
}

export default AwesomeComponent
