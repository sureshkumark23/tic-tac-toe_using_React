import Icon from "../icon/icon";
import './Card1.css'
function Card({ onPlay,player,index}){

    let icon=<Icon />
    
        if(player=="X"){
            icon=<Icon name={"cross"}/>
        }else if(player=="O"){
            icon=<Icon name={"circle"}/>

        }
    
    return (
        <div className="card" onClick={()=> player=="" && onPlay(index)}>
           
           
           
        {icon}
        </div>
    )

}

export default Card;