interface IRequest<T> {
  toJSON: (data: T) => unknown;
}

export default function post<T>(
  url: string,
  request: IRequest<T>,
  data: T,
) {
  return fetch(url, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(request.toJSON(data)),
  })
    .then(response => response.json())
    .then(result => {
      if (result.error) {
        throw result.error;
      }
      return result;
    });
}