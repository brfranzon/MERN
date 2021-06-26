// https://dev.to/rxjs/fetching-data-in-react-with-rxjs-and-lt-gt-fragment-54h7
// https://stackblitz.com/edit/react-fetch-rxjs-hook?file=lib.ts

import { getUsers, useObservable } from '../api/api_with_RxJS';


const Login2 = () => {

    const [error, users] = useObservable<any>(getUsers())

    if (!users) {
        return <p>Starting request ...</p>
    }
    if (error) {
        return <p>There has been an error: {error.message}</p>
    }
    return <p>Received {JSON.stringify(users)}</p>


}

export default Login2;