import React from 'react'
import PropTypes from 'prop-types'
import { CardText } from 'reactstrap'
import { format } from '../../formatter'

const FormattedProse = ({ prose }) => {
  return prose.split('\n').map((paragraph, index) =>
    (<CardText key={index}>{ format(paragraph) }</CardText>)
  )
}

FormattedProse.propTypes = {
  prose: PropTypes.string.isRequired
}

export default FormattedProse
