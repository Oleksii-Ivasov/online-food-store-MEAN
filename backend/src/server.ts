import express from 'express';
import cors from 'cors';
import { food } from './data';
import { tags } from './data';

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:4200'],
  })
);

app.get('/api/food', (req, res) => {
  res.send(food);
});

app.get('/api/food/search/:searhTerm', (req, res) => {
  const searchTerm = req.params.searhTerm;
  const foods = food.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.send(foods);
});

app.get('/api/food/tags', (req, res) => {
  res.send(tags);
});

app.get('/api/food/tag/:tagName', (req, res) => {
  const tagName = req.params.tagName;
  const foods = food.filter((food) => food.tags.includes(tagName));
  res.send(foods);
});

app.get('/api/food/:foodId', (req, res) => {
  const foodId = req.params.foodId;
  const foodItem = food.find((food) => food.id == foodId);
  res.send(foodItem);
});

const port = 5000;
app.listen(port, () => {
  console.log('website served on http://localhost:' + port);
});
