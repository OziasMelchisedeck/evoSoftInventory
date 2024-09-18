import './inventaire.css'
import React from 'react';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';
import AddIcon from '@mui/icons-material/Add';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import SearchIcon from '@mui/icons-material/Search';
import produits from '../../data/produits';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tooltip } from 'primereact/tooltip';
import magasins from '../../data/magasin';
import { useTranslation } from 'react-i18next';


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

interface Stock{
    magasin : string;
    quantite : number;
}

interface Produit{
    id:string;
    nom:string;
    prix:number;
}

const produitsList :Produit[] = produits;
const magasinsList :Magasin[] = magasins;


let inventaireListCopie :Inventaire[];

function InventairePage(){    
    const { t, i18n } = useTranslation();
    //recupérer les inventaires
    const [inventaireList, setInventaireList] = useState<Inventaire[]>([]);
    const [currentInventaire, setCurrentInventaire] = useState<Inventaire>();
    const [searchProduct, setSearch] = useState('');

    const dt = useRef<DataTable<Stock[]>>(null); //typage du datatable

    useEffect(() => {
        const storedInventaires = localStorage.getItem("inventaires");
        if (storedInventaires) {
            const parsedInventaires: Inventaire[] = JSON.parse(storedInventaires);
            inventaireListCopie = parsedInventaires;
            setInventaireList(parsedInventaires);
        }
    }, []);
    // console.log(inventaireListCopie);

    // rechercher un produit particulier dans la liste des inventaires
    function search(value : string){
        setSearch(value);
        let searchList = inventaireListCopie;
        if(value !== ''){
            const findProduit = produitsList.find((produit) => produit.nom.toLowerCase().includes(value.toLowerCase()));
            searchList = inventaireListCopie.filter((inventaire) => inventaire.produitId.trim() === findProduit?.id.trim())
            // console.log(searchList);
        }
        setInventaireList(searchList);
    }
    // trier par date les différents inventaires
    function trier(ordre : string){
        let sortedInventaire = [...inventaireList].sort((a, b)=>{
           const dateA = new Date(a.date).getTime();
           const  dateB = new Date(b.date).getTime();
           if(ordre === 'croissant'){return dateA -dateB}
           else{return dateB - dateA}
        })
        console.log(sortedInventaire);
        console.log(inventaireList);
        setInventaireList(sortedInventaire);
    }
    //recuper les elements du stock et les mettre dans un tableau
    const currentStock  = currentInventaire?.stock
    ? Object.entries(currentInventaire.stock).map(([magasinId, quantite]) => {
        const magasin = magasinsList.find(m => m.id === magasinId);
        return {
            magasin: magasin ? t(`magasin.${magasin.nom}`) : 'Inconnu',
            quantite,
        };
    })
    : [];
    // console.log(currentStock);
    // paramétrage du datatable
    const cols = [
        {field:'magasin',name:t("magasin.nom")},
        {field:'quantite', name:t("magasin.quantite")}
    ]
    const exportCSV = (selectionOnly : any) => {
        dt.current?.exportCSV({ selectionOnly });
    };
    const header = (
        <div className='d-flex justify-content-between'>
            <span className='h6'>{t(`produitsData.${produitsList.find((produit) => produit.id === currentInventaire?.produitId)?.nom}`)}</span>
            <span className='h6'>{currentInventaire?.date}</span>
            <button className='rounded btn btn-outline-primary export' onClick={() => exportCSV(false)} data-pr-tooltip="CSV">CSV </button>
        </div>
    )
    const footer = (
        <div>{`${t("inventaire.footerTable")} ${currentStock.reduce((total, stock) => total + stock.quantite, 0)}`}</div>
    )

    return(
        <div className='contain d-flex'>
            <div className='side col-3 d-flex flex-column'>
                <div className='d-flex entete flex-column mx-2 p-2'>
                    <div className='header d-flex justify-content-center rounded-1 flex-wrap bg-primary mx-1 my-1 p-2'>
                            <span className='h6 mx-1 text-light'>{t('inventaire.title')}</span>
                            <Inventory2Icon style={{ cursor:'pointer', fontSize: '1.3rem', fill: 'white' }}/>
                    </div>
                    <div className='d-flex justify-content-between align-items-center flex-wrap mt-1'>
                            <div className='d-flex align-items-center'>
                                <input type='search'
                                    placeholder={t('inventaire.searchPlaceholder')}
                                    className='recherche form-control'
                                    value={searchProduct}
                                    onChange={(e) => search(e.target.value)}
                                    />
                                <SearchIcon className='loupe' style={{fill:'silver', fontSize: '1.4rem'}}/>    
                            </div>
                            <div className='bg-primary tri d-flex mx-2 py-1 px-2 rounded'>
                                <span className='text-white mr-2 date'>Date</span>
                                <NorthIcon onClick={() =>(trier('croissant'))} className='sort' style={{ cursor:'pointer', fontSize: '1.3rem'}}/>
                                <SouthIcon onClick={() =>(trier('decroissant'))} className='sort' style={{ cursor:'pointer', fontSize: '1.3rem'}}/>
                            </div>
                    </div>
                </div>
               <div className='d-flex flex-column task pb-2'>
                    {inventaireList.length > 0 ? (
                    inventaireList.map((inventaire, index) => (
                        <div 
                            onClick={() => setCurrentInventaire(inventaire)} 
                            key={`${inventaire.date}-${inventaire.produitId}-${index}`} 
                            className='item d-flex flex-wrap justify-content-between my-1 mx-2 p-2'
                        >
                            <div>
                                <DateRangeIcon style={{ cursor: 'pointer', fontSize: '1.3rem', fill: 'var(--principal-color)' }} />
                                <span className='text-primary mx-1'>{inventaire.date}</span>
                            </div>
                            <div>
                                <LocalGroceryStoreIcon style={{ fontSize: '1.3rem', fill: 'var(--principal-color)' }} />
                                <span className='text-primary'>
                                    {t(`produitsData.${produitsList.find((produit) => produit.id === inventaire.produitId)?.nom}`)}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='mt-3 text-center h6'>
                        {t("inventaire.messageEmptyMenu")}
                    </div>
        )}
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
                        <span className='h5 mx-1 text-primary'>{t(`produitsData.${produitsList.find((produit) => produit.id === currentInventaire?.produitId)?.nom}`)}</span>
                    </div>
                </div>
                <div className="card">
                    <Tooltip target=".export-buttons>button" position="bottom" />
                    <DataTable ref={dt} value={currentStock} header={header} footer={footer} stripedRows tableStyle={{ minWidth: '20rem' }}>
                        {cols.map((col, index)=>(
                            <Column key={index} field={col.field} header={col.name.toUpperCase()} sortable style={{ width: '25%', fontSize:'0.9rem' }}></Column>
                        ))}
                    </DataTable>
                </div>
            </div>
        </div>
    );
}
export default InventairePage;