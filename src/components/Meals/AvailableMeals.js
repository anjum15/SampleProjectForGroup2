import { useEffect, useState } from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem';


const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isDisplaying, setIsDisplaying] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
     const response = await  fetch('https://food-order-app-15400-default-rtdb.firebaseio.com/meals.json');

     if(!response.ok) {
       throw new Error('Something went wrong');
     }

     const responseData = await response.json();

     const loadedMeals = [];

     for(const key in responseData){
       loadedMeals.push({
         id: key,
         name: responseData[key].name,
         description: responseData[key].description,
         price: responseData[key].price
       });
     }

     setMeals(loadedMeals);
     setIsDisplaying(false);
    };
   
    fetchMeals().catch((error) => {
      setIsDisplaying(false);
      setHttpError(error.message);

    });
  }, []);

  if(isDisplaying){
    return (
      <section className={classes.MealIsDisplaying}>
        <p>Loading!!</p>
      </section>
    );
  }

  if(httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    )
  }

const mealsList = meals.map((meal) =>
<MealItem
key={meal.id}
id={meal.id}
name={meal.name}
description={meal.description}
price={meal.price} 
/>
);


  return ( <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
  }
export default AvailableMeals;