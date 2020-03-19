function registrarIndicacion(data) {
  let urlBase = "http://www.pielfagre.somee.com/api/Indicacion/crearIndicacion";

  return new Promise((resolve, reject) => {
    fetch(urlBase, {
      method: "POST",
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
export default registrarIndicacion;
