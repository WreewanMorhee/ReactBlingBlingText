class CurrentEffect {
  constructor({
    element,
    eventType,
    energy,
    capacity,
    loopInterval,
    currentConfig
  }) {
    this.element = element
    this.event_type = eventType === 'hover' ? 'mouseenter' : eventType
    this.energy = 100000 / energy
    this.capacity = capacity
    this.can_turn_on = true
    this.loop_mode = !this.event_type
    this.loop_interval = loopInterval
    this.current_config = currentConfig
  }

  init = () => {
    this.element.innerHTML = this.element.textContent.split('').map((word) => (
      `<span style="transition: .2s linear; display: inline-block">${word}</span>`
    )).join('')

    if (this.loop_mode) {
      this.set_infinite_energy()
    } else {
      this.element.addEventListener(this.event_type, this.turn_on_current)
    }
  }

  set_style = (element, is_current) => {
    Object.keys(this.current_config).forEach((style_key) => {
      if (is_current) {
        element.style[style_key] = this.current_config[style_key]
      } else {
        element.style[style_key] = ''
      }
    })
  }

  turn_on_current = () => {
    if (!this.can_turn_on) return

    this.can_turn_on = false
    Array.from(this.element.children).forEach((element, index) => {
      setTimeout(() => {
        this.set_style(element, true)
      }, index * this.energy)
    })

    setTimeout(() => {
      Array.from(this.element.children).forEach((element, index, array) => {
        setTimeout(() => {
          this.set_style(element, false)

          if (array.length === index + 1) {
            this.can_turn_on = true
          }
        }, index * this.energy)
      })
    }, this.capacity)
  }



  set_infinite_energy = () => {
    setInterval(this.turn_on_current, this.loop_interval)
  }
}

export const current_effect_init = ({className, ...currentConfig}) => {
  Array.from(document.getElementsByClassName(className)).forEach((element) => {
    const CurrentEffectController = new CurrentEffect({
      element,
      ...currentConfig
    })
    CurrentEffectController.init()
  })
}
