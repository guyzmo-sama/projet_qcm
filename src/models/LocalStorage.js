import config from '/app/config.js';

export default class LocalStorage
{
    setObjet(key, value)
    {
        //console.log(value);
        localStorage.setItem(key, JSON.stringify(value));
    }

    getObjet(key)
    {
        let JsonValue = localStorage.getItem(key);
        return JsonValue && JSON.parse(JsonValue);
        //return valeur && JSON.parse(valeur);
    }
}