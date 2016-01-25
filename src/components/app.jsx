import React, { Component } from 'react';

import Nav from './nav.jsx';
import RecipeCard from './card.jsx';
import RecipeSlider from './recipe_slider.jsx';
import classNames from 'classnames';
import AddCard from './add_card.jsx'

/*const recipe={
  _id: '123456789',
  recipeType: 'Stir-Fry',
  recipeName: 'Orange and Beef Stir-Fry'
}*/

export default class App extends Component {
  constructor(props){
    super(props);
    var recipes = [];
    if(!localStorage.recipes){
      console.log('no existing recipes so adding new ones');
      recipes = [
        {
          _id: '12345678',
          catergory: 'Curries',
          name: 'Chicken Curry',
          ingredients: 'Chicken',
          instructions: 'Cook Curry'
        },
        {
          _id: '12345679',
          catergory: 'Curries',
          name: 'Lamb Curry',
          ingredients: 'Lamb',
          instructions: 'Cook Curry'
        },
        {
          _id: '12345610',
          catergory: 'Curries',
          name: 'Lamb Curry',
          ingredients: 'Chicken',
          instructions: 'Cook Lamb'
        }
      ]
    } else {
      console.log('loading recipes from local storage');
      recipes = JSON.parse(localStorage.recipes);
    }
    this.state = {
      recipes: recipes,
      currentRecipe: {},
      hideSlider: true,
      newRecipe: false,
      activeState: 'active'
    }
    this.showRecipe = this.showRecipe.bind(this);
    this.hideRecipe = this.hideRecipe.bind(this);
    this.deleteFunction = this.deleteFunction.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    //this.saveState();
  }
  saveState(){
    console.log('saving recipes to local storage');
    console.log(this.state.recipes);
    localStorage.recipes = JSON.stringify(this.state.recipes);
    console.log(JSON.parse(localStorage.recipes));
  }
  showRecipe(recipe){
    this.setState({
      hideSlider: false,
      currentRecipe: recipe,
      newRecipe: false
    })
  }
  hideRecipe(){
    if(this.state.newRecipe){
      //First add a timestamp to the new recipe so it has a unique id
      var currentRecipe = this.state.currentRecipe;
      currentRecipe._id = (new Date).getTime();
      //get all the current recipes and add the new ones to it
      var recipes = this.state.recipes;
      recipes.push(currentRecipe);
      //Update the state
      this.setState({
        recipes: recipes,
        currentRecipe: {}
      }, () => {
        this.saveState();
      });
    }
    this.setState({
      hideSlider: true
    });
  }
  updateRecipe(currentRecipe){
    this.setState({
      currentRecipe
    },() => {
      this.saveState()
    });
  }
  renderRecipeCards(){
    return this.state.recipes.map((recipe) => {
      return <RecipeCard key={recipe._id} recipe={recipe} showRecipe={this.showRecipe}/>
    })
  }
  deleteFunction(){
    var filteredRecipes = this.state.recipes.filter((recipe) => {
      return recipe._id !== this.state.currentRecipe._id
    });
    this.setState({
      recipes: filteredRecipes,
      hideSlider: true,
      currentRecipe: {}
    },() => {
    this.saveState()
    });
  }
  addRecipe(){
    this.setState({
      newRecipe: true,
      hideSlider: false,
      currentRecipe: {},
      activeState: 'false'
    })
  }
  render(){
    var overlayClass = classNames({
      'recipe-mask': true,
      'mask' : !this.state.hideSlider
    })
    return(
      <div>
        <Nav show={false}/>
        <div className='row'>
          {this.renderRecipeCards()}
          <AddCard addRecipe={this.addRecipe}/>
        </div>
        <RecipeSlider activeState={this.state.activeState} className='recipe-slider-master' updateRecipe={this.updateRecipe.bind(this)} hide={this.state.hideSlider} currentRecipe={this.state.currentRecipe} hideFunction={this.hideRecipe} deleteFunction={this.deleteFunction} newRecipe={this.state.newRecipe}/>
        <div className={overlayClass}></div>
      </div>
    );
  }
}
