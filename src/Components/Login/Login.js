import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import UserContext from "../Contexts/UserContext";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const context = useContext(UserContext);
    const navigate = useNavigate();

    function handleForm(e) {
        e.preventDefault();
        const body = {
            email,
            password
        };

        const post = axios.post('http://localhost:5000/login', body);

        post.then((answer) => {
            context.setUserInfo(answer.data);
            console.log(answer.data);
            navigate('/Balance');
        });

        post.catch((error) => {
            console.log(error);
            alert('E-mail ou senha não encontrado(s)');
        });
    }

    return (
        <Page>
            <Logo>My Wallet</Logo>
            <Form onSubmit={handleForm}>
                <input type="email" id="email" placeholder="E-mail" value={email} onChange={(e) => { setEmail(e.target.value) }} required></input><br />
                <input type="password" id="password" placeholder="Senha" value={password} onChange={(e) => { setPassword(e.target.value) }} required></input>
                <Button>Entrar</Button>
            </Form>
            <Error>{error}</Error>
            <StyledLink to={`/SignUp`} >Primeira vez? Cadastre-se!</StyledLink>
        </Page>
    );
}

const Page = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    background-color: #8C11BE;

`;

const Logo = styled.div`
    height: 50px;
    font-family: 'Saira Stencil One', cursive;
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 50px;
    color: #FFFFFF;
`;

const Form = styled.form`
    border: none;

    input {
        width: 326px;
        height: 58px;
        background: #FFFFFF;
        border-radius: 5px;
        border: none;
        
        font-family: 'Raleway', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        color: #000000;
        margin-bottom: 15px;
        padding-left: 15px;
    }
`;

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 326px;
    height: 46px;
    background: #A328D6;
    border-radius: 5px;
    border: none;

    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: #FFFFFF;
    margin-bottom: 24px;
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

const Error = styled.span`
    text-decoration: none;
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: red;
    margin-bottom: 15px;
`;