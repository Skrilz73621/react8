import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import UserPage from '../components/userPage/UserPage'

export default function MainPage() {

    const url = 'http://localhost:8000/users'
    const modalRef = useRef(null)

    const [info, setInfo] = useState([]);

    function openModal(){
        const modal = modalRef.current
        modal.style.display = 'flex'
    }

    function closeModal(){
        const modal = modalRef.current
        modal.style.display = 'none'
    }

    async function getUsers() {
        const response = await fetch(url)
        const data = await response.json()
        setInfo(data)
    }

    useEffect(() => {
        getUsers()
    }, [])

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()

    const submit = async (data) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (response.status === 201) {
                setInfo((prev) => [...prev, data])
                getUsers()
                openModal()
            }
        } catch (e) {
            console.log(e);
        }

        reset()
    }

    const deleteUser = async (id) => {
        const response = await fetch(`${url}/${id}`, {
            method: 'delete'
        })

        if (response.status === 200) {
            getUsers()
        }
    }

    return (
        <div>
            <div className="modal" ref={modalRef}>
                <div className="modalWindow">
                    <h1>Пользователь успешно добавлен</h1>
                    <button onClick={closeModal}>Закрыть</button>
                </div>
                <div className="overlay"></div>
            </div>

            <form onSubmit={handleSubmit(submit)}>
                <input type="text" {...register('name', { required: true })} placeholder='Имя' />
                {errors.name && <span style={{ color: 'red' }}>Заполни имя</span>}

                <input type="text" {...register('email', { required: true })} placeholder='Email' />
                {errors.email && <span style={{ color: 'red' }}>Заполни почту</span>}

                <input type="text" {...register('username', { required: true })} placeholder='Имя пользователя' />
                {errors.username && <span style={{ color: 'red' }}>Заполни имя пользователя</span>}

                <button type="submit">Сохранить</button>
            </form>

            <div className='table'>
                {
                    info.length ?
                        info.map((item) => (
                            <UserPage key={item.id} info={item} deleteUser={deleteUser} />
                        )) : <div>Список пуст</div>
                }
            </div>
        </div>
    )
}
