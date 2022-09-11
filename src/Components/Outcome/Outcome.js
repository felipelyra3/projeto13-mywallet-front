import styled from "styled-components";
import { useState, useContext } from "react";
import UserContext from "../Contexts/UserContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Income() {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const context = useContext(UserContext);
    const navigate = useNavigate();

    function handleForm(e) {
        e.preventDefault();

        const config = {
            headers: {
                Authorization: `Bearer ${context.userInfo}`
            }
        };

        const body = {
            amount,
            description
        };

        const put = axios.put('http://localhost:5000/outcome', body, config);

        put.then(() => {
            alert('Entrada cadastada com sucesso');
            navigate('/Balance');
        });

        put.catch((error) => {
            alert('Erro');
            console.log(error);
        });
    }

    return (
        <Page>
            <Title>Nova Saída</Title>
            <Form onSubmit={handleForm}>
                <input type="text" id="amount" placeholder="Valor" value={amount} onChange={(e) => { setAmount(e.target.value) }} required></input><br />
                <input type="text" id="description" placeholder="Descrição" value={description} onChange={(e) => { setDescription(e.target.value) }} required></input><br />
                <Button>Salvar saída</Button>
            </Form>
            <StyledLink to={`/balance`} >Voltar</StyledLink>
        </Page>
    );
}

const Page = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    background-color: #8C11BE;

`;

const Title = styled.span`
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #FFFFFF;
    margin: 24px 210px 24px 24px;
`;

const Form = styled.form`
    border: none;

    input {
        width: 326px;
        height: 58px;
        background: #FFFFFF;
        border-radius: 5px;
        margin-bottom: 12px;
        padding-left: 12px;

        font-family: 'Raleway', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        color: #000000;
    }
`;

const Button = styled.button`
    width: 326px;
    height: 46px;
    background: #A328D6;
    border-radius: 5px;
    border: none;
    margin-bottom: 24px;

    font-family: 'Raleway', sans-serif; 
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: #FFFFFF;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #FFFFFF;
`;