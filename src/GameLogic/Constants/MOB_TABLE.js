import { bat } from "../Impl/Enemies/bat";
import { dog } from "../Impl/Enemies/dog";
import { racoon } from "../Impl/Enemies/racoon";

const MOB_TABLE = {
    'ZONE_1': [
        [ new bat(),  new bat(),  new bat(),  new bat()],
        [ new dog(),  new bat(),  new bat()],
        [ new racoon(),  new bat(),  new dog()],
        [ new racoon()],
        [ new dog(),  new dog()]
    ]
}


export default MOB_TABLE