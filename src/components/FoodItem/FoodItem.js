import React, { Component } from 'react';
import "./FoodItem.css";

export default class FoodItem extends Component {

    render() {
        const { name, imgUrl, description, calorie, sugar, handleFoodClick, selectedFood } = this.props;
        return (
            <div className="foodItem" onClick={() => handleFoodClick(name)}>
                <div id="imgUrl"><img src={imgUrl} alt="pic"/></div>
                <div id="name">{name}</div>
                {selectedFood === name && <div id="calorie">Calorie: {calorie}</div>}
                {selectedFood === name && <div id="sugar">Sugar: {sugar}</div>}
                {selectedFood===name && <div id="desc">Description: {description}</div>}
            </div>
        )
    }
}
