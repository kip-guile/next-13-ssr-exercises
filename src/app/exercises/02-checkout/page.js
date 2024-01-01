'use client'
import React, { useEffect, useState } from 'react'

import DATA from './data'
import reducer from './reducer'
import StoreItem from './StoreItem'
import CheckoutFlow from './CheckoutFlow'
import Spinner from '../../../components/Spinner'
import './styles.css'

function CheckoutExercise() {
  const [items, dispatch] = React.useReducer(reducer, null)

  useEffect(() => {
    if (items === null) {
      return
    }
    window.localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  useEffect(() => {
    const savedCart = window.localStorage.getItem('cart')
    const cart = JSON.parse(savedCart)

    dispatch({
      type: 'initialize',
      payload: cart,
    })
  }, [])

  return (
    <>
      <h1>Neighborhood Shop</h1>

      <main>
        <div className='items'>
          {DATA.map((item) => (
            <StoreItem
              key={item.id}
              item={item}
              handleAddToCart={(item) => {
                dispatch({
                  type: 'add-item',
                  item,
                })
              }}
            />
          ))}
        </div>

        {items ? (
          <CheckoutFlow
            items={items}
            taxRate={0.15}
            handleDeleteItem={(item) => {
              dispatch({
                type: 'delete-item',
                item,
              })
            }}
          />
        ) : (
          <Spinner />
        )}
      </main>
    </>
  )
}

export default CheckoutExercise
