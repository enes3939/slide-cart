import React from "react";
import './Sepet.css';

const Sepet =({product,basket,setBasket})=>{
    const removeFromBasket = (elementId) => {
        let backupBasket = [...basket];
        let index = backupBasket.findIndex(item => (item.id === elementId))
        backupBasket.splice(index, 1)
        setBasket(backupBasket)
    }

    return(
        <>
            <div className="Sepet">
                <img className="sepetİmage" src={product.url}/>
                {product.title}
                <button className="remove" onClick={()=>removeFromBasket(product.id)}>Sil </button>
            </div>
        </>
    );
}
export default Sepet;