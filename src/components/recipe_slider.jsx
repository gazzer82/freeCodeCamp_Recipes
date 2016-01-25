import React, {Component} from 'react';
import classNames from 'classnames';
import {Footer, Button, Card, Row, Col} from 'react-materialize';
import RecipeForm from './recipe_form.jsx';

export default class recipeSlider extends Component {
  constructor(props){
    super(props);
  }
  showHide(){
    return 'recipe-slider-outer ' + (this.props.show) ? '' : 'hide'
  }
  handleDivClick(event){
    if(event.target.id === 'outer'){
      this.props.hideFunction();
    }
  }
  handleClose(event){
    this.props.hideFunction();
  }
  handleDelete(event){
    this.props.deleteFunction();
  }
  render(){
    var sliderClass = classNames({
      'recipe-slider-outer': true,
      'offscreen' : this.props.hide
  })
    return (
      <div onClick={this.handleDivClick.bind(this)} className={sliderClass}>
        <div className='row recipe-slider-row' id='outer'>
          <div className='recipe-slider-col col s12 m8 l6 offset-m2 offset-l3'>
            <div className='slider-inner  z-depth-3' id='inner'>
              <RecipeForm activeState={this.props.activeState} Recipe={this.props.newRecipe} currentRecipe={this.props.currentRecipe} updateRecipe={this.props.updateRecipe}/>
              <div className='recipe-slider-footer-outer'>
                <Button onClick={this.handleClose.bind(this)} className='recipe-slider-button close' id='close'>Done</Button>
                <Button onClick={this.handleDelete.bind(this)} className='recipe-slider-button delete' id='cancel'>Delete</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
