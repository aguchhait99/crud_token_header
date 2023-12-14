const { createContext, useState, useEffect, useContext } = require("react");


const AuthContext = createContext()

const AuthProvider = ({children}) =>  {
    const [auth, setAuth] = useState({
        data: null,
        token: ""
    })

    useEffect(()=>{
        const data=localStorage.getItem('auth')
        if(data){
            const parseData = JSON.parse(data)
            setAuth({
                ...auth,
                data: parseData.data,
                token: parseData.token
            })
        }
    },[])

    return (
        <>
            <AuthContext.Provider value={[auth, setAuth]}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

const useAuth = ()=> useContext(AuthContext)

export {useAuth, AuthProvider}