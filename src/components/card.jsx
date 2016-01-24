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
  showRecipe(){
    this.onHover(false);
    this.setState({
      innerCardClass: (this.state.innerCardClass === 'card-col-inner rotate') ? 'card-col-inner' : 'card-col-inner rotate'
    })
  }
  render(){
    return(
      <Col className='card-col' l={3} m={4} s={10} offset={'s1'}>
        <div className={this.state.innerCardClass}>
          <div className='card-col-inner-front'>
            <div onClick={() => this.showRecipe()}onMouseEnter={() => this.onHover(true)} onMouseLeave={() => this.onHover(false)} className={this.state.cardClass}>
              <div className='recipe-header'><h5>{this.props.recipe.recipeType}</h5></div>
              <div className='recipe-card-body'>
                <span><h5>{this.props.recipe.recipeName}</h5></span>
              </div>
            </div>
          </div>
          <div className='card-col-inner-back'>
            <div onClick={() => this.showRecipe()}onMouseEnter={() => this.onHover(true)} onMouseLeave={() => this.onHover(false)} className={this.state.cardClass+ ' back'}>
              <div className='recipe-header'><h5>{this.props.recipe.recipeType}</h5></div>
              <div className='recipe-card-body'>
                <span><h5>{this.props.recipe.recipeName}</h5></span>
              </div>
            </div>
          </div>
        </div>
      </Col>
    )
  }
}
