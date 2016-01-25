import React, {Component} from 'react';
import {Button, Card, Row, Col} from 'react-materialize';

const cardClass = 'card-panel recipe-card-panel z-depth-1';
const cardClassHover = 'card-panel recipe-card-panel z-depth-3 card-active';

export default class RecipeCard extends Component{
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
          <div onClick={() => this.props.showRecipe(this.props.recipe)} onMouseEnter={() => this.onHover(true)} onMouseLeave={() => this.onHover(false)} className={this.state.cardClass}>
            <div className='recipe-header'><h5>{this.props.recipe.catergory}</h5></div>
            <div className='recipe-card-body'>
              <span><h5>{this.props.recipe.name}</h5></span>
            </div>
          </div>
        </div>
      </Col>
    )
  }
}
