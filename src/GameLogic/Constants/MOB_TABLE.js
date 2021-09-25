import { bat } from "../Impl/Enemies/bat";
import { dog } from "../Impl/Enemies/dog";
import { racoon } from "../Impl/Enemies/racoon";

const MOB_TABLE = {
    'ZONE_1': [
        [  bat,   bat,   bat,   bat],
        [  dog,   bat,   bat],
        [  racoon,   bat,   dog],
        [  racoon],
        [  dog,   dog],
    ]
}

const MOB_TO_CLASS = {
    "bat" : bat,
    "dog" : dog,
    "racoon" : racoon
}

export {MOB_TABLE, MOB_TO_CLASS}