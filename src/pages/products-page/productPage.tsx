import produits from '../../data/produits';
import './productPage.css';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

// interface entite produit
interface Produit{
    id:string;
    nom:string;
    prix:number;
}
const produitsList :Produit[] = produits;

function ProductPage(){
    return(
        <div className='text-center product'>
             <span className='text-primary h5 mt-4 mx-2'>{produitsList.length}</span>
            <span className='text-primary h5 mt-4'>Produits</span>
            <div className="contenu d-flex flex-wrap justify-content-evenly mt-3">
                {produitsList.map((produit) =>(
                    <div key={produit.id} className='d-flex align-items-center justify-content-between p-2 m-2 rounded-1 produit'>
                        <div className='image d-flex align-items-center justify-content-center col-7'><LocalGroceryStoreIcon style={{fontSize: '5rem', fill: 'var(--principal-color)' }}/></div>
                        <div className='d-flex flex-column p-1 justify-content-center description'>
                            <div className='d-flex'>
                                <DriveFileRenameOutlineIcon style={{fontSize: '1.2rem', fill: 'black' }}/>
                                <span>{produit.nom}</span>
                            </div>
                            <div className='d-flex'>
                                <MonetizationOnIcon style={{fontSize: '1.2rem', fill: 'black' }}/>
                                <span>{produit.prix} £</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductPage;