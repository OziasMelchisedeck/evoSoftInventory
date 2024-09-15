import magasins from '../src/data/magasin';
import './App.css';
import StoreIcon from '@mui/icons-material/Store';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';

//interface entité magasin
interface Magasin{
  id:string;
  nom:string;
  adresse:string;
}

const magasinsList: Magasin[] = magasins;


function App() {
  return (
  <div className='app text-center'>
    <span className='text-primary h5 mt-4'>Magasins</span>
    <div className="contenu d-flex justify-content-evenly mt-3">
       {magasinsList.map((magasin) =>(
        <div key={magasin.id} className='d-flex flex-column align-items-center col-3 magasin'>
          <StoreIcon style={{fontSize: '10rem', fill: 'var(--principal-color)' }}/>
          <div className='d-flex'>
            <DriveFileRenameOutlineIcon style={{fontSize: '1.2rem', fill: 'black' }}/>
            <span className='h6'>{magasin.nom}</span>
          </div>
          <div className='d-flex'>
            <LocationOnIcon style={{fontSize: '1.2rem', fill: 'black' }}/>
            <span className='h6'>{magasin.adresse}</span>
          </div>
        </div>
       ))}
    </div>
  </div>  
  );
}

export default App;
