import data from '../data/product.json';

function Product() {

    return(
        <div>
           {
            data.map((val) =>{
                return(
                    <ul key={val.id}>
                        <li>{val.name}</li>
                        <li>{val.price}</li>
                    </ul>
                )
            })
           }
        </div>
    )
}
export default Product;