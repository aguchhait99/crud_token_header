import React from 'react'
import { Helmet } from 'react-helmet'
import Header from './Header'

const Layout = ({title, children}) => {
  return (
    <>
      <Helmet>
        <meta charSet='UTF-8'/>

        <title>{title}</title>
        </Helmet>
        <Header/>
        <main style={{height: 'auto'}}>
            {children}
        </main>
    </>
  )
}

Layout.defaultProps = {
    title: "Crud",
}

export default Layout
