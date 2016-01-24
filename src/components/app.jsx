import React, { Component } from 'react';

import Nav from './nav.jsx';
import RecipeCard from './card.jsx';

const recipe={
  recipeType: 'Stir-Fry',
  recipeName: 'Orange and Beef Stir-Fry'
}

export default class App extends Component {
  render(){
    return(
    <div>
      <Nav />
      <div className='row'>
        <RecipeCard recipe={recipe}/>
        <RecipeCard recipe={recipe}/>
        <RecipeCard recipe={recipe}/>
        <RecipeCard recipe={recipe}/>
        <RecipeCard recipe={recipe}/>
        <RecipeCard recipe={recipe}/>
        <RecipeCard recipe={recipe}/>
        <RecipeCard recipe={recipe}/>
      </div>
    </div>
    );
  }
}
