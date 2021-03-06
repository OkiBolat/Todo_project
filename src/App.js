/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Route, useHistory, useLocation } from 'react-router-dom';
import listSvg from './assets/img/Vector.svg'
////////////////////////////////////////////////
import { List, AddListButton, Tasks } from './components/point';
// import DB from '../src/assets/db.json'
///////////////////////////////////////////////////

export default function App() {

  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  let history = useHistory();
  let location = useLocation()

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
  const onAddTask = (listId, taskObj) => {
    const newList = lists.map(item => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];

      }
      return item;
    })
    setLists(newList)
  }

  const onEditListTitle = (id, title) => {
    const newList = lists.map(item => {
      if (item.id === id) {
        item.name = title;
      }
      return item
    })
    setLists(newList)
  }
  const onRemoveTask = (listId, taskId) => {
    if(window.confirm('Вы действительно хотите удалить задачу?')){
        const newList = lists.map(item => {
          if(item.id === listId){
            item.tasks = item.tasks.filter(task => task.id !== taskId)

          }
          return item
        });
        setLists(newList)
        axios.delete('http://localhost:3001/tasks/' + taskId).catch(() => {
            alert('Не удалось удалить задачу')
        });
    }
}
const onEditTask = (listId, taskObj) => {
    const newTaskText = window.prompt('Текст задачи', taskObj.text)
    if(!newTaskText) {
      return
    }
    const newList = lists.map(list => {
      if(list.id === listId){
        list.tasks = list.tasks.map(task => {
          if(task.id === taskObj.id) {
            task.text = newTaskText
          }
          return task
        })

      }
      return list
    });
    setLists(newList)
    axios.patch('http://localhost:3001/tasks/' + taskObj.id,{text: newTaskText.text}).catch(() => {
        alert('Не удалось редактировать задачу')
    });

}
const onCompleteTask =(listId, taskId, completed) => {
  const newList = lists.map(list => {
    if(list.id === listId){
      list.tasks = list.tasks.map(task => {
        if(task.id === taskId) {
          task.completed = completed
        }
        return task
      })

    }
    return list
  });
  setLists(newList)
  axios.patch('http://localhost:3001/tasks/' + taskId, {
    completed
  }).catch(() => {
      alert('Не удалось обновить задачу')
  });
}

  useEffect(() => {
    const listId = location.pathname.split(`lists/`)[1];
    if (lists) {
      const list = lists.find(list => list.id === Number(listId))
      console.log('До сета')
      setActiveItem(list)
    }

  }, [lists, location])


  return <div className='todo'>
    <div className='todo__sidebar'>
      <List
        onClickItem={item => {
          history.push('/')
        }}
        items={[
          {
            icon: <img src={listSvg} alt='list icon' />,
            name: 'Все задачи',
            active: location.pathname === '/',
          }

        ]

        }

      ></List>
      {lists ? (<List onRemove={id => {
        const newList = lists.filter(item => item.id !== id);
        setLists(newList)
      }}
        onClickItem={list => {
          history.push(`/lists/${list.id}`);
          console.log(list)
        }}
        activeItem={activeItem}
        items={lists}
        isRemovable >

      </List>) : ('Загрузка...')}
      <AddListButton onAdd={onAddList} colors={colors}></AddListButton>
    </div>
    <div className='todo__tasks'>
      <Route exact path="/">
        {lists &&
          lists.map(list => (
            <Tasks
              key={list.id}
              list={list}
              onAddTask={onAddTask}
              onEditTitle={onEditListTitle}
              onRemoveTask={onRemoveTask}
              onEditTask={onEditTask}
              onCompleteTask={onCompleteTask}
              withoutEmpty

            />
          ))}
      </Route>
      <Route path='/lists/:id'>
        {lists && activeItem && (
          <Tasks
            list={activeItem}
            onAddTask={onAddTask}
            onEditTitle={onEditListTitle}
            onRemoveTask={onRemoveTask}
            onEditTask={onEditTask}
            onCompleteTask={onCompleteTask}

          />
        )}
      </Route>


    </div>
  </div>;



}

