import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDatasAsync } from '../redux/services';
import Product from './Product';
import Loading from './Loading';
import Error from './Error';
import usePagination from '../hooks/usePagination';
import Pagination from './Pagination';

const pageSize = 10;

const Main = () => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.basket.items);
    const isLoading = useSelector(state => state.basket.isLoading);
    const error = useSelector(state => state.basket.error);
    
    const currentPaginationData = usePagination(items, pageSize);

    console.log(currentPaginationData);

    React.useEffect(() => {
        if(items.length === 0) {
            dispatch(getDatasAsync());
        }
    }, [dispatch]);

    if(error) {
        return (
            <Error />
        )
    }

    if(isLoading) {
        return (
            <Loading />
        );
    }
    console.log(currentPaginationData.currentData());
    return (
        <Container>
            <div style={{background: "antiquewhite", height: "40px", display: "flex", justifyContent: "space-between"}}>
                <Link style={{fontSize: "20px", color: "red", textDecoration: "none", margin: "5px", padding: "5px"}} to='/cart'>
                    Cart
                </Link> 
                <Pagination currentPaginationData={currentPaginationData}/>
            </div>
            <Banner>
            </Banner>   
            <Content>
                {currentPaginationData.currentData().map((data)=>
                    (
                        <Product key={data.productId}
                            data={data}
                        />
                    ))
                }
            </Content>
            
        </Container>
    )
}

export default Main

const Container = styled.div`
    max-width: 1500px;
    margin: 0 auto;
    
`;

const Banner = styled.div`
    background-image: url('https://i.imgur.com/SYHeuYM.jpg');
    min-height: 600px;
    background-position: center;
    background-size: cover;
    z-index: 1;
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
`;

const Content = styled.div`
    padding-left: 10px;
    padding-right: 10px;
    margin-top: -350px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    max-height: calc(100vh - 75px);
`;