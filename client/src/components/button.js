import React from 'react'

function button({title, onClick, variant, disabled, fullWidth, type}) {

  let className = "bg-primary p-1 text-w "
  if(fullWidth ) 
  {
    className += ' w-full'
  }

  if(variant === 'outlined') 
  {
    className += className.replace('bg-primary' , 'border border-primary text-primary bg-white')
  }
  

  return (
    <button className= {className} type={type}>
        {title}
    </button>
  )
}

export default button