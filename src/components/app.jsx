import React, { Component } from 'react';
import ReactDom from 'react-dom';

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
          catergory: 'Desert',
          name: 'Pumpkin Pie',
          ingredients: 'Pumpkin Puree \nSweetened Condensed Milk \nEggs \nPumpkin Pie Spice \nPie Crust',
          instructions: 'Combine ingredients and bake in the oven at 280f for 2 hours'
        },
        {
          _id: '12345679',
          catergory: 'Italian',
          name: 'Spaghetti',
          ingredients: 'Noodles \nTomato Sauce \n(Optional) Meatballs',
          instructions: 'Cook noodles and Meetballs according to instructions, heat sauce thorougly and combine with meetballs. Plate up Spaghetti and spoon meatballs and sauce over them.'
        },
        {
          _id: '12345610',
          catergory: 'Pie',
          name: 'Onion Pie',
          ingredients: 'Onion \nPie Crust',
          instructions: 'Roll out Pie Crust and fit into pie tin. Add cooked onions to pie tin and bake in the oven for 3 hours at 270f'
        }
      ]
    } else {
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
    this.scrollToTop = this.scrollToTop.bind(this);
    //this.saveState();
  }
  saveState(){
    localStorage.recipes = JSON.stringify(this.state.recipes);
  }
  showRecipe(recipe){
    this.setState({
      hideSlider: false,
      currentRecipe: recipe,
      newRecipe: false,
      valid: false
    }, () => {
      this.validateRecipe();
      this.scrollToTop();
    })
  }
  validateRecipe(){
    if(
      typeof this.state.currentRecipe.catergory === 'string' &&
      typeof this.state.currentRecipe.name === 'string' &&
      typeof this.state.currentRecipe.ingredients === 'string' &&
      typeof this.state.currentRecipe.instructions === 'string'
    ){
      if(
        this.state.currentRecipe.catergory.length > 0 &&
        this.state.currentRecipe.name.length  > 0 &&
        this.state.currentRecipe.ingredients.length  > 0 &&
        this.state.currentRecipe.instructions.length  > 0
      ){
        console.log('recipe is valid');
        this.setState({
          valid: true
        })
      } else {
        console.log('recipe is invalid');
        this.setState({
          valid: false
        })
      }
    } else {
      console.log('recipe is invalid');
      this.setState({
        valid: false
      })
    }
  }
  hideRecipe(){
    if(this.state.valid){
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
    } else {
      console.log('recipe is not valid');
    }
  }
  updateRecipe(currentRecipe){
    this.setState({
      currentRecipe
    },() => {
      this.validateRecipe()
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
        currentRecipe: {
          type: undefined,
          name: undefined,
          ingredients: '',
          instructions: ''
        },
        activeState: 'false'
      }, () => {
        this.validateRecipe();
        this.scrollToTop();
      })
  }
  scrollToTop(){
    window.scrollTo(0, 0)
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
        <RecipeSlider activeState={this.state.activeState} className='recipe-slider-master' updateRecipe={this.updateRecipe.bind(this)} hide={this.state.hideSlider} currentRecipe={this.state.currentRecipe} hideFunction={this.hideRecipe} deleteFunction={this.deleteFunction} newRecipe={this.state.newRecipe} valid={this.state.valid}/>
        <div className={overlayClass}></div>
      </div>
    );
  }
}
