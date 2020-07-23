import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    axios
      .get('https://react-hook-ea84b.firebaseio.com/ingredients.json')
      .then((response) => {
        const loadIngredients = [];
        for (const key in response.data) {
          loadIngredients.push({
            id: key,
            title: response.data[key].title,
            amount: response.data[key].amount,
          });
        }
        console.log(loadIngredients);
        setUserIngredients(loadIngredients);
      });
  }, []);

  const addIngredientHandler = (ingredient) => {
    axios
      .post(
        'https://react-hook-ea84b.firebaseio.com/ingredients.json',
        ingredient
      )
      .then((response) => {
        setUserIngredients((prevIngredients) => [
          ...prevIngredients,
          { id: response.name, ...ingredient },
        ]);
      });
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        {/* Need to add list here! */}
        <IngredientList ingredients={userIngredients} onRemoveItem={() => {}} />
      </section>
    </div>
  );
};

export default Ingredients;
