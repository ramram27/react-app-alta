import { useState } from "react"
import Data from '../data/product.json'

function SearchBox() {
const [search,setSearch] = useState('');
const [filterUser,setFilterUser] = useState(Data)

    return (
        <div>
          <input type="text"
           value={search}
           onChange={(e)=> setSearch(e.target.value)}
          />

        </div>
    )
}
export default SearchBox