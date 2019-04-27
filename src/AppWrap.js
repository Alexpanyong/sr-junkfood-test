import React, { Component } from 'react';
import './AppWrap.css';
import FoodItem from './components/FoodItem/FoodItem';
import { JunkFood } from './data/JunkFood';

export default class AppWrap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            food: [],
            selectedFood: null,
            inputText: "",
            searchResult: []
        }
        this.handleFoodClick = this.handleFoodClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateInputBox = this.updateInputBox.bind(this);
        this.toggleSuggestBox = this.toggleSuggestBox.bind(this);
    }

    componentDidMount() {
        this.setState({
            food: JunkFood,
            searchResult: []
        });
    }

    handleFoodClick(i) {
        this.setState({
            selectedFood: i
        });
    }

    handleInputChange(e) {
        const searchResult = this.state.food.filter(item => item.name.includes(e.target.value));
        this.setState({
            inputText: e.target.value,
            searchResult: e.target.value === "" ? [] : searchResult
        });
    }

    updateInputBox(item) {
        const inputBox = document.getElementById("inputBox");
        inputBox.value = item;
        const searchResult = this.state.food.filter(item => item.name.includes(inputBox.value));
        this.setState({
            inputText: inputBox.value,
            searchResult: searchResult
        });
        this.toggleSuggestBox();
    }

    toggleSuggestBox() {
        const box = document.getElementById("suggestBox");
        if (box.classList.contains("off")) {
            box.classList.remove("off");
        } else {
            box.classList.add("off");
        }
    }

    render() {
        const { food, inputText, searchResult } = this.state;
        const Items = inputText === "" ? food : searchResult;
        return (
        <div className="appWrap">
            <div className="searchBar">
                <span>Search by name: </span>
                <div className="inputBoxWrap">
                    <input className="inputBox" id="inputBox" type="text" placeholder="Type 'c', 'i', 'e', etc." onChange={this.handleInputChange} />
                    {searchResult.length !== 0 && 
                        <div className="suggestBox" id="suggestBox">
                            {searchResult.map(result => (
                                <div className="suggestItem" 
                                    key={result.id} 
                                    onClick={() => { this.updateInputBox(result.name)}}
                                    >
                                {result.name}
                                </div>
                            ))}
                        </div>}
                </div>
            </div>
            {Items && Items.map(item => <FoodItem 
                key={item.id} 
                name={item.name} 
                imgUrl={item.imgUrl}
                description={item.description}
                calorie={item.calorie}
                sugar={item.sugar}
                handleFoodClick={this.handleFoodClick}
                selectedFood={this.state.selectedFood}
                />)}
        </div>
        )
    }
}
