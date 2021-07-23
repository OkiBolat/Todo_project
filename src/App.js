/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import listSvg from './assets/img/Vector.svg'
////////////////////////////////////////////////
import { List, AddListButton, Tasks } from './components/point';
// import DB from '../src/assets/db.json'
///////////////////////////////////////////////////

export default function App() {

  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({ data }) => {
      setLists(data)
      console.log(data)
    });
      axios.get('http://localhost:3001/colors').then(({ data }) => {
    setColors(data)
      })
    }, []);

    
    const onAddList = obj => {
      const newList = [
        ...lists, obj
      ]
      setLists(newList);

    }
  



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
        {lists? (<List onRemove={id => {
          const newList = lists.filter(item => item.id !== id);
          setLists(newList)
        }} items={lists} 
          isRemovable >

        </List>) : ('Загрузка...')}
        <AddListButton onAdd={onAddList} colors={colors}></AddListButton>
      </div>
      <div className='todo__tasks'>
       {lists && <Tasks list ={lists[1]}>

        </Tasks>}
      </div>
    </div>;



      }
  
