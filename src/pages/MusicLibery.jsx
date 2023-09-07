import {Link} from "react-router-dom"
import Playlist from "./Playlist";



function MusicLibery (){
    return(
        <> 
        {/* <Playlist/> */}
<Link to="/album/list">Album</Link><br>
</br>
<Link to="/create/playlist">PLaylist</Link><br>
</br>
<Link to="/artist">Artist</Link>
        </>
    )
}

export default MusicLibery;




