import React from 'react'
import Button from '../utility/Button'
import Iconify from '../utility/Iconify'

function StackSection() {
  return (
    <section className='w-7/12'> 
      <h2 className='font-lato text-white font-semibold text-xl mb-1'>Your stack</h2>
      <hr />
      <ul className='flex gap-4 mt-4'>
        <li><Button style={{fontSize: '14px', padding: '2px 8px', borderRadius: '4px'}}>new idea<Iconify data-icon='ant-design:plus-outlined' data-width='14' style={{marginLeft: '.5rem'}}/></Button></li>
        <li><Button style={{fontSize: '14px', padding: '2px 8px', borderRadius: '4px'}}>filter<Iconify data-icon='bytesize:filter' data-width='14' style={{marginLeft: '.5rem'}}/></Button></li>
        <li><Button style={{fontSize: '14px', padding: '2px 8px', borderRadius: '4px'}}>sort<Iconify data-icon='cil:sort-descending' data-width='14' style={{marginLeft: '.5rem'}}/></Button></li>
      </ul>
    </section>
  )
}

export default StackSection