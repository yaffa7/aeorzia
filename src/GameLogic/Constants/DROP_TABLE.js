import Fur from "../Impl/Items/fur"
import Potion from "../Impl/Items/potion"

const DROP_TABLE = {
    NONE: [],
    SMALL_CREATURE: [
        new Potion(),
        new Fur()
    ],

}


export default DROP_TABLE