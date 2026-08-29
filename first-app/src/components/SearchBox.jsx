import { useState } from "react"
import Data from '../data/product.json'

function SearchBox() {
const [search,setSearch] = useState('');

const filterData = search.trim()
  ? Data.filter((val) =>
  val.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
): []

    return (
        <div>
          <input type="text"
           value={search}
           onChange={(e)=> setSearch(e.target.value)}
          />

          {
            filterData.length > 0 && (
                <div>
                    {
                        filterData.map((val)=>(
                            <div key={val.id}>
                               <h3>{val.name}</h3>
                            </div>
                        ))
                    }
                </div>
            )
          }
        </div>
    )
}
export default SearchBox
