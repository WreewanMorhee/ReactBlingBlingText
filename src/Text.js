import React from 'react'

const Text = ({letter, css_style}) => {
  return (
    <span style={{
        transition: '.2s linear',
        display: 'inline-block'
        ...css_style
      }}>{letter}</span>
  )
}

export default Text
