"use client"
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from "next/navigation"
import Image from 'next/image'
import Link from 'next/link'
import "./../scss/header.scss"
import logo2 from './../assets/logo_mlnormal.png'
import searchImg2 from './../assets/ic_searchnormal.png'

export default function Header() {
  const { push } = useRouter()
  const searchParams = useSearchParams()
  const myParam = searchParams.get("search")
  // Obtenemos el valor del parametro search
  const queryParametro = useSearchParams()
  const parametro: String = searchParams.get("search")
  const [search, setSearch] = useState('')

  useEffect(() => {
    // Validamos si el parametro es diferente a null y lo agregamos a nuestro estado llamado search
    if (parametro !== null) {
      setSearch(parametro)
    }
  }, [parametro])

  const buscar = (event: any) => {
    // Concatenamos la ruta con la palabra ingresada en el campo de texto
    // window.location = '/items?search=' + search
    push('/items?search=' + search)
    event.preventDefault()
  }
  // Esta función agrega a nuestro estado search la/las palabras que ingresamos en el campo de texto
  const palabra = (event: any) => {
    setSearch(event.target.value)
  }
  // Esta función limpia el campo de texto cuando se da click en el logo
  const limpiarBuscador = () => {
    setSearch('')
  }

  return (
    <header className="header-container">
      <form onSubmit={buscar} className="header-elements">
        <Link href="/" onClick={limpiarBuscador}>
          <Image src={logo2.src} width={53} height={36} alt="Logo" />
        </Link>
        <div className="container-input">
          <input type="text" value={search} onChange={palabra} placeholder='Nunca dejes de buscar' />
          <div>
            <Image src={searchImg2.src} width={18} height={18} alt="Logo" />
          </div>
        </div>
      </form>
    </header>
  );
}
