import { NextRequest, NextResponse } from "next/server";

function getDecimal(num) {
  if (Number.isInteger(num)) {
    return 0;
  }

  const decimalStr = num.toString().split('.')[1];
  return Number(decimalStr);
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') as string
  try{
    // Nos conectamos al API de ML por medio de fetch utilizando async / await y le pasamos la palabra a buscar
    const data = await fetch("https://api.mercadolibre.com/sites/MLA/search?q=" + q)
    const resultado: Object = await data.json()
    // Construimos el objecto que regresaremos al front
    const objectoPropio: Object = {}
    objectoPropio.author = {
      name: "José Luis",
      lastname: "Valentín Rodríguez"
    }
    objectoPropio.categories = []
    objectoPropio.items = []
    // Leemos las categorias y se lo asignamos a nuestro objeto
    const filters = resultado.filters.filter(data => data.id === 'category')
    if (filters.length > 0) {
      filters[0].values[0].path_from_root.forEach((objs, index) => {
        objectoPropio.categories.push(objs.name)
      })
    }
    // Recorremos el array de objeto que recibimos del API de ML
    resultado.results.forEach((objs, index) => {
      // Agregamos los datos a nuestro objeto propio
      objectoPropio.items.push({
        id: objs.id,
        title: objs.title,
        price: {
          currency: objs.installments !== null ? objs.installments.currency_id : '',
          amount: Math.trunc(objs.price),
          decimals: getDecimal(objs.price)
        },
        picture: 'https://http2.mlstatic.com/D_NQ_NP_' + objs.thumbnail_id + '-W.jpg',
        condition: objs.condition,
        free_shipping: objs.shipping.free_shipping,
        seller: objs.seller.nickname
      })
    })
    // Regresamos nuestro objeto al front
    return NextResponse.json({ resources: objectoPropio })
  } catch (e) {
    return NextResponse.json({ resources: {} })
  }
}