function putIndicacion(data) {
  let urlBase = 'http://www.pielfagre.somee.com/api/indicacion/' + data.id + '';

  return new Promise((resolve, reject) => {
    fetch(urlBase, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(respuesta => respuesta.json())
      .then(json => {
        resolve(json);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export default putIndicacion;
