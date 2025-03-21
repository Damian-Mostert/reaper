import "./styles/globals.scss";

export default function MainLayout({children}){
    return <main>
        <div>
            HEADER HAHA
        </div>
        {children}
        <div>
            FOOTER
        </div>
    </main>
}