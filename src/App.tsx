import { ProductCard } from "./assets/ProductCard"

function App() {
  const title: string = 'Phone';
  const price: number = 300;

  return (
    <>
      <ProductCard title={title} price={price}/>
    </>
  )
}

export default App
