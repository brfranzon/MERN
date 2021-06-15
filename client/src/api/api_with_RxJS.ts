import { useState, useEffect } from 'react';
import { Observable } from 'rxjs'


export const getUsers = () => {
  return new Observable((subscriber) => {
    const controller = new AbortController()
    const { signal } = controller
    fetch('http://localhost:3001/users', { signal })
      .then((response) => response.json())
      .then((usersFromApi) => {
        subscriber.next(usersFromApi)
        subscriber.complete()
      })
      .catch((apiError) => subscriber.error(apiError))
    return () => controller.abort()
  })
}

export const useObservable = <T,>(source: Observable<T>): [any, T | undefined] => {

  const [value, setValue] = useState<T | undefined>()
  const [error, setError] = useState()

  useEffect(() => {
    const subscription = source.subscribe(setValue, setError)
    return () => subscription.unsubscribe()
  }, [source])

  return [error, value]
}