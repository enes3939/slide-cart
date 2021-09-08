import React from "react";
import './Box.css'
const Box = ({item,basket,setBasket}) => {
    const addBasket = (result) => {
        let backup = [...basket];
        if (backup.filter((element)=>(
        element.id===result.id
        )).length<=0){
            backup.push(result);
        }
        else{
            alert("Bir üründen en fazla 1 adet ekleyebilirsiniz !")
        }
        setBasket(backup);
    }
    return (
        <>
            <div className="Box">
                <img src={item.url}/>
                <button className="addBasket" onClick={() => addBasket(item)}>Sepete Ekle</button>
                <div className="Title">
                    {item.title}
                </div>
            </div>

        </>
    );
}
export default Box;