/* eslint-disable no-template-curly-in-string */
import React from 'react'
import './List.scss'
import classNames from 'classname'
import Badge from './Badge'
// import listSvg from '../assets/img/Vector.svg'

const list = ({ items, isRemovable, onClick }) => {

    return <ul onClick={onClick} className='list'>

        {
            // eslint-disable-next-line array-callback-return
            items.map((item, index) => (
                <li key={index} className={classNames(item.className, {'active' : item.active})} >
                    <i>
                        {item.icon ? ( item.icon ): (<Badge color={item.color}></Badge>)}
                    </i>
                    <span>{item.name}</span>
                </li>
            ))
        }

    </ul>

}
export default list;