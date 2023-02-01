import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addToCart } from '../redux/basketSlice';

const Product = ({data}) => {
    const dispatch = useDispatch();
    
    const handleClick = (id) => {
        dispatch(addToCart(id));
    }

    console.log(data);

    return (
        <Container>
            <Title>
                {data.name}
            </Title>
            <Price>
                ${data.price}
            </Price>
            <Image style={{height: "100px", width: "100px"}} src={data.thumbnail}/>
            <ActionSection>
                <AddToCartButton
                    onClick={() => handleClick(data.productId)}
                >
                    Add to Cart
                </AddToCartButton>
            </ActionSection>
        </Container>
  )
}

export default Product

const Container = styled.div`
    width: 250px;
    background-color: white;
    z-index: 100;
    flex: 1;
    padding: 20px;
    margin: 10px;
    max-height: calc(100vh - 105px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    
`
const Title = styled.span`
    font-size: 15px;
`;

const Price = styled.span`
    font-weight: 500;
    margin-top: 3px;
`;

const Rating = styled.div`
    display: flex;
`;

const Image = styled.img`
    max-height: 200px;
    object-fit: contain;
`;

const ActionSection = styled.div`
    margin-top: 12px;
    display: grid;
    place-items: center;
`;

const AddToCartButton = styled.button`
    width: 100px;
    height: 30px;
    background-color: #f0c14b;
    border: 2px solid #a88734;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
`;