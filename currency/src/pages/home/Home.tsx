import { Link, useNavigate } from 'react-router-dom';
import home from './home.module.css';
import { BsSearch } from 'react-icons/bs';
import { useState, FormEvent, useEffect } from 'react';


interface CoinProps {
    id: string;
    name: string;
    symbol: string;
    priceUsd: string;
    changePercent24Hr: string;
    volumeUsd24Hr: string;
    marketCapUsd: string;
    explorer: string;
    rank: string;
    vwap24Hr: string;
    supply: string;
    maxSupply: string;
    price?: string;
    format1tri?: string;
    formatVolum?: string;

}

interface DataProp {
    data: CoinProps[];
}



function Home() {

    const [input, setInput] = useState<string>("");
    const [data, setData] = useState<CoinProps[]>([]);
    const [loadCoins, setLoadCoins] = useState(10);

 

    const getData = async () => {
        fetch(`https://api.coincap.io/v2/assets?limit=${loadCoins}&offset=0`)
        .then(response => response.json())
        .then((dados: DataProp) => {

            const coinsData = dados.data

            const price = Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              
            });


            const priceCompact = Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                notation: "compact"
              
            })

            const FormatNumbers = coinsData.map((item) => {
            
                const formataAi = {

                    ...item, 
                    price: price.format(parseFloat(item.priceUsd)),
                    format1tri: priceCompact.format(Number(item.marketCapUsd)),
                    formatVolum: priceCompact.format(Number(item.volumeUsd24Hr))
                }

                return formataAi;
            
            });


            setData(FormatNumbers);


        });
    }


    useEffect(() => {
        getData();
    }, []);

    const navigate = useNavigate();


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();


        if(input === "") return;

        navigate(`/detail/${input}`)

    }

    const LoadMore = () => {
        location.reload();
        setLoadCoins(loadCoins + 10);
        
    }


    return (
        <main className={home.container}>
            Página Home

            <form className={home.form} onSubmit={handleSubmit}>
                <input type="text" 
                    placeholder='Digite uma moeda Ex... Bitcoin'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <button type='submit'>
                    <BsSearch size={30} color="#fff"/>
                </button>
            </form>

           
            <table>
                    <thead>
                    <tr>
                        <th scope='col'> Moeda </th>
                        <th scope='col'> Valor Mercado </th>
                        <th scope='col'> Preço  </th>
                        <th scope='col'> Volume </th>
                        <th scope='col'> Mudança 24h </th>
                    </tr>
                </thead>
                <tbody id='tbody'>

              {data && data.map((data) => {

                return (

                    <tr key={data.id} className={home.tr}>


                        <td className={home.tdLabel} data-label="Moeda">
                            <div className={home.name}>

                                <img className={home.Logo}  src={`https://assets.coincap.io/assets/icons/${data.symbol.toLowerCase()}@2x.png`} alt="" />

                                <Link to={`/detail/${data.id}`}> 
                                    <span> {data.name}  </span> | {data.symbol}
                                </Link>

                            </div>
                        </td>



                        <td className={home.tdLabel} data-label="Valor Mercado">
                            {data.format1tri}
                        </td>

                        <td className={home.tdLabel} data-label="Preço">
                            {data.price} 
                        </td>


                        <td className={home.tdLabel} data-label="Volume">
                            {data.formatVolum} 
                        </td>


                        <td className={Number(data.changePercent24Hr) > 0 ? home.tdProfit : home.tdLoss} data-label="Mudança 24h">
                            <span> {Number(data.changePercent24Hr).toFixed(5)} </span>
                        </td>
                    </tr>
                )
              })}

            </tbody>
            </table>
           

            <button className={home.ButtonMore} onClick={ () => LoadMore()}>
                Carregar Mais
            </button>

        </main>
    );
}

export default Home;