import {Link} from "react-router-dom";
import styles from "./items.module.scss";

const Items = (Props) => {
    return (
        <>
        <li><Link to = {Props.path} > {Props.text} </Link></li>
        </>
    )
}

export default Items