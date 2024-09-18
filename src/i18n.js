import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "navbar":{
        "produits":"Products",
        "inventaire":"Inventory"
      },
      "app":{
        "title":"Markets"
      },
      "produits":{
        "title":"Products"
      },
      "inventaire":{
        "title":"Inventory",
        "searchPlaceholder":"A product?",
        "messageEmptyMenu":"No inventory data to display.",
        "footerTable":"Total remaining quantity:",
    },
    "magasin":{
        "Le Mercunien":"The Mercunien",
        "Le Bourgeois":"The Bourgeois",
        "Le Venusien":"The Venusien",
        "nom":"Markets",
        "quantite":"Quantities"
    },
    "produitsData":{
        "Pantalon":"Pant",
        "T-Shirt":"T-Shirt",
        "Bluson":"Jacket",
        "Tennis":"Sneakers",
        "Casquette":"Cap"
    },
    "addInventaire":{
        "titlePage":"New Inventory",
        "infoTitle":"Product Informations",
        "magasinTitle":"In-store stock",
        "ajoutBouton" :"Add",
        "produit":"Product",
        "quantite":"quantity",
        "errorMessage":"*Invalid field (empty or negative)",
        "alertErrorMessage":"Incorrect form! Please check that the stock information is correctly filled out.",
        "alertSuccessMessage":"Inventory added successfully!"
    }
    }
  },
  fr: {
    translation: {
        "navbar":{
            "produits":"Produits",
            "inventaire":"Inventaire"
          },
        "app":{
            "title":"Magasins"
          },
        "produits":{
            "title":"Produits"
        },
        "inventaire":{
            "title":"Inventaire",
            "searchPlaceholder":"Un produit?",
            "messageEmptyMenu":"Aucune donnée d'inventaire à afficher.",
            "footerTable":"Quantité restante totale:"
        },
        "magasin":{
            "Le Mercunien":"Le Mercunien",
            "Le Bourgeois":"Le Bourgeois",
            "Le Venusien":"Le Venusien",
            "nom":"Magasins",
            "quantite":"Quantités"
        },
        "produitsData":{
            "Pantalon":"Pantalon",
            "T-Shirt":"T-Shirt",
            "Bluson":"Bluson",
            "Tennis":"Tennis",
            "Casquette":"Casquette"
        },
        "addInventaire":{
            "titlePage":"Nouvel Inventaire",
            "infoTitle":"Informations du produit",
            "magasinTitle":"Stock en magasin",
            "ajoutBouton" :"Ajouter",
            "produit":"Produit",
            "quantite":"quantité",
            "errorMessage":"*Champ invalide(vide ou négatif)",
            "alertErrorMessage":"Formulaire incorrect! Vérifier que les stocks sont bien renseignés!",
            "alertSuccessMessage":"Inventaire ajouté avec success!",
        }
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;