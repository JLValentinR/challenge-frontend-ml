"use client"
import { useState, useEffect } from 'react'
import { useSearchParams } from "next/navigation"
import Image from 'next/image'
import Link from 'next/link'
import "./../scss/search.scss"
import axios from "axios"
import shipping from './../assets/ic_shipping2x.png'
import BreadCrumb from "./BreadCrumb"

export default function Items() {
  // Creamos list que contendra el resultado con el listado de productos
  const [list, setList] = useState()
  // Obtenemos el valor del parametro search
  const queryParameters = useSearchParams()
  const searchs = queryParameters.get("search")
  
  useEffect(() => {
    const getItems = async () => {
        const baseURL = "http://localhost:3000/pages/api/items?q=" + searchs;
        const items = await axios.get(baseURL)
        setList(items.data.resources)
    }
    getItems()
  }, [searchs])
  if (!list) return [];

  // Renderizamos los items de los productos recibidos del API
  const mostrarListado = list.items.slice(0, 4).map((objs, index) => 
    <li key={index}>
      <Link href={'/pages/items/' + objs.id}>
        <div className="left">
          <Image src={objs.picture} priority={true} width={180} height={180} style={{ width: 'auto', height: 'auto' }} alt="imagen del producto" />
          <div>
            <div className="costo">
              <p>$ {objs.price.amount.toLocaleString(objs.price.currency !== '' ? objs.price.currency : 'ARS')}</p>
              <p className="decimal">{objs.price.decimals > 9 ? objs.price.decimals : objs.price.decimals + '0' }</p>
              {objs.free_shipping ? <Image src={shipping.src} width={36} height={36} alt="" /> : ''}
            </div>
            <p className="titulo">{objs.title}</p>
            <div className="subtitle">{objs.condition}</div>
          </div>
        </div>
        <div className="right">
          <p>{objs.seller}</p>
        </div>
      </Link>
    </li>
  )
  
  return (
    <section className="search-container">
      <div className="search-elements">
        <BreadCrumb categorias={list.categories.length > 0 ? list.categories : [searchs]}></BreadCrumb>
        <article>
          <ul className="search-products">
            {list.items.length > 1 ? mostrarListado : 'No hay resultados'}
          </ul>
        </article>
      </div>
    </section>
  );
}
