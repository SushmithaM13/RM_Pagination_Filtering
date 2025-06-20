import { useEffect, useState } from "react";
import axios from "axios";
import "./productList.css"

const Items_per_page=6;
const ProductList=()=>{
    const [products, setProducts]=useState([]);
    const [currentPage, setCurrentPage]=useState(1);

    useEffect(()=>{
        axios.get("https://dummyjson.com/products")
        .then((res)=>{
            setProducts(res.data.products);
        }).catch((err)=>{
            console.log(err);
        })
    },[]);

    const totalPages=Math.ceil(products.length/Items_per_page);
    const startIndex=(currentPage-1)*Items_per_page;
    const selectedProducts=products.slice(startIndex,startIndex+Items_per_page);

    if(!products){
        return <p>no products</p>
    }
    const goToPage=(pageNum)=>{
        setCurrentPage(pageNum);
    }
    const nextPage=()=>{
        if(currentPage<totalPages) setCurrentPage((prev)=>prev+1)
    }

    const prevPage=()=>{
        if(currentPage>1) setCurrentPage((prev)=>prev-1)
    }

    return(
        <div className="container">
            <h1 className="title">Product List</h1>
            <div className="product-grid">
                {selectedProducts.map((product)=>(
                    <div className="product-card" key={product.id}>
                        <h3>{product.title}</h3>
                        <p>category: {product.category}</p>
                        <p className="price">${product.price}</p>
                        <p>Ratings: {product.rating}</p>
                    </div>
                ))}
            </div>

            {/* pagination */}
            <div className="pagination">
                <button onClick={prevPage} disabled={currentPage===1}>Prev</button>
                {[...Array(totalPages)].map((_,i)=>(
                    <button key={i} className={currentPage===i+1 ? "active":""} onClick={()=>goToPage(i+1)}>
                        {i+1}
                    </button>
                ))}
                <button onClick={nextPage} disabled={currentPage===totalPages}>Next</button>
            </div>
        </div>
    )
    }
export default ProductList;