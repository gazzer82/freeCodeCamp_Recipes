import React, {Component} from 'react';
import classNames from 'classnames';

export default class RecipeForm extends Component {
  constructor(props){
    super(props);
  }
  handleChange(event){
    var returnRecipe = this.props.currentRecipe;
    switch(event.target.id){
      case 'recipe_catergory':
        returnRecipe.catergory = event.target.value;
        break;
      case 'recipe_name':
        returnRecipe.name= event.target.value;
        break;
      case 'ingredients':
        returnRecipe.ingredients = event.target.value;
        break;
      case 'instructions':
        returnRecipe.instructions = event.target.value;
        break;
    }
    this.props.updateRecipe(returnRecipe);
  }
  render(){
    var returnRecipe = this.props.currentRecipe;
    $( "label" ).removeAttr('style');
    $( "label" ).addClass( this.props.activeState );
    var aciveClassToggle = classNames({
      'dummy_class': this.props.currentRecipe.name,
      'active': true
    })
    return(
      <div className="row recipe-form">
        <form className="col s10 offset-s1">
          <div className="row">
            <div className="input-field col s12">
              <input onChange={event =>this.handleChange(event)} value={this.props.currentRecipe.catergory} id="recipe_catergory" type="text" className="validate"/>
              <label className='active' htmlFor="recipe_catergory">Recipe Catergory</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input onChange={event =>this.handleChange(event)} value={this.props.currentRecipe.name} id="recipe_name" type="text" className="validate"/>
              <label className='active' htmlFor="recipe_name">Recipe Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <textarea onChange={event =>this.handleChange(event)} value={this.props.currentRecipe.ingredients} id="ingredients" className="materialize-textarea"></textarea>
              <label className='active' htmlFor="ingredients">Ingredients</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <textarea onChange={event =>this.handleChange(event)} value={this.props.currentRecipe.instructions} id="instructions" className="materialize-textarea"></textarea>
              <label className='active' htmlFor="instructions">Instructions</label>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
