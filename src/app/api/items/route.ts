import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const q = req.nextUrl.searchParams.get('q') as string
    try{
        const data = await fetch("https://api.mercadolibre.com/sites/MLA/search?q=" + q)
        const resultado = await data.json()
        return NextResponse.json({ data: resultado })
    } catch (e) {
        return NextResponse.json({ data: {} })
    }
}