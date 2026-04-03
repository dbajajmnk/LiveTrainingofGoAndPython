// export const Image=({src,className,width,height,alt})=>{


// return <img src={src} className={className} width={width} height={height} alt={alt} />
// }

export const Image=({...options})=>{
return <img {...options} />
}