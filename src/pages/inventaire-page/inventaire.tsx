import './inventaire.css'
import React from 'react';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SortIcon from '@mui/icons-material/Sort';
import AddIcon from '@mui/icons-material/Add';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import produits from '../../data/produits';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import magasins from '../../data/magasin';


interface Inventaire{
    date:string;
    produitId:string;
    stock:Record<string, number>;
}

interface Magasin{
  id:string;
  nom:string;
  adresse:string;
}

interface Produit{
    id:string;
    nom:string;
    prix:number;
}

const produitsList :Produit[] = produits;
const magasinsList :Magasin[] = magasins;
const cols = [
    {field:'magasin',name:'magasin'},
    {field:'quantite', name:'quantite'}
]

function InventairePage(){    
    //recupérer les inventaires
    const [inventaireList, setInventaireList] = useState<Inventaire[]>([]);
    const [currentInventaire, setCurrentInventaire] = useState<Inventaire>()

    useEffect(() => {
        const storedInventaires = localStorage.getItem("inventaires");
        if (storedInventaires) {
            const parsedInventaires: Inventaire[] = JSON.parse(storedInventaires);
            setInventaireList(parsedInventaires);
        }
    }, []);

    //console.log(inventaireList[0]);
    //recuper les elements du stock et les mettre dans un tableau
    const currentStock  = currentInventaire?.stock 
    ? Object.entries(currentInventaire.stock).map(([magasinId, quantite]) => {
        const magasin = magasinsList.find(m => m.id === magasinId);
        return {
            magasin: magasin ? magasin.nom : 'Inconnu',
            quantite,
        };
    })
    : [];

console.log(currentStock);
    return(
        <div className='contain d-flex'>
            <div className='side col-3 d-flex flex-column'>
                <div className='d-flex entete flex-column mx-2 p-2'>
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
                </div>
               <div className='d-flex flex-column task pb-2'>
                    {inventaireList.map((inventaire, index)=>(
                        <div onClick={() => (setCurrentInventaire(inventaire))} key={`${inventaire.date}-${inventaire.produitId}-${index}`} className='item d-flex flex-wrap justify-content-between my-1 mx-2 p-2'>
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
            <div className='right col-9 d-flex flex-column pt-3 px-2'>
                <div className='header d-flex justify-content-between mb-3'>
                    <div className='d-flex'>
                        <DateRangeIcon style={{fontSize: '1.5rem', fill: 'var(--principal-color)' }}/>
                        <span className='h5 mx-1 text-primary'>{currentInventaire?.date}</span>
                    </div>
                    <div className='d-flex'>
                        <LocalGroceryStoreIcon style={{fontSize: '1.5rem', fill: 'var(--principal-color)' }}/>
                        <span className='h5 mx-1 text-primary'>{produitsList.find((produit)=>produit.id === currentInventaire?.produitId)?.nom}</span>
                    </div>
                </div>
                <div className="card">
                    <DataTable value={currentStock} tableStyle={{ minWidth: '50rem' }}>
                        {cols.map((col, index)=>(
                            <Column key={index} field={col.field} header={col.name.toUpperCase()} sortable style={{ width: '25%' }}></Column>
                        ))}
                    </DataTable>
                </div>
            </div>
        </div>
    );
}
export default InventairePage;