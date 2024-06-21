import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import style from './details.module.css';


import {CoinProps} from '../home/Home';


interface ResponseProps {
    data: CoinProps;
}

interface ErrorProps {
    error: 'string';
}

type DataProps = ResponseProps | ErrorProps; 






function Detail() {



    const {cripto} = useParams();
    const navigate = useNavigate();
    const [coin, setCoin] = useState<CoinProps>();


    useEffect(() => {
        async function getData () {
            try{
                fetch(`https://api.coincap.io/v2/assets/${cripto}`)
                .then(response => response.json())
                .then((data: DataProps) => {

                    if("error" in data){
                        navigate('/');
                        return;
                    }

                    console.log(data.data);


                    const price = Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD"
                      
                    });
        
        
                    const priceCompact = Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        notation: "compact"
                      
                    });

                    const resultData = {
                        ...data.data, 

                        price: price.format(parseFloat(data.data.priceUsd)),
                        format1tri: priceCompact.format(Number(data.data.marketCapUsd)),
                        formatVolum: priceCompact.format(Number(data.data.volumeUsd24Hr))

                    }

                    setCoin(resultData);

                });
                
            }catch(err){
                console.log(cripto);
                navigate('/');
            }
        }

        getData();

    }, [cripto]);


    return (
        
        
        <div className={style.content}> 

            <h1 className={style.center}> {coin?.name} </h1>
            <h1 className={style.center}> {coin?.price} </h1>

            <section className={style.content}>
                <img src={`https://assets.coincap.io/assets/icons/${coin?.symbol.toLowerCase()}@2x.png`} 
                    alt="LOGO DA IMAGEM" 
                    className={style.Logo}
                />

                <h1> {coin?.name} | {coin?.symbol} </h1>
                <p> <strong>Preço: </strong> {coin?.price} </p>

                <a href="#">
                    <strong> Mercado: </strong> {coin?.format1tri}
                </a>

                <a href="#">
                    <strong> Volume: </strong> {coin?.formatVolum}
                </a>


                <a href="#">

                    <strong> Mudança 24h </strong> 
                    <span className={Number(coin?.changePercent24Hr) > 0 ? style.profit : style.loss}> 
                        {Number(coin?.changePercent24Hr).toFixed(5)} 
                    </span>
                </a>

            </section>




        </div>
     );
}

export default Detail;