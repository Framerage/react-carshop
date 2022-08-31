export const useCart=(obj)=>{
    return obj.reduce((sum,el)=>el.price+sum,0)
}