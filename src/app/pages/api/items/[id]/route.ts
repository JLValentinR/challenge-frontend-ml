import { NextRequest, NextResponse } from "next/server";

function getDecimal(num) {
  if (Number.isInteger(num)) {
    return 0;
  }

  const decimalStr = num.toString().split('.')[1];
  return Number(decimalStr);
}

export async function GET(req: NextRequest, route: { params: { id: string } }) {
  try{
    const id = route.params.id
    // Nos conectamos al API de ML por medio de fetch utilizando async / await y le pasamos el id del producto
    const data1 = await fetch("https://api.mercadolibre.com/items/" + id)
    // Nos conectamos al API de ML por medio de fetch utilizando async / await y le pasamos el id del producto para obtener la descripción
    const data2 = await fetch("https://api.mercadolibre.com/items/" + id + "/description")
    const resultado: Object = await data1.json()
    const resultado2: Object = await data2.json()
    // Nos conectamos al API de ML por medio de fetch utilizando async / await y le pasamos el id de la categoria
    const data3 = await fetch("https://api.mercadolibre.com/categories/" + resultado.category_id)
    const resultado3: Object = await data3.json()
    // Construimos el objeto que regresaremos al front
    const objectoPropio: Object = {}
    objectoPropio.author = {
      name: "José Luis",
      lastname: "Valentín Rodríguez"
    }
    // Agregamos los datos a nuestro objeto propio
    objectoPropio.item = {
      id: resultado.id,
      title: resultado.title,
      price: {
        currency: resultado.currency_id,
        amount: Math.trunc(resultado.price),
        decimals: getDecimal(resultado.price)
      },
      picture: resultado.pictures[0].secure_url,
      condition: resultado.condition,
      free_shipping: resultado.shipping.free_shipping,
      sold_quantity: resultado.initial_quantity,
      description: resultado2.plain_text,
      category: resultado3.name
    }
    // Regresamos nuestro objeto al front
    return NextResponse.json({ resources: objectoPropio })
  } catch (e) {
    return NextResponse.json({ resources: {} })
  }
}