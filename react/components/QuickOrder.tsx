import React, { useState, useEffect } from "react";
import { useMutation, useLazyQuery } from "react-apollo";
import  UPDATE_CART from '../graphql/updateCart.graphql'
import GET_PRODUCT from '../graphql/getProductBySku.graphql'

const QuickOrder = () => {
    const [inputText, setInputTex] = useState('')
    const [search, setSearch] = useState('')

    const [getProductData, { data: product }] = useLazyQuery(GET_PRODUCT)

    const [addToCart] = useMutation (UPDATE_CART)

    const handleChange = (evt:any) => { 
        setInputTex(evt.target.value)
    console.log('Input changed', inputText )
    }

    useEffect(() => {
        console.log('el resultado es ', product, search)
        if(product){
            //const{ productId}= product.product
        let skuId = parseInt(inputText)
        addToCart ({
            variables:{
                salesChannel:"1",
                items:[
                    {
                    id: skuId,
                    quantity: 1,
                    seller: "1"
            }]
            }
        })
        .then(() => {
            window.location.href= '/checkout'
        })
        }
    }, [product, search])

    const addProductToCart = () => {
        getProductData({
            variables:{
                sku: inputText
            }
        })
    }

    const searchProduct = (evt:any) => {
        evt.preventDefault();
        if(!inputText){
            alert('dal dale')
        }else{
            console.log('Su busqueda es:', inputText)
            setSearch(inputText)
            addProductToCart ()
            //setSearch
        }

    }

    return(
        <div className="flex">
            <div className="outline w-1280 pa3 m2">
                <h2> Compra rápida en tu Carulla</h2>
                <form onSubmit={searchProduct}>
                    <div>
                    <label htmlFor="sku">Ingresa el Numero de SKU </label>

                    <input id="sku" type="text" onChange={handleChange}></input>
                    </div>
                    <input type="submit" value="Añadir al Carrito "/>
                </form>
            </div>
        </div>
    )
}

export default QuickOrder