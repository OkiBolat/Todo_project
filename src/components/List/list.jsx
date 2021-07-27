/* eslint-disable no-template-curly-in-string */
import React from 'react'
import axios from 'axios'
import './List.scss'
import classNames from 'classname'
import Badge from './Badge/Badge'
import removeSvg from '../../assets/img/remove.svg'
// import listSvg from '../assets/img/Vector.svg'

const list = ({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) => {
    console.log(activeItem)
    const removeList = (item) => {
        if (window.confirm('Вы действительно хотите удалить список')) {
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item.id)
            })

        }


    }
    // console.log(items)


    return <ul onClick={onClick} className='list'>

        {
            // eslint-disable-next-line array-callback-return
            items && items.map((item, index) => (

                <li key={index} className={classNames(item.className, { active: item.active? item.active :  activeItem && activeItem.id === item.id})}
                    onClick={onClickItem? () => onClickItem(item): null}
                >
                    <i>
                        {item.icon ? (item.icon) : <Badge color={item.color.name}></Badge>}
                    </i>
                    <span>
                        {item.name}
                        {item.tasks && ` (${item.tasks.length})`}

                    </span>
                    {isRemovable && (<img onClick={() => removeList(item)}
                        className='list__remove-icon'
                        src={removeSvg}
                        alt="Remove icon"
                        // eslint-disable-next-line react/jsx-no-duplicate-props
                        onClick={() => removeList(item)}

                    />)}

                </li>
            ))
        }

    </ul>

}
export default list;