import axios from 'axios'
import logo from './assets/img/logo.svg';
import {Container, Row, Col, Form} from 'react-bootstrap';
import Product from "./components/Product";
import {useEffect, useState} from "react";
import CategoryCheck from "./components/Category-check";

function App() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectCategories, setSelectCategories] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchFilteredResults, setSearchFilteredResults] = useState([]);
    useEffect(() => {
        getALLProducts()
    }, [])
    useEffect(() => {
        if (products.length > 0) {
            setSelectedProducts(showSelectedCategoryProducts())
            setCategories(filterCategoriesCheck())
            setSelectCategories(filterCategoriesCheck())
        }
    }, [products])

    useEffect(() => {
        selectCategories.length > 0 ? setSelectedProducts(showSelectedCategoryProducts()) : setSelectedProducts([])
    }, [selectCategories])

    const getALLProducts = () => {
        axios.get("https://fakestoreapi.com/products").then((response) => {
            const allProducts = response.data;

            setProducts(allProducts);
        })
            .catch(error => console.error(`Error: ${error}`));
    }

    const showSelectedCategoryProducts = () => {
        const allSelectedProduct = []
        products.map(prod => {
            selectCategories.includes(prod.category) &&
            allSelectedProduct.push(prod)
        })
        return selectCategories.length === 0 ? [] : allSelectedProduct

    }

    const filterCategoriesCheck = () => {
        const category = []
        products.map(prod => {
            !category.includes(prod.category) &&
            category.push(prod.category)
        })
        return category
    }


    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchInput(value)
        if (searchInput !== '') {
            const searchFilteredData = selectedProducts.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setSearchFilteredResults(searchFilteredData)
        } else {
            setSearchFilteredResults(selectedProducts)
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <Container fluid>
                    <a href="#">
                        <img width="225" height="80" src={logo} className="App-logo" alt="logo"/>
                    </a>
                </Container>
            </header>
            <main className="wrapper">
                <Container fluid>
                    <h1 className="page-heading mb-4">List of Products</h1>
                    <Form>
                        <Form.Group className="mb-3" controlId="search_product">
                            <Form.Control type="search" onChange={handleSearchChange} placeholder="Search product..."/>
                        </Form.Group>
                    </Form>
                    <div className="mb-4">
                        {categories.length > 0 && categories?.map((cate, index) =>
                            (
                                <CategoryCheck key={index} category={cate} categoryId={index} setSelectCategories={setSelectCategories} selectCategories={selectCategories}/>
                            )
                        )}
                    </div>
                    <p className="text-primary">Showing <strong>{searchInput.length > 1 ? searchFilteredResults.length : selectedProducts.length}</strong> results.
                        in
                        categories <strong style={{marginRight: '4px'}}>{selectCategories.join(", ")}</strong>{searchInput.length > 1 ? (
                            <span>containing <strong>"{searchInput}"</strong></span>) : ''}
                    </p>
                    <Row className="">
                        {searchInput.length > 1 ? (
                            searchFilteredResults?.map((prod, index) =>
                                (<Col className="mb-4" key={index} lg="6" xl="4">
                                    <Product product={prod}/>
                                </Col>)
                            )
                        ) : (
                            selectedProducts.length > 0 && selectedProducts?.map((prod, index) =>
                                (<Col className="mb-4" key={index} lg="6" xl="4">
                                    <Product product={prod}/>
                                </Col>)
                            )
                        )
                        }
                    </Row>
                </Container>
            </main>
        </div>
    );
}

export default App;
