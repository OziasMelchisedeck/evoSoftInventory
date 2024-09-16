import './inventaire.css'
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SortIcon from '@mui/icons-material/Sort';
import AddIcon from '@mui/icons-material/Add';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import produits from '../../data/produits';

interface Inventaire{
    date:string;
    produitId:string;
    stock:Record<string, number>;
}

interface Produit{
    id:string;
    nom:string;
    prix:number;
}
const produitsList :Produit[] = produits;

function InventairePage(){
    
    //recupérer les inventaires
    const [inventaireList, setInventaireList] = useState<Inventaire[]>([]);
    useEffect(() => {
        const storedInventaires = localStorage.getItem("inventaires");
        if (storedInventaires) {
            const parsedInventaires: Inventaire[] = JSON.parse(storedInventaires);
            setInventaireList(parsedInventaires);
        }
    }, []);
    console.log(inventaireList);
    return(
        <div className='contain d-flex'>
            <div className='side col-3 d-flex flex-column'>
                <div className='header d-flex justify-content-center rounded-1 flex-wrap bg-primary mx-2 my-1 p-2'>
                    <span className='h6 mx-1 text-light'>Inventaires</span>
                    <Inventory2Icon style={{ cursor:'pointer', fontSize: '1.3rem', fill: 'white' }}/>
                </div>
               <div className='d-flex justify-content-between flex-wrap mt-1'>
                    <span className='total text-primary mx-2 h6'>Total: {inventaireList.length}</span>
                    <button className='btn btn-outline-primary tri d-flex mx-2'>
                        <span>Trier</span>
                        <SortIcon className='sort' style={{ cursor:'pointer', fontSize: '1.3rem'}}/>
                    </button>
               </div>
               <div className='d-flex flex-column m-2'>
                    {inventaireList.map((inventaire)=>(
                        <div key={inventaire.date+inventaire.produitId+inventaireList.indexOf} className='item d-flex flex-wrap justify-content-between my-1 p-2'>
                            <div>
                                <DateRangeIcon style={{ cursor:'pointer', fontSize: '1.3rem', fill: 'var(--principal-color)' }}/>
                                <span className='text-primary mx-1'>{inventaire.date}</span>
                            </div>
                            <div>
                                <LocalGroceryStoreIcon style={{fontSize: '1.3rem', fill: 'var(--principal-color)' }}/>
                                <span className='text-primary'>
                                    {produitsList.filter((produit) => produit.id === inventaire.produitId)[0].nom}
                                </span>
                            </div>
                        </div>
                    ))}
               </div>
               <Link to='/inventaire/add' className='btn btn-outline-primary plus d-flex justify-content-center'>
                    <AddIcon className='sort' style={{ cursor:'pointer', fontSize: '1.5rem'}}/>
               </Link>
            </div>
            <div className='right col-9'>right</div>
        </div>
    );
}
export default InventairePage;