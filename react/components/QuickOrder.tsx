import React, { useState, useEffect } from "react";
import { useMutation, useLazyQuery } from "react-apollo";
import  UPDATE_CART from '../graphql/updateCart.graphql'
import GET_PRODUCT from '../graphql/getProductBySku.graphql'
import styles from './styles.css'

const QuickOrder = (/*{ blockClass }: { blockClass: string }*/) => {

  /*  const container__quickorder = generateBlockClass(styles.container, blockClass)
    const container__quickorderChildren = generateBlockClass(styles.container__quickorderChildren, blockClass)
    const title__quickorder = generateBlockClass(styles.title__quickorder, blockClass)
    const form__quickorder = generateBlockClass(styles.form__quickorder, blockClass)
    const container__quickorderForm = generateBlockClass(styles.container__quickorderForm, blockClass)
    const form__quickorderLabel = generateBlockClass(styles.form__quickorderLabel, blockClass)
    const form__quickorderInputText = generateBlockClass(styles.form__quickorderInputText, blockClass)
    const input__quickorderButton = generateBlockClass(styles.input__quickorderButton, blockClass)*/

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
        <div className={styles.container__quickorder}>
            <div className={styles.container__quickorderChildren}>
                <h2 className={styles.title__quickorder}> Compra rápida en tu Carulla</h2>
                <form onSubmit={searchProduct} className={styles.form__quickorder}>
                    <div className={styles.container__quickorderForm}>
                    <label className={styles.form__quickorderLabel} htmlFor="sku">Ingresa el Numero de SKU </label>

                    <input className={styles.form__quickorderInputText} id="sku" placeholder='N° SKU' type="text" onChange={handleChange}></input>
                    </div>
                    <input className={styles.form__quickorderButton} type="submit" value="Añadir al Carrito "/>
                </form>
            </div>
        </div>
    )
}

export default QuickOrder