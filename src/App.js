const App = ({ data }) => (
  <>
    {data.map(({ class_name, ...props }) => {
      const comp_list = Array.from(document.querySelectorAll(class_name))

      return comp_list.map((ele, index) => (
        <BlingBlingText
          key={`${class_name}-index-${index + 1}`}
          element={ele}
          {...props}
        />
      ))
    })}
  </>
)



import React from 'react'
import ReactDOM from 'react-dom'
import BlingBlingText from './BlingBlingText'

export const init = props => {
  const container = document.createElement("DIV")
  document.body.appendChild(container)

  ReactDOM.render(<App {...props} />, container)
}
