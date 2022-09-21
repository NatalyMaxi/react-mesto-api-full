export const checkResponse = (res) => {
   return res.ok
      ? res.json()
      : Promise.reject(
         new Error(`Ошибка ${res.status}: ${res.statusText}`)
      );
};
export const BASE_URL = 'api.domainname.nataly.nomoredomains.sbs'