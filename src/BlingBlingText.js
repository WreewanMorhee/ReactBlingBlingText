const BlingBlingText = ({ text }) => {
  useEffect(() => {
  }, [])

  return (
    <>
     {text.split('').map((letter) => <Text letter={letter} />)}
    </>
  )
}



const logicBox1 = withHandlers(() => ({
  set_span_to_text: ({
    element,
    loop_mode,
    set_infinite_energy,
    event_type,
    turn_on_current
  }) => () => {
    element.innerHTML = element.textContent
      .split("")
      .map(
        word =>
          `<span style="transition: .2s linear; display: inline-block">${word}</span>`
      )
      .join("")

    if (loop_mode) {
      set_infinite_energy()
    } else {
      element.addEventListener(event_type, turn_on_current)
    }
  }
}))


const logicBox2 = withHandlers(() => ({
  set_infinite_energy: ({ turn_on_current, loop_interval }) => () => {
    setInterval(turn_on_current, loop_interval)
  }
}))


const logicBox3 = withHandlers(() => ({
  turn_on_current: ({
    can_turn_on,
    element,
    set_css_style,
    move_speed,
    vanish_speed,
    set_can_turn_on
  }) => () => {
    if (!can_turn_on) return

    set_can_turn_on(false)
    Array.from(element.children).forEach((element, index) => {
      setTimeout(() => {
        set_css_style(element, true)
      }, index * move_speed)
    })

    setTimeout(() => {
      Array.from(element.children).forEach((element, index, array) => {
        setTimeout(() => {
          set_css_style(element, false)

          if (array.length === index + 1) {
            set_can_turn_on(true)
          }
        }, index * move_speed)
      })
    }, vanish_speed)
  }
}))


const logicBox4 = withHandlers(() => ({
  set_css_style: ({ blingbling_css }) => (element, is_current) => {
    Object.keys(blingbling_css).forEach(style_key => {
      if (is_current) {
        element.style[style_key] = blingbling_css[style_key]
      } else {
        element.style[style_key] = ""
      }
    })
  }
}))

const get_empty_css = blingbling_css => {
  let empty_css = {}

  Object.keys(blingbling_css).forEach((css_property) => {
    empty_css[css_property] = ''
  })

  return empty_css
}



const stateBox1 = withState('can_turn_on', 'set_can_turn_on', true)

import React, { useEffect } from 'react'
import { compose, withHandlers, withState, mapProps } from 'recompose'

export default compose(
  mapProps(
    ({
      element,
      event_type,
      move_speed,
      vanish_speed,
      loopInterval,
      blingbling_css
    }) => ({
      element,
      event_type: event_type === 'hover' ? 'mouseenter' : event_type,
      move_speed: 100000 / move_speed,
      vanish_speed,
      loopInterval,
      loop_mode: !event_type,
      blingbling_css,
      empty_css: get_empty_css(blingbling_css)
    })
  ),
  stateBox1,
  logicBox4,
  logicBox3,
  logicBox2,
  logicBox1,
)(BlingBlingText)
