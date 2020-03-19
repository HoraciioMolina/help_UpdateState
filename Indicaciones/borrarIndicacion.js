function borrarIndicacion(data) {

  let urlBase = `http://www.pielfagre.somee.com/api/Indicacion/` + data.id + ``;

  return new Promise((resolve, reject) => {
    fetch(urlBase, {
      method: "DELETE",
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
export default borrarIndicacion;
