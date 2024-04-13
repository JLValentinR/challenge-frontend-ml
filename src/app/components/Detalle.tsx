"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import "./../scss/detail.scss"
import "./../scss/search.scss"
import axios from "axios"
import BreadCrumb from "./BreadCrumb"

export default function Id(props) {
  // Obtener el id de la url para poder consultar el detalle del producto
  const id: String = props.id
  const [detalle, setDetalle] = useState()
  useEffect(() => {
    // Nos conectamos al API por medio de axios
    const getItems = async () => {
      const baseURL = "http://localhost:3000/pages/api/items/" + id
      const items = await axios.get(baseURL)
      setDetalle(items.data.resources)
    }
    getItems()
  }, [id])
  if (!detalle) return []
  
  return (
    <section className="search-container">
      { Object.entries(detalle).length > 0 ?
      <div className="search-elements">
        <BreadCrumb categorias={[detalle.item.category]}></BreadCrumb>
        <div className="detail-container grid-container">
          <article className="img">
            <Image src={detalle.item.picture} width={0} height={0} priority={true} sizes="100vw" style={{ width: '100%', height: 'auto' }} alt="imagen del producto" />
          </article>
          <aside className="price">
            <p className="existentes">Nuevos . {detalle.item.sold_quantity} vendidos</p>
            <p className="title">{detalle.item.title}</p>
            <div className="precio">
              <p>$ {detalle.item.price.amount.toLocaleString(detalle.item.price.currency !== '' ? detalle.item.price.currency : 'ARS')}</p>
              <p className="decimal">{detalle.item.price.decimals > 9 ? detalle.item.price.decimals : detalle.item.price.decimals + '0'}</p>
            </div>
            <button className="comprar">Comprar</button>
          </aside>
          <div className="descriptions">
            <p>Descripción del producto</p>
            <p className="descripcion">{detalle.item.description}</p>
          </div>
          <div className="extra"></div>
        </div>
      </div>
      : <p>No existe el producto</p>}
    </section>
  );
}
