import "../assets/css/menu-items.css";

function MenuItems() {
    return (
        <>
            <div className="main-nav">
                <nav>
                    <ul className="main-ul">
                        <li className="main-ul-links"><a className="main-ul-itens" href="#experience">TECNOLOGIA</a></li>
                        <li className="barraNav">|</li>
                        <li className="main-ul-links"><a className="main-ul-itens" href="#experience">EDUCAÇÃO</a></li>
                        <li className="barraNav">|</li>
                        <li className="main-ul-links"><a className="main-ul-itens" href="#experience">OPORTUNIDADES</a></li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default MenuItems;