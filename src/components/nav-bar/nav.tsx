import './nav.css'
import DatasetIcon from '@mui/icons-material/Dataset';
import { Link } from 'react-router-dom';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';

function Nav(){
    const { t, i18n } = useTranslation();

    function changeLanguage(lng : string){
        i18n.changeLanguage(lng);
    }

    return (
        <nav className='d-flex py-2 navi justify-content-between'>
            <Link to='' className='d-flex titre link'>
                <DatasetIcon style={{ cursor:'pointer', fontSize: '1.5rem', fill: 'var(--principal-color)' }}/>
                <span className='h6 text-primary mx-1'>StockMaster</span>
            </Link>
            <div className='d-flex'>
                <Link to='/produits' className='link mx-1'>
                    <LocalGroceryStoreIcon style={{ cursor:'pointer', fontSize: '1rem', fill: 'var(--principal-color)' }}/>
                    <span className='h6 text-primary mx-1'>{t('navbar.produits')}</span>
                </Link>
                <Link to='/inventaire' className='link mx-1'>
                    <Inventory2Icon style={{ cursor:'pointer', fontSize: '1rem', fill: 'var(--principal-color)' }}/>
                    <span className='h6 text-primary mx-1'>{t('navbar.inventaire')}</span>
                </Link>
            </div>
            <div className='d-flex bg-primary p-1 rounded-1 align-items-center'>
            <LanguageIcon style={{ cursor:'pointer', fontSize: '1.2rem', fill: 'white' }}/>
                <button onClick={() => changeLanguage('fr')} className='p-1 mx-1'>FR</button>
                <button onClick={() => changeLanguage('en')} className='p-1 mx-1'>EN</button>
            </div>
        </nav>
    )
}

export default Nav;