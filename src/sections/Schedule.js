import React, {useState} from 'react'
import {Button} from "@rmwc/button";
import '../index.scss';
import '@rmwc/button/styles';

const Schedule = () => {

  const [shortlistOpen, setShortlistOpen] = useState(false)

  return (<div style={{
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  }}>

    <div style={{
      display: 'flex',
      flexGrow: 1,
      alignItems: "center",
    }}>
      <Button
        unelevated
        className={'shortlist-button'}
        onMouseDown={(e) => {
          e.preventDefault()
        }}
        onClick={() => setShortlistOpen(!shortlistOpen)}
        icon={shortlistOpen ? "keyboard_arrow_right" : "shopping_cart"}
      >
      </Button>
    </div>
    <div style={{
      display: 'flex',
      width: shortlistOpen ? 320 : 0,
      transition: '0.3s',
      borderLeft: "1px solid #e0e0e0"
    }}>

    </div>
  </div>
)
}

export default Schedule
