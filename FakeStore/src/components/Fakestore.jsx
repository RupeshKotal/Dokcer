import { useEffect, useState } from "react"
import axios from 'axios'
import { useReducer } from "react"

let intialSate = {CartCount : 0}

function reducer(state,action){
    switch (action.type){
      case "add": return {CartCount : state.CartCount + 1}
      case "remove" : return {CartCount : state.CartCount - 1}
    }
}


export function Fakestore(){


    const [category,setCategory] = useState([]);
   const [product,setProduct] = useState([{id:0,title:'',description:'',image:'',category:"",rating:{rate:0,count:0},price:0}])
   const [cartItems,setCartItems]=useState([])
   const [count,setCount]=useState(0)


    function Loadcategory(){
         axios.get("https://fakestoreapi.com/products/categories").then(response=>{
            response.data.unshift("All")
            setCategory(response.data)
         })
    }

    function loadProduct(url){
          axios.get(url).then(response=>{
            setProduct(response.data)
          })
    }

    function hnadleCategoryChnage(e){
          if(e.target.value=="All"){
            loadProduct("https://fakestoreapi.com/products")
          }else{
            loadProduct(`https://fakestoreapi.com/products/category/${e.target.value}`)
          }
    }

    let [state,dispatch] = useReducer(reducer,intialSate)

    function addToCart(product){
  
        dispatch({type:"add"})

        setCartItems(currenItem => [...currenItem,product])
        // getCartCount()

    }

    function removeCart(productId){
        dispatch({type:"remove"})
        
        setCartItems(currenItem => currenItem.filter(product => product.id != productId))

        
    }



    useEffect(()=>{
          console.log(cartItems);
    },[cartItems])


    // function getCartCount(){
    //      setCount(cartItems.length)
    // }

    useEffect(()=>{
        Loadcategory()
        loadProduct("https://fakestoreapi.com/products")
    },[])

    return(
        <>
        <div className="container-fluid">
            <header className="d-flex justify-content-between mt-3 py-4 bg-black text-white align-items-center px-3">
                <h2>Flip store</h2>
                <div className="d-flex gap-3">
                    <span>Home</span>
                    <span>Electonics</span>
                    <span>Men'S Fasion</span>
                    <span>Womens Fashion</span>
                    <span>Jwellery</span>
                </div>
                <div className="d-flex gap-3">
                    <span className="bi bi-heart-fill text-danger ext-warning bg-white py-2 px-3 rounded-2"></span>
                    <span className="bi bi-person-fill text-success ext-warning bg-white py-2 px-3 rounded-2"></span>
                    <span className="bi bi-cart-check-fill text-warning bg-white py-2 px-3 rounded-2 position-relative"><span className="badge rounded position-absolute bg-danger mt-0 top-0">{state.CartCount}</span></span>
                </div>
            </header>

            <section className="mt-3 row">
                <nav className="col-2">
                    <div>
                    <label className="form-label fw-bold">Select Category</label>
                    <div>
                        <select className="form-select" onChange={hnadleCategoryChnage}>
                            {category.map(cat=><option key={cat} value={cat}>{cat.toUpperCase()}</option>)}
                        </select>
                    </div>
                    </div>
                  
                </nav>

                <main className="col-10 d-flex flex-wrap overflow-auto mt-4" style={{height:"500px "}}>
                     {
                        product.map(product=>
                            <div key={product.id} className="card m-2 p-2" style={{width:'200px'}}>
                               <img src={product.image} alt="img" className="card-img-top" height={120}/>

                                <div className="card-header fw-bold py-1" style={{height:"100px"}}>{product.title}</div>

                                <div className="card-body">
                                    <dl>
                                        <dt>Price</dt>
                                        <dd>{product.price}</dd>
                                        <dt>Rating</dt>
                                        <dd>{product.rating.rate} <span className="bi bi-star-fill"></span></dd>
                                        <dt>Count</dt>
                                        <dd>{product.rating.count}</dd>
                                    </dl>
                                </div>

                                <div className="card-footer">
                                    <button className="bi bi-cart-check-fill bg-success text-white d-flex gap-1 my-1 align-items-center rounded-2" onClick={()=>{addToCart(product)}}>Add To Cart</button>
                                    <button className="bi bi-cart-check-fill bg-danger text-white d-flex gap-1 align-items-center rounded-2" onClick={()=>{removeCart(product.id)}}>Remove item</button>

                                </div>
                                  

                            </div>
                            )
                     }
                </main>
            </section>
        </div>
        
        </>
    )
}