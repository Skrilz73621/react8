import React, { useEffect } from 'react'
import { useRef } from 'react'

export default function UserPage({ info, deleteUser}) {

  const modalCloseRef = useRef(null)

  function openDeleteModal() {
    const modal = modalCloseRef.current
    modal.style.display = 'flex'
  }

  function closeDeleteModal() {
    const modal = modalCloseRef.current
    modal.style.display = 'none'
  }


  return (
    <div className='users'>

      <div className="modal" ref={modalCloseRef}>
        <div className="modalWindow">
          <h1>Пользователь успешно удален</h1>
          <button onClick={() => {closeDeleteModal(); deleteUser(info.id)}}>Закрыть</button>
        </div>

        <div className="overlay">

        </div>
      </div>

      <span>{info.name}</span>
      <span>{info.email}</span>
      <span>{info.username}</span>
      <button onClick={() => {openDeleteModal()}} >Удалить</button>
    </div>
  )
}
