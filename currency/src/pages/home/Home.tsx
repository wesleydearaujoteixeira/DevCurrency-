import { Link } from 'react-router-dom';
import home from './home.module.css';
import { BsSearch } from 'react-icons/bs';


function Home() {
    return (
        <main className={home.container}>
            Página Home

            <form className={home.form}>
                <input type="text" 
                    placeholder='Digite uma moeda Ex... Bitcoin'
                />

                <button type='submit'>
                    <BsSearch size={30} color="#fff"/>
                </button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th scope='col'> Moeda</th>
                        <th scope='col'> Valor Mercado </th>
                        <th scope='col'> Preço  </th>
                        <th scope='col'> Volume </th>
                        <th scope='col'> Mudança 24h </th>
                    </tr>
                </thead>


                <tbody id='tbody'>
                    <tr className={home.tr}>


                        <td className={home.tdLabel} data-label="Moeda">
                            <div className={home.name}>
                                <Link to={"/detail/bitcoin"}> 
                                    <span> Bitcoin | BTC  </span>
                                </Link>
                            </div>
                        </td>



                        <td className={home.tdLabel} data-label="Valor Mercado">
                            <div className={home.name}>
                                <Link to={"/detail/bitcoin"}> 
                                    <span> 1T  </span>
                                </Link>
                            </div>
                        </td>

                        <td className={home.tdLabel} data-label="Preço">
                            8.000 
                        </td>


                        <td className={home.tdLabel} data-label="Volume">
                            2B 
                        </td>


                        <td className={home.tdProfit} data-label="Mudança 24h">
                            <span> 1.20 </span>
                        </td>
                    </tr>
                </tbody>


            </table>

        </main>
    );
}

export default Home;