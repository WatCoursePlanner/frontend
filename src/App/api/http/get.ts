interface IResponseType<S> {
  fromJSON: (data: any) => S;
}

export default function get<S>(
  url: string,
  responseType?: IResponseType<S>,
): Promise<S> {
  return fetch(url, {
    method: 'get',
    headers: {'Content-Type': 'application/json'},
    credentials: "include",
  })
    .then(response => response.json())
    .then(result => {
      if (result.error) {
        throw result.error;
      }
      return responseType?.fromJSON(result) ?? result as S;
    })
    .catch(error => {
      throw error;
    });
}