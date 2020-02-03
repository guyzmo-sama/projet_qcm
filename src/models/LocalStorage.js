import config from '/app/config.js';

export default class LocalStorage
{
    setObject(cle, objet)
    {
        Storage.prototype.setObjet = this.setItem(cle, JSON.stringify(objet));
        
    }

    getObject(cle)
    {
        Storage.prototype.getObject =
        let valeur = this.getItem(cle);
        return valeur && JSON.parse(valeur);
    }
}