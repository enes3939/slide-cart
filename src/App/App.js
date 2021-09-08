import React from "react";
import './App.css';
import {services} from "../utils/utils";
import Box from "../Components/Box/Box";
import Sepet from "../Components/Sepet/Sepet";

const App = () => {

    const [list, setList] = React.useState([])

    const [basket,setBasket] = React.useState([])

    const [display,setDisplay] = React.useState([])

    React.useEffect(() => {
        fetch(`${services.apiUrl}/photos`).then(res => res.json()).then(result => {
            setList(result.slice(0,50))
        });
    }, []);

    React.useEffect(()=>{
        let backupList=[...list];
        setDisplay(backupList.slice(0,5))
    },[list])
    React.useEffect(()=>{hiddenLeft()},[])
    React.useEffect(()=>{productNumber()},[basket])
    const productNumber = () =>{
        let number=basket.length;
        return number;
    }
    const hiddenLeft= () =>{
        document.getElementById("left button").style.visibility="hidden"
    }
    const hiddenRight= () =>{
        document.getElementById("right button").style.visibility = "hidden"
    }
    const visibleLeft = ()=>{
        document.getElementById("left button").style.visibility="visible"
    }
    const visibleRight = ()=>{
        document.getElementById("right button").style.visibility="visible"
    }
    const nextSlide = (index) =>{

        let backupSlide = [...list]
        let indexSlide = display.length;
        let number = display[indexSlide - 1];

        if (index>0) {
            if (display[indexSlide - 1].id< list[list.length-1].id) {
                setDisplay(backupSlide.slice(number.id, number.id + index))
                visibleLeft()
                if (display[indexSlide - 1].id >=list[list.length-6].id) {
                    hiddenRight()
                }
            }
            else if (display[indexSlide - 1].id >=list[list.length-1].id) {
                hiddenRight()
            }
        }
        else if (index<0){
            if (display[0].id>list[0].id){
                setDisplay(backupSlide.slice(number.id + index*2,number.id+index))
                visibleRight()
                if (display[0].id<=list[5].id){
                    hiddenLeft()
                }
            }
            else{
                hiddenLeft()
            }
        }
    }
    return (
        <>
            <div className="Body">
                <div className="MainContainer">
                    <button onClick={()=>nextSlide(-5)} className="Left" id="left button"  >ᐸ</button>
                    {
                        list.length ? (display.map(item => {
                            return <Box  basket ={basket} setBasket={setBasket} item={item}/>
                        })) : <> Ürün Yok </>
                    }
                    <button onClick={()=>nextSlide(5)} className="Right" id='right button' >ᐳ</button>
                </div>
                <div className="Sepet">

                    <div className="sepetTag" >Sepetim {productNumber()} Ürün</div>
                    {
                        basket.length ?(basket.map(item=>{
                            return <Sepet product={item} basket={basket} setBasket={setBasket} />
                        })): <> Ürün Yok</>
                    }
                </div>
            </div>
        </>
    );
}

export default App;
