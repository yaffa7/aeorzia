import Potion from '../Impl/Items/potion'
import ActorBase from './ActorBase'
import { Sparks, Fireball, Cure } from '../Impl/Skills'


export default class Hero extends ActorBase {
    strength = 12
    dexterity = 12
    constitution = 12
    intelligence = 12
    charisma = 12
    isHero = true
    health = 10
    max_ap = 2
    current_ap = 2
    items = [new Potion()]
    skills = [
        Sparks,
        Fireball,
        Cure
    ]
}