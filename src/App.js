/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import List from './components/List/list';
import listSvg from './assets/img/Vector.svg'
import AddListButton from './components/List/AddListButton';
import DB from './assets/db.json';

export default function App() {
  // 

  return <div className='todo'>
    <div className='todo__sidebar'>
      <List items={[
        {
          icon: <img src={listSvg} alt='list icon' />,
          name: 'Все задачи',
          active: true,
        }

      ]

      }
      
      ></List>
      <List items={[
        {
          color: "green",
          name: 'Покупки',
        },
        {
          color: "blue",
          name: 'Фронтенд'
        },
        {
          color: "purple",
          name: 'Фильмы и сериалы'
        },
        {
          color: "lime",
          name: 'Книги'
        },
        {
          color: "grey",
          name: 'Личное'
        }

      ]

      }
        isRemovable >

      </List>
      <AddListButton colors={DB.colors}></AddListButton>
    </div>
    <div className='todo__tasks'></div>
  </div>;



}
