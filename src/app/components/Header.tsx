"use client"
import { useState, useEffect } from 'react';
import "./../scss/header.scss";
import logo from './../assets/logo_ml2x.png'
import logo2 from './../assets/logo_mlnormal.png'
import searchImg from './../assets/ic_search2x.png'
import searchImg2 from './../assets/ic_searchnormal.png'

export default function Header() {
  const queryParametro: Object = new URLSearchParams(window.location.search)
  const parametro: String = queryParametro.get("search")
  const [search, setSearch] = useState('')
  const anchoWindow: Number = window.innerWidth

  useEffect(() => {
    // Validamos si el parametro es diferente a null y lo agregamos a nuestro estado llamado search
    if (parametro !== null) {
      setSearch(parametro)
    }
  }, [parametro])

  const showImg = () => {
    if (anchoWindow < 576) {
      return true
    }
    return false
  }

  const buscar = (event: any) => {
    // Concatenamos la ruta con la palabra ingresada en el campo de texto
    window.location = '/items?search=' + search
    event.preventDefault()
  }

  const palabra = (event: any) => {
    setSearch(event.target.value)
  }

  const limpiarBuscador = () => {
    setSearch('')
  }

  return (
    <header className="header-container">
      <form onSubmit={buscar} className="header-elements">
        <a href="/" onClick={limpiarBuscador}>
          <img src={showImg() ? logo2.src : logo.src} alt="Logo" />
        </a>
        <div className="container-input">
          <input type="text" value={search} onChange={palabra} placeholder='Nunca dejes de buscar' />
          <div>
            <img src={showImg() ? searchImg2.src : searchImg.src} onClick={buscar} alt="Icono buscar" />
          </div>
        </div>
      </form>
    </header>
  );
}
