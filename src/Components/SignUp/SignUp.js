import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function handleForm(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('A senha e a confirmação precisam ser iguais');
        } else {
            const body = {
                name,
                email,
                password
            }

            const post = axios.post('http://localhost:5000/signup', body);

            post.then((answer) => {
                alert('Conta criada com sucesso');
                navigate('/');
            });

            post.catch((error) => {
                alert('Erro! Tente novamente');
                console.log(error);
            });


        }
    }

    return (
        <Page>
            <Logo>My Wallet</Logo>
            <Form onSubmit={handleForm}>
                <input type="text" id="name" placeholder="Nome" value={name} onChange={(e) => { setName(e.target.value) }} required></input><br />
                <input type="email" id="email" placeholder="E-mail" value={email} onChange={(e) => { setEmail(e.target.value) }} required></input><br />
                <input type="password" id="password" placeholder="Senha" value={password} onChange={(e) => { setPassword(e.target.value) }} required></input><br />
                <input type="password" id="confirmPassword" placeholder="Confirme a senha" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} required></input>
                <Button>Cadastrar</Button>
            </Form>
            <Error>{error}</Error>
            <StyledLink to={`/`} >Já tem uma conta? Entre agora!</StyledLink>
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