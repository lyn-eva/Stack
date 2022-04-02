import React from 'react'
import Button from '../utility/Button'
import Iconify from '../utility/Iconify'
import Idea from './Idea';

const btnStyle = {fontSize: '14px', padding: '2px 8px', borderRadius: '4px'}
const iconifyData = { 'data-width':'14', style: {marginLeft: '.5rem'}};

const stacks = [
  {no: 1, idea: "remove unused code", line: "46", file: "Sidebar.js"},
  {no: 1, idea: "remove unused code", line: "46", file: "Sidebar.js"},
  {no: 1, idea: "remove unused code", line: "46", file: "Sidebar.js"},
]

function StackSection() {
  return (
    <section className='w-7/12'> 
      <h2 className='font-lato text-white font-medium text-2xl mb-1'>Your stack</h2>
      <hr />
      <ul className='flex gap-4 mt-4'>
        <li><Button style={btnStyle}>new idea<Iconify data-icon='ant-design:plus-outlined' {...iconifyData}/></Button></li>
        <li><Button style={btnStyle}>filter<Iconify data-icon='bytesize:filter' {...iconifyData}/></Button></li>
        <li><Button style={btnStyle}>sort<Iconify data-icon='cil:sort-descending' {...iconifyData}/></Button></li>
      </ul>
      <ul className='mt-4'>
        {stacks.map((stack) => <Idea {...stack}/>)}
      </ul>
    </section>
  )
}

export default StackSection