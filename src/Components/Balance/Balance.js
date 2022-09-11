import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import UserContext from "../Contexts/UserContext";
import { Link } from "react-router-dom";
import signout from "../../Assets/SignOut.png";
import axios from "axios";

function BalancesIncomesJSX({ incomes }) {
    return (
        <Incomes>
            <h1>Entradas</h1>
            {incomes.map((income) => <IncomesList><Date>{income.date}</Date> <DescriptionAmount><h1>{income.description}</h1> <h2>{income.amount}</h2></DescriptionAmount></IncomesList>)}
        </Incomes>
    );
}

function BalancesOutcomesJSX({ outcomes }) {
    return (
        <Outcomes>
            <h1>Saídas</h1>
            {outcomes.map((outcome) => <IncomesList><Date>{outcome.date}</Date> <DescriptionAmount><h1>{outcome.description}</h1> <h3>{outcome.amount}</h3></DescriptionAmount></IncomesList>)}
        </Outcomes>
    );
}

export default function Balance() {
    const [request, setRequest] = useState([]);
    const [name, setName] = useState('Fulano');
    const [totalBalance, setTotalBalance] = useState(0);
    const context = useContext(UserContext);

    const config = {
        headers: {
            Authorization: `Bearer ${context.userInfo}`
        }
    };

    useEffect(() => {
        const promise = axios.get('http://localhost:5000/balance', config);
        promise.then((answer) => {
            setRequest(answer.data);
            setName(answer.data.name);
        });
        promise.catch((error) => {
            console.log(error);
        });
    }, []);

    let totalIncomes = 0;
    let totalOutcomes = 0;

    if (request.incomes) {
        for (let i = 0; i < request.incomes.length; i++) {
            let aux = Number(request.incomes[i].amount);
            totalIncomes = totalIncomes + aux;
        }
    }

    if (request.outcomes) {
        for (let i = 0; i < request.outcomes.length; i++) {
            let aux = Number(request.outcomes[i].amount);
            totalOutcomes = totalOutcomes + aux;
        }
    }



    useEffect(() => {
        setTotalBalance(totalIncomes - totalOutcomes);
    }, [request]);

    return (
        <Page>
            <Header>
                Olá, {name}
                <Link to={'/'}><img src={signout} alt="SignOut" /></Link>
            </Header>

            <Balances>
                {request.incomes ? <BalancesIncomesJSX incomes={request.incomes} /> : <NoEntries>Não existem entradas</NoEntries>}
                {request.outcomes ? <BalancesOutcomesJSX outcomes={request.outcomes} /> : <NoEntries>Não existem saídas</NoEntries>}
            </Balances>

            <TotalBalance>
                <h1>Saldo:</h1>
                {totalBalance >= 0 ? <h2>{totalBalance}</h2> : <h3>{totalBalance}</h3>}
            </TotalBalance>

            <Records>
                <Link to={'/Income'}><Income><ion-icon name="add-circle-outline"></ion-icon><p>Nova<br /> Entrada</p></Income></Link>
                <Link to={'/Outcome'}><Outcome><ion-icon name="remove-circle-outline"></ion-icon><p>Nova<br /> Saída</p></Outcome></Link>
            </Records>
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

const Header = styled.span`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 12px;

    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #FFFFFF;
`;

const Balances = styled.div`
    width: 326px;
    height: 446px;
    background: #FFFFFF;
    border-radius: 5px;
    overflow-y: scroll;

    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #868686;
`;

const TotalBalance = styled.div`
    display: flex;
    justify-content: space-between;
    width: 326px;
    height: 30px;
    background: #FFFFFF;
    border-radius: 0px;
    padding: 5px 5px 0px 5px;
    margin-top: -5px;

    h1 {
        font-family: 'Raleway', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        color: #000000;
    }

    p {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        text-align: right;
    }

    h2 {
        color: #03AC00;
    }

    h3 {
        color: #C70000;
    }
`;

const NoEntries = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Incomes = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding: 5px;

    h1 {
        font-family: 'Raleway', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        color: #03AC00;
        margin-bottom: 4px;
    }
`;

const Outcomes = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding: 5px;

    h1 {
        font-family: 'Raleway', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        color: #C70000;
        margin-top: 8px;
    }
`;

const Records = styled.div`
    display: flex;
    margin-top: 15px;

    ion-icon {
        margin: 5px 0px 35px 5px;
        font-size: 24px;
        color: #FFFFFF;
    }

    p {
        font-family: 'Raleway', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        color: #FFFFFF;
        margin-left: 5px;
    }
`;

const Income = styled.div`
    width: 155px;
    height: 114px;
    background: #A328D6;
    border-radius: 5px;
    margin-right: 15px;
`;

const Outcome = styled.div`
    width: 155px;
    height: 114px;
    background: #A328D6;
    border-radius: 5px;
`;

const IncomesList = styled.span`
    display: flex;
    width: 100%;
`;

const Date = styled.span`
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #C6C6C6;
`;

const DescriptionAmount = styled.span`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding-left: 6px;

    h1 {
        font-family: 'Raleway', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #000000;
    }

    h2 {
        font-family: 'Raleway', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        text-align: right;
        color: #03AC00;
    }

    h3 {
        font-family: 'Raleway', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        text-align: right;
        color: #C70000;
    }
`;