type Props = {
    title: string,
    price: number
}
export const ProductCard = ({title, price}: Props) => {

    return (
        <>
        <p>{title}</p>
        <p>{price}</p>
        </>
    )
}