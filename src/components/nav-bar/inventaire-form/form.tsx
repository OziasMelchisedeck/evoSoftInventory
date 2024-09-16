import './form.css'
import React, { useState, useEffect } from 'react';
import Select from '@mui/material/Select';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import {
    TextField,
    MenuItem,
  } from '@mui/material';
import produits from '../../../data/produits';
import magasins from '../../../data/magasin';
  

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

interface Magasin{
    id:string;
    nom:string;
    adresse:string;
}

const magasinsList: Magasin[] = magasins;
const produitsList :Produit[] = produits;

function Formulaire(){
    function getCurrentDate() { //obtenir la date du jour
    const dateOfToday = new Date();
    const year = dateOfToday.getFullYear();
    const month = String(dateOfToday.getMonth() + 1).padStart(2, '0'); // +1 car les mois commencent à 0
    const day = String(dateOfToday.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`; // Format YYYY-MM-DD
    }
    //initialisation
    const inventaireList: Inventaire[] = [
        {
            date: '',
            produitId: '',
            stock: {},
        },
    ];
    inventaireList.pop();
    const storedInventaires = localStorage.getItem('inventaires');
    const lastInventaire: Inventaire[] = storedInventaires != null? JSON.parse(storedInventaires) : inventaireList;

    const [date, setDate] = useState<string>(getCurrentDate());
    const [produitId, setProduitId] = useState<string>(produitsList[0].id)
    const [stock, setStock] = useState<Record<string, number>>({});
    const [inventaires, setInventaires] = useState<Inventaire[]>(lastInventaire);
    
    function handleStockChange(magasinId: string, value: number){ //enregistrer le stock
        setStock({
        ...stock,
        [magasinId]: value,
        });
    };

    console.log(inventaires);

    //mise à jour de l'inventaire à chaque changement de la variable inventaires
    useEffect(()=>{localStorage.setItem('inventaires', JSON.stringify(inventaires));
            }, [inventaires])

    //enregistrement du nouvel inventaire
    function submit(){
     const newInventaire: Inventaire = {
        date,produitId,stock
     }
     inventaires.push(newInventaire)
     setInventaires(inventaires);
     localStorage.setItem('inventaires',JSON.stringify(inventaires))
    }
    
    return(
        <div className="formulaire d-flex flex-column px-4 text-center align-items-center justify-content-center">
            <span className='text-primary h6 my-2'>Nouvel Inventaire</span>
            <form className='d-flex flex-column p-3 form-contain'>
                <div className='text-center my-3'><span className='text-primary p-2 h6 title'>Informations du produit</span></div>
                <div className='d-flex justify-content-between align-items-center'>
                <label htmlFor="date">Date</label>
                <TextField
                        className=' m-1'
                        id="date"
                        type="date"
                        value = {date}
                        onChange={(e)=> setDate(e.target.value)}
                        required
                        autoFocus
                    />
                </div>
                <div className='d-flex justify-content-between  align-items-center'>
                    <label htmlFor="produit">Produit</label>
                    <Select className='control m-1'
                        value={produitId}
                        onChange={(e) => setProduitId(e.target.value)}
                        required>
                        {produitsList.map((produit) => (
                            <MenuItem key={produit.id} value={produit.id}>{produit.nom}</MenuItem>
                        ))}
                    </Select>
                </div>
                <div className='text-center my-3'><span className='text-primary h6 title p-2'>Stock en magasin</span></div>
                <div className='d-flex justify-content-between align-items-center'>
                    {magasinsList.map((magasin)=>(
                        <div key={magasin.id} className='d-flex flex-column'>
                            <label>{magasin.nom}</label>
                            <TextField
                                className='m-1'
                                disabled
                                value={magasin.id}
                            />
                            <TextField
                                className='m-1'
                                label="quantite"
                                variant="outlined"
                                type="number"
                                value={stock[magasin.id] || ''}
                                onChange={(e) => handleStockChange(magasin.id, parseInt(e.target.value))}
                                required
                            />
                        </div>
                    ))}
                </div>
                <div className='d-flex justify-content-center'>
                    <button onClick={(e) =>{e.preventDefault(); submit()}} className='d-flex btn btn-primary align-items-center justify-content-center add my-3'>
                        <span className='mx-1 h6'>Ajouter</span>
                        <Inventory2Icon className='mx-1' style={{ cursor:'pointer', fontSize: '1.2rem', fill: 'white' }}/>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Formulaire;