export const SearchBar=
({searchText,setSearchText})=>{
    return 
    <input placeholder="Search Text....." value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
}