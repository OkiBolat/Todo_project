/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import List from './list'
import plusPng from './img/plus.png'
import './List.scss'
import Badge from './Badge'
import closeSvg from '../../assets/img/close.svg'

export default function AddListButton({ colors }) {
    const [visiblePopup, setVisiblePopup] = useState(false)
    const [selectedColor, selectColor] = useState(colors[0].id)
    console.log(selectedColor)

    return <div className='add-list'>
        <List onClick={() => setVisiblePopup(true)} items={[
            {
                className: 'list__add-button',
                icon: <img src={plusPng} className='icon_add' alt='list icon' />,
                name: 'Добавить папку'
            }

        ]

        }></List>
        {visiblePopup && <div className='add-list__popup'>
            <img onClick={()=> setVisiblePopup(false)} src={closeSvg} className="add-list__popup-close-btn"/>
            <input className='field' type="text" placeholder='Название списка' />
            <div className='add-list__popup-colors'>

                {colors.map(color => <Badge onClick={() => selectColor(color.id)} color={color.name} key={color.id} 
                className={selectedColor === color.id && 'active'}
                ></Badge>)}

            </div>
            <button className='button'>Добавить</button>

        </div>}</div>
}