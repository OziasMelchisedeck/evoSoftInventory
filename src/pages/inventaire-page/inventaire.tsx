import './inventaire.css'
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SortIcon from '@mui/icons-material/Sort';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

function InventairePage(){
    return(
        <div className='contain d-flex'>
            <div className='side col-3 d-flex flex-column'>
                <div className='header d-flex justify-content-center rounded-1 flex-wrap bg-primary mx-2 my-1 p-2'>
                    <span className='h6 mx-1 text-light'>Inventaire</span>
                    <Inventory2Icon style={{ cursor:'pointer', fontSize: '1.3rem', fill: 'white' }}/>
                </div>
               <div className='d-flex justify-content-between flex-wrap'>
                    <span className='total text-primary mx-2 h6'>Total: 33</span>
                    <button className='btn btn-outline-primary tri d-flex mx-2'>
                        <span>Trier</span>
                        <SortIcon className='sort' style={{ cursor:'pointer', fontSize: '1.3rem'}}/>
                    </button>
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