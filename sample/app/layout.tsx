import "./styles/globals.scss";

export default function MainLayout({children}){
    return <main>
        <div style={{padding:"2rem",background:"black"}}>
            HEADER HAHA
        </div>
        {children}
        <div style={{padding:"2rem",background:"black"}}>
            FOOTER HAHA
        </div>
    </main>
}