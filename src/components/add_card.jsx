import React, {Component} from 'react';
import {Button, Card, Row, Col} from 'react-materialize';

const cardClass = 'card-panel recipe-card-panel z-depth-1 add-button-panel';
const cardClassHover = 'card-panel recipe-card-panel z-depth-3 add-button-panel card-active';

export default class AddCard extends Component{
  constructor(props){
    super(props)
    this.state = {
      cardClass: cardClass,
      innerCardClass: 'card-col-inner'
    }
  }
  onHover(active){
    this.setState({
      cardClass: (active) ? cardClassHover : cardClass
    });
  }
  render(){
    return(
      <Col className='card-col' l={3} m={4} s={12}>
        <div className='card-col-inner-front'>
          <div onClick={() => this.props.addRecipe()} onMouseEnter={() => this.onHover(true)} onMouseLeave={() => this.onHover(false)} className={this.state.cardClass}>
            <Button floating large className='orange' waves='light' icon='add' />
          </div>
        </div>
      </Col>
    )
  }
}
