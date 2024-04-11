"use client"
import { useState, useEffect } from 'react';
import "./../scss/search.scss";
import axios from "axios";
import shipping from './../assets/ic_shipping2x.png';
import shipping2 from './../assets/ic_shippingnormal.png';
import BreadCrumb from "./../components/BreadCrumb";

export default function Items() {
  const [list, setList] = useState('')
  const queryParameters = new URLSearchParams(window.location.search)
  const searchs = queryParameters.get("search")
  const anchoWindow = window.innerWidth
  useEffect(() => {
    const getItems = async () => {
        const baseURL = "http://localhost:3030/items?q=" + searchs;
        const items = await axios.get(baseURL)
        setList(items.data.resources)
    }
    getItems()
  }, [searchs])
  if (!list) return [];
  const showImg = () => {
    if (anchoWindow < 576) {
         return true
    }
    return false
  }

  const mostrarListado = list.items.slice(0, 4).map((objs, index) => 
    <li key={index}>
      <a href={'/items/' + objs.id}>
        <div className="left">
          <img src={objs.picture} alt="imagen del producto" />
          <div>
            <div className="costo">
              <p>$ {objs.price.amount.toLocaleString(objs.price.currency !== '' ? objs.price.currency : 'ARS')}</p>
              <p className="decimal">{objs.price.decimals > 9 ? objs.price.decimals : objs.price.decimals + '0' }</p>
              {objs.free_shipping ? <img src={showImg() ? shipping2.src : shipping.src} alt="" /> : ''}
            </div>
            <p className="titulo">{objs.title}</p>
            <div className="subtitle">{objs.condition}</div>
          </div>
        </div>
        <div className="right">
          <p>{objs.seller}</p>
        </div>
      </a>
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
